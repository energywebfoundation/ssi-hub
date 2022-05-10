import { Methods } from '@ew-did-registry/did';
import {
  IDIDDocument,
  IDIDLogData,
  IServiceEndpoint,
  DidEventNames,
} from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { IDidStore } from '@ew-did-registry/did-store-interface';
import { Injectable, HttpException, OnModuleInit } from '@nestjs/common';
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
import { Transaction } from '@sentry/types';

@Injectable()
export class DIDService implements OnModuleInit {
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

  async onModuleInit() {
    await this.InitEventListeners();
  }

  /**
   * Retrieves a DID Document for a given DID. Retrieves from blockchain if not cached.
   * @param {string} did DID whose document should be retrieved
   * @returns {IDIDDocument} Resolved DID Document.
   */
  public async getById(
    did: string,
    transaction?: Transaction
  ): Promise<IDIDDocument> {
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

    let span = transaction?.startChild({
      op: 'get_cached_did_document',
      description: 'Get cached DID document',
    });
    const cachedDIDDocument = await this.didRepository.findOne(did);
    span?.finish();

    if (cachedDIDDocument) {
      span = transaction?.startChild({
        op: 'convert_cached_did_document',
        description: 'Convert cached DID document to IDIDDocument',
      });
      const document = convertToIDIDDocument(cachedDIDDocument);
      span?.finish();
      return document;
    }

    this.logger.info(
      `Requested document for did: ${did} not cached. Add to cache.`
    );

    span = transaction?.startChild({
      op: 'get_did_document_from_blockchain',
      description: 'Get DID document from blockchain',
    });
    const entity = await this.addCachedDocument(did);
    span?.finish();

    span = transaction?.startChild({
      op: 'convert_cached_did_document',
      description: 'Convert cached DID document to IDIDDocument',
    });
    const document = convertToIDIDDocument(entity);
    span?.finish();
    return document;
  }

  /**
   * Adds or fully refresh the DID Document cache for a given DID.
   * Also retrieves all claims from IPFS for the document.
   * @param {string} did
   */
  public async addCachedDocument(did: string, isSync = false) {
    const obscuredDid = this.obscureDid(did);

    const transaction = this.sentryTracingService.startTransaction({
      op: 'retrieve_did_document',
      name: 'Adds or fully refresh the DID Document',
      data: { did: obscuredDid },
      tags: { service: DIDService.name, operation: isSync ? 'sync' : 'add' },
    });

    try {
      this.logger.debug(`Add cached document for did: ${did}`);

      let span = transaction?.startChild({
        op: 'get_all_logs',
        description: 'Get all logs for DID',
      });
      const logs = await this.getAllLogs(did);
      span?.finish();

      span = transaction?.startChild({
        op: 'resolve_document_from_logs',
        description: 'Resolve document from logs',
      });
      const updatedDidDocument = this.resolveDocumentFromLogs(did, logs);
      span?.finish();

      span = transaction?.startChild({
        op: 'resolve_not_cached_claims',
        description: 'Resolve not cached claims',
      });
      const updatedServices = await this.resolveNotCachedClaims(
        updatedDidDocument.service
      );
      span?.finish();

      const updatedEntity = DIDDocumentEntity.create({
        ...updatedDidDocument,
        service: updatedServices,
        logs: JSON.stringify(logs),
      });

      return this.didRepository.save(updatedEntity);
    } catch (err) {
      this.logger.error(err);
    } finally {
      transaction?.finish();
    }
  }

  obscureDid(did: string) {
    return did.replace(/(?<=0x[a-f0-9-]{3})[a-f0-9-]+/gi, '***');
  }

  /**
   * Add any incremental changes to the DID document that occurred since the last sync.
   * Also retrieves all claims from IPFS for the document.
   * @param {string} did
   */
  public async incrementalRefreshCachedDocument(did: string) {
    const obscuredDid = this.obscureDid(did);

    const transaction = this.sentryTracingService.startTransaction({
      op: 'incremental_refresh_did_document',
      name: 'Incremental refresh the DID Document',
      data: { did: obscuredDid },
      tags: { service: DIDService.name, operation: 'sync' },
    });

    try {
      this.logger.info(`refreshing cached document for did: ${did}`);
      let span = transaction?.startChild({
        op: 'find_did_document',
        description: 'Find DID Document',
      });
      const cachedDIDDocument = await this.didRepository.findOne(did);
      span?.finish();

      span = transaction?.startChild({
        op: 'update_logs',
        description: 'Update logs',
      });
      const logs = await this.updateLogs(
        cachedDIDDocument.id,
        this.parseLogs(cachedDIDDocument.logs)
      );
      span?.finish();

      span = transaction?.startChild({
        op: 'resolve_document_from_logs',
        description: 'Resolve document from logs',
      });
      const updatedDidDocument = this.resolveDocumentFromLogs(
        cachedDIDDocument.id,
        logs
      );
      span?.finish();

      span = transaction?.startChild({
        op: 'resolve_not_cached_claims',
        description: 'Resolve not cached claims',
      });
      const updatedServices = await this.resolveNotCachedClaims(
        updatedDidDocument.service,
        cachedDIDDocument.service
      );
      span?.finish();

      const updatedEntity = DIDDocumentEntity.create({
        ...cachedDIDDocument,
        ...updatedDidDocument,
        service: updatedServices,
        logs: JSON.stringify(logs),
      });

      return this.didRepository.save(updatedEntity);
    } catch (err) {
      this.logger.error(err);
    } finally {
      transaction?.finish();
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

    try {
      const observableResponse = this.httpService.get(
        `${stripTrailingSlash(universalResolverUrl)}/${did}`
      );
      const { data } = await firstValueFrom(observableResponse);
      return data.didDocument;
    } catch (e) {
      if (e?.isAxiosError) {
        throw new HttpException(
          e?.response?.statusText || 'Unknown error',
          e?.response?.status || 500
        );
      } else throw e;
    }
  }

  private async InitEventListeners(): Promise<void> {
    this.didRegistry.on(DidEventNames.AttributeChanged, async (address) => {
      const did = `did:${Methods.Erc1056}:${process.env.CHAIN_NAME}:${address}`;

      this.logger.info(
        `${DidEventNames.AttributeChanged} event received for did: ${did}`
      );

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

        if (typeof serviceEndpoint !== 'string') {
          return { ...rest, serviceEndpoint };
        }

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
