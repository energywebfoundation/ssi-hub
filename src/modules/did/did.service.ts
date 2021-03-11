import { Methods } from '@ew-did-registry/did';
import {
  IDIDDocument,
  IDIDLogData,
  IServiceEndpoint,
} from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { IDidStore } from '@ew-did-registry/did-store-interface';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EthereumDidRegistryFactory } from '../../ethers/EthereumDidRegistryFactory';
import { EthereumDidRegistry } from '../../ethers/EthereumDidRegistry';
import jwt_decode from 'jwt-decode';
import { providers } from 'ethers';
import { DIDDocumentEntity } from './didDocument.entity';
import { ResolverFactory } from './ResolverFactory';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DID } from './did.types';
import { BigNumber, bigNumberify } from 'ethers/utils';
import { Logger } from '../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DIDEntity } from './did.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DIDService {
  private readonly provider: providers.JsonRpcProvider;
  private readonly didRegistry: EthereumDidRegistry;
  private readonly ipfsStore: IDidStore;
  private readonly refresh_queue_channel = 'refreshDocument';

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly resolverFactory: ResolverFactory,
    private readonly httpService: HttpService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>,
    private readonly logger: Logger,
    @InjectRepository(DIDEntity)
    private readonly didRepository: Repository<DIDEntity>,
  ) {
    this.logger.setContext(DIDService.name);

    const IPFS_URL = this.config.get<string>('IPFS_URL');
    this.ipfsStore = new DidStore(IPFS_URL);

    const PROVIDER_URL = this.config.get<string>('ENS_URL');
    this.provider = new providers.JsonRpcProvider(PROVIDER_URL);

    const DID_REGISTRY_ADDRESS = this.config.get<string>(
      'DID_REGISTRY_ADDRESS',
    );
    this.didRegistry = EthereumDidRegistryFactory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider,
    );

    this.InitEventListeners();

    // Using setInterval so that interval can be set dynamically from config
    const didDocSyncInterval = this.config.get<string>(
      'DIDDOC_SYNC_INTERVAL_IN_HOURS',
    );
    const DID_SYNC_ENABLED =
      this.config.get<string>('DID_SYNC_ENABLED') !== 'false';
    if (didDocSyncInterval && DID_SYNC_ENABLED) {
      const interval = setInterval(
        () => this.syncDocuments(),
        parseInt(didDocSyncInterval) * 3600000,
      );
      this.schedulerRegistry.addInterval('DID Document Sync', interval);
    }
  }

  private async InitEventListeners(): Promise<void> {
    const DIDAttributeChanged = 'DIDAttributeChanged';
    this.didRegistry.addListener(DIDAttributeChanged, async owner => {
      this.logger.info(
        `${DIDAttributeChanged} event received for owner: ${owner}`,
      );
      const did = `did:${Methods.Erc1056}:${owner}`;
      const didObject = new DID(did);
      const didDocEntity = await this.didRepository.findOne(didObject.id);
      // Only refreshing a DID that is already cached.
      // Otherwise, cache could grow too large with DID Docs that aren't relevant to Switchboard
      if (didDocEntity) {
        await this.didQueue.add(this.refresh_queue_channel, did);
      }
    });
  }

  private async syncDocuments() {
    this.logger.debug(`Beginning sync of DID Documents`);
    const cachedDIDs = await this.didRepository.find({ select: ['id'] });
    cachedDIDs.forEach(async did => {
      await this.didQueue.add(this.refresh_queue_channel, did.id);
    });
  }

  /**
   * Retrieves a DID Document for a given DID
   * @param {DID} did DID whose document should be retrieved
   * @param {boolean} enhanceWithClaims
   * @returns {IDIDDocument} Resolved DID Document. Null if no Document is not cached.
   */
  public async getById(
    did: DID,
    enhanceWithClaims = false,
  ): Promise<IDIDDocument> {
    const cachedDIDDocument = await this.didRepository.findOne(did.id);
    if (!cachedDIDDocument) {
      return null;
    }
    const didEntity = new DIDDocumentEntity(did, cachedDIDDocument);
    const resolvedDocument = await didEntity.getResolvedDIDDocument();
    if (enhanceWithClaims) {
      this.enhanceWithClaims(didEntity, resolvedDocument);
    }
    return resolvedDocument;
  }

  /**
   * Insert or update the DID Document cache for a given DID.
   * Also retrieves all claims from IPFS for the document.
   * @param {DID} did
   */
  public async upsertCachedDocument(did: DID): Promise<void> {
    try {
      this.logger.debug(`Upserting cached document for did: ${did.id}`);
      const cachedDIDDocument = await this.didRepository.findOne(did.id);
      const didEntity = cachedDIDDocument
        ? new DIDDocumentEntity(did, cachedDIDDocument)
        : new DIDDocumentEntity(did);
      const logs = await this.readNewLogsFromChain(didEntity);
      didEntity.updateLogData(logs);
      didEntity.cacheIPFSClaims(this.ipfsStore);
      await this.didRepository.save(DIDEntity.create(didEntity.getDTO()));
    } catch (err) {
      this.logger.error(err);
    }
  }

  /**
   * Refresh the DID Document cache for a given DID.
   * Also retrieves all claims from IPFS for the document.
   * @param {DID} did
   */
  public async refreshCachedDocument(did: DID): Promise<void> {
    try {
      this.logger.info(`refreshing cached document for did: ${did.id}`);
      const cachedDIDDocument = await this.didRepository.findOne(did.id);
      const didEntity = cachedDIDDocument
        ? new DIDDocumentEntity(did, cachedDIDDocument)
        : new DIDDocumentEntity(did);
      const logs = await this.readAllLogsFromChain(didEntity);
      didEntity.setLogData(logs);
      await didEntity.cacheIPFSClaims(this.ipfsStore);
      const didDoc = DIDEntity.create(didEntity.getDTO());
      await this.didRepository.save(didDoc);
    } catch (err) {
      this.logger.error(err);
    }
  }

  public async getDIDDocumentFromUniversalResolver(did: string) {
    const { data } = await this.httpService
      .get(`${this.config.get<string>('UNIVERSAL_RESOLVER_URL')}/${did}`)
      .toPromise();
    return data.didDocument;
  }

  /**
   * Reads all logs for a given DID that haven't been cached yet
   * @param documentEntity
   */
  private async readNewLogsFromChain(
    documentEntity: DIDDocumentEntity,
  ): Promise<IDIDLogData> {
    if (documentEntity.getLogData()?.topBlock) {
      const logData = documentEntity.getLogData();
      const readFromBlock = logData.topBlock.add(1); // Want to read from 1 more than previously last read to
      const resolver = this.resolverFactory.create();
      return await resolver.readFromBlock(documentEntity.id, readFromBlock);
    } else {
      this.readAllLogsFromChain(documentEntity);
    }
  }

  /**
   * Reads all logs for a given DID
   * @param documentEntity
   */
  private async readAllLogsFromChain(
    documentEntity: DIDDocumentEntity,
  ): Promise<IDIDLogData> {
    const genesisBlockNumber = 0;
    const readFromBlock: BigNumber = bigNumberify(genesisBlockNumber);
    const resolver = this.resolverFactory.create();
    return await resolver.readFromBlock(documentEntity.id, readFromBlock);
  }

  /**
   * Enhances a DID Document with full claim data
   * Remark: The approach of enhancing the IServiceEndpoint structure directly is taken from iam-client-lib
   * @param {DIDDocumentEntity} documentEntity Document entity which contains the full claim data
   * @param {IDIDDocument} resolvedDocument Resolved document to enhance
   */
  private async enhanceWithClaims(
    documentEntity: DIDDocumentEntity,
    resolvedDocument: IDIDDocument,
  ) {
    const cachedClaims = documentEntity.getCachedClaimsMap();

    resolvedDocument.service = resolvedDocument.service?.map(
      (service: IServiceEndpoint) => {
        const { serviceEndpoint, ...rest } = service;
        const cachedClaim = cachedClaims.get(serviceEndpoint);
        if (!cachedClaim) {
          this.logger.warn(
            `claim at service endpoint ${serviceEndpoint} not cached for did: ${documentEntity.id}`,
          );
          return service;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { claimData, ...claimRest } = jwt_decode(cachedClaim) as {
          claimData: Record<string, string>;
        };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData,
          ...claimRest,
        };
      },
    );
  }
}
