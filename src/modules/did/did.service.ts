import { Methods } from '@ew-did-registry/did';
import {
  IDIDDocument,
  IDIDLogData,
  IServiceEndpoint, 
  DidEventNames,
} from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { IDidStore } from '@ew-did-registry/did-store-interface';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { EthereumDIDRegistry__factory } from '../../ethers/factories/EthereumDIDRegistry__factory';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DID, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';
import { BigNumber } from 'ethers';
import { Logger } from '../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DIDDocumentEntity, IClaim } from './did.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { Provider } from '../../common/provider';
import {
  documentFromLogs,
  Resolver,
  mergeLogs,
  ethrReg,
} from '@ew-did-registry/did-ethr-resolver';
import { SentryTracingService } from '../sentry/sentry-tracing.service';

@Injectable()
export class DIDService {
  private readonly didRegistry: EthereumDIDRegistry;
  private readonly ipfsStore: IDidStore;
  private readonly resolver: Resolver;
  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>,
    private readonly logger: Logger,
    @InjectRepository(DIDDocumentEntity)
    private readonly didRepository: Repository<DIDDocumentEntity>,
    private readonly provider: Provider,
    private readonly sentryTracingService: SentryTracingService
  ) {
    this.logger.setContext(DIDService.name);

    const IPFS_URL = this.config.get<string>('IPFS_URL');
    this.ipfsStore = new DidStore(IPFS_URL);

    const DID_REGISTRY_ADDRESS = this.config.get<string>(
      'DID_REGISTRY_ADDRESS'
    );

    this.resolver = new Resolver(this.provider, {
      abi: ethrReg.abi,
      address: DID_REGISTRY_ADDRESS,
      method: Methods.Erc1056,
    });

    this.didRegistry = EthereumDIDRegistry__factory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider
    );

    this.InitEventListeners();

    // Using setInterval so that interval can be set dynamically from config
    const didDocSyncInterval = this.config.get<string>(
      'DIDDOC_SYNC_INTERVAL_IN_HOURS'
    );
    const DID_SYNC_ENABLED =
      this.config.get<string>('DID_SYNC_ENABLED') !== 'false';
    if (didDocSyncInterval && DID_SYNC_ENABLED) {
      const interval = setInterval(
        () => this.syncDocuments(),
        parseInt(didDocSyncInterval) * 3600000
      );
      this.schedulerRegistry.addInterval('DID Document Sync', interval);
    }
  }

  /**
   * Retrieves a DID Document for a given DID. Retrieves from blockchain if not cached.
   * @param {string} did DID whose document should be retrieved
   * @returns {IDIDDocument} Resolved DID Document.
   */
  public async getById(did: string): Promise<IDIDDocument> {
    const convertToIDIDDocument = (entity: DIDDocumentEntity): IDIDDocument => {
      return {
        '@context': entity['@context'],
        authentication: entity.authentication,
        created: entity.created,
        delegates: entity.delegates,
        id: entity.id,
        service: entity.service,
        publicKey: entity.publicKey,
        proof: entity.proof,
        updated: entity.updated,
      };
    };
    const cachedDIDDocument = await this.didRepository.findOne(did);
    if (cachedDIDDocument) {
      return convertToIDIDDocument(cachedDIDDocument);
    }

    this.logger.info(
      `Requested document for did: ${did} not cached. Add to cache.`
    );

    const entity = await this.addCachedDocument(did);
    return convertToIDIDDocument(entity);
  }

  /**
   * Adds or fully refresh the DID Document cache for a given DID.
   * Also retrieves all claims from IPFS for the document.
   * @param {string} did
   */
  public async addCachedDocument(did: string) {
    const transaction = this.sentryTracingService.startTransaction(
      'process-did',
      'Process DID',
      {
        did,
      }
    );

    try {
      this.logger.debug(`Add cached document for did: ${did}`);
      const logs = await this.getAllLogs(did);

      const updatedDidDocument = this.resolveDocumentFromLogs(did, logs);
      const updatedServices = await this.resolveNotCachedClaims(
        updatedDidDocument.service
      );

      const updatedEntity = DIDDocumentEntity.create({
        ...updatedDidDocument,
        service: updatedServices,
        logs: JSON.stringify(logs),
      });

      return this.didRepository.save(updatedEntity);
    } catch (err) {
      this.logger.error(err);
    } finally {
      transaction && transaction.finish();
    }
  }

  /**
   * Add any incremental changes to the DID document that occurred since the last sync.
   * Also retrieves all claims from IPFS for the document.
   * @param {string} did
   */
  public async incrementalRefreshCachedDocument(did: string) {
    try {
      this.logger.info(`refreshing cached document for did: ${did}`);
      const cachedDIDDocument = await this.didRepository.findOne(did);

      const logs = await this.updateLogs(
        cachedDIDDocument.id,
        this.parseLogs(cachedDIDDocument.logs)
      );

      const updatedDidDocument = this.resolveDocumentFromLogs(
        cachedDIDDocument.id,
        logs
      );

      const updatedServices = await this.resolveNotCachedClaims(
        updatedDidDocument.service,
        cachedDIDDocument.service
      );

      const updatedEntity = DIDDocumentEntity.create({
        ...cachedDIDDocument,
        ...updatedDidDocument,
        service: updatedServices,
        logs: JSON.stringify(logs),
      });

      return this.didRepository.save(updatedEntity);
    } catch (err) {
      this.logger.error(err);
    }
  }

  public async getDIDDocumentFromUniversalResolver(did: string) {
    const universalResolverUrl = this.config.get<string>(
      'UNIVERSAL_RESOLVER_URL'
    );
    if (!universalResolverUrl) {
      throw new Error('universal resolver url not set');
    }
    const stripTrailingSlash = (s: string) => s.replace(/\/$/, ''); //https://stackoverflow.com/questions/6680825/return-string-without-trailing-slash
    const observableResponse = this.httpService.get(
      `${stripTrailingSlash(universalResolverUrl)}/${did}`
    );
    const { data } = await firstValueFrom(observableResponse);

    return data.didDocument;
  }

  private async InitEventListeners(): Promise<void> {
    this.didRegistry.on(DidEventNames.AttributeChanged, async address => {
      const did = `did:${Methods.Erc1056}:${process.env.CHAIN_NAME}:${address}`;

      this.logger.info(`${DidEventNames.AttributeChanged} event received for did: ${did}`);

      const didObject = new DID(did);
      const didDocEntity = await this.didRepository.findOne(didObject.did);
      // Only refreshing a DID that is already cached.
      // Otherwise, cache could grow too large with DID Docs that aren't relevant to Switchboard
      if (didDocEntity) {
        await this.didQueue.add(UPDATE_DID_DOC_QUEUE_NAME, did);
      }
    });
  }

  private async syncDocuments() {
    this.logger.debug(`Beginning sync of DID Documents`);
    const cachedDIDs = await this.didRepository.find({ select: ['id'] });
    cachedDIDs.forEach(async (did) => {
      await this.didQueue.add(UPDATE_DID_DOC_QUEUE_NAME, did.id);
    });
  }

  private parseLogs(logs: string) {
    const knownBigNumberProperties = new Set<string>();
    knownBigNumberProperties.add('validity');
    knownBigNumberProperties.add('topBlock');

    // Operations on IDIDLogData expect some properties to be BigNumbers
    const bigNumberReviver = (key: string, value: unknown) => {
      if (!(value instanceof Object)) return value;

      if (
        knownBigNumberProperties.has(key) &&
        ('_hex' in value || 'hex' in value)
      ) {
        return BigNumber.from(value);
      }

      return value;
    };
    return JSON.parse(logs, bigNumberReviver) as IDIDLogData;
  }

  private resolveDocumentFromLogs(id: string, logs: IDIDLogData) {
    return documentFromLogs(id, [logs]);
  }

  /**
   * Reads all logs for a given DID that haven't been cached yet and merged them
   * @param documentEntity
   */
  private async updateLogs(
    id: string,
    logs: IDIDLogData
  ): Promise<IDIDLogData> {
    if (logs?.topBlock) {
      const readFromBlock = logs.topBlock.add(1); // Want to read from 1 more than previously last read to
      const newLogs = await this.resolver.readFromBlock(id, readFromBlock);
      const mergedLogs = mergeLogs([logs, newLogs]);
      mergedLogs.topBlock = newLogs.topBlock;
      return mergedLogs;
    }
    const newLogs = await this.getAllLogs(id);
    const mergedLogs = mergeLogs([logs, newLogs]);
    mergedLogs.topBlock = newLogs.topBlock;
    return mergedLogs;
  }

  /**
   * Gets all logs for a given DID
   * @param documentEntity
   */
  private async getAllLogs(id: string): Promise<IDIDLogData> {
    const genesisBlockNumber = 0;
    const readFromBlock = BigNumber.from(genesisBlockNumber);
    return await this.resolver.readFromBlock(id, readFromBlock);
  }

  private resolveNotCachedClaims(
    services: IServiceEndpoint[],
    cachedServices: IClaim[] = []
  ): Promise<IClaim[]> {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
        const cachedService = cachedServices.find(
          (claim) => claim.serviceEndpoint === serviceEndpoint
        );
        if (cachedService) return cachedService;

        const token = await this.ipfsStore.get(serviceEndpoint);

        const { claimData, ...claimRest } = jwt.decode(token) as {
          claimData: Record<string, string>;
        };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData,
          ...claimRest,
        };
      })
    );
  }
}
