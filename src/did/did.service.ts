import { Methods } from "@ew-did-registry/did";
import { Resolver } from "@ew-did-registry/did-ethr-resolver";
import { IDIDDocument, IDIDLogData, IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store'
import { IDidStore } from '@ew-did-registry/did-store-interface'
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EthereumDidRegistryFactory } from '../ethers/EthereumDidRegistryFactory';
import { EthereumDidRegistry } from '../ethers/EthereumDidRegistry';
import * as jwt_decode from 'jwt-decode';
import { providers } from 'ethers';
import { DIDDocumentEntity } from './DidDocumentEntity';
import { ResolverFactory } from './ResolverFactory';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DID } from './DidTypes';
import { BigNumber, bigNumberify } from 'ethers/utils';
import { DIDDGraphRepository } from "./did.repository";

@Injectable()
export class DIDService {
  private readonly logger: Logger;
  private readonly provider: providers.JsonRpcProvider;
  private readonly didRegistry: EthereumDidRegistry;
  private readonly resolver: Resolver;
  private readonly ipfsStore: IDidStore;
  private readonly upsert_queue_channel = 'upsertDocument';
  private readonly refresh_queue_channel = 'refreshDocument';

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly resolverFactory: ResolverFactory,
    private readonly didRepository: DIDDGraphRepository,
    @InjectQueue('dids') private readonly didQueue: Queue<string>
  ) {
    this.logger = new Logger('DIDService');
    this.resolver = this.resolverFactory.create();

    const IPFS_URL = this.config.get<string>('IPFS_URL');
    this.ipfsStore = new DidStore(IPFS_URL);

    const PROVIDER_URL = this.config.get<string>('ENS_URL');
    this.provider = new providers.JsonRpcProvider(PROVIDER_URL);

    const DID_REGISTRY_ADDRESS = this.config.get<string>('DID_REGISTRY_ADDRESS');
    this.didRegistry = EthereumDidRegistryFactory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider,
    );

    this.InitEventListeners();

    // Using setInterval so that interval can be set dynamically from config
    const interval = setInterval(
      () => this.syncDocuments(),
      parseInt(this.config.get<string>('DIDDOC_SYNC_INTERVAL_IN_MS')));
    this.schedulerRegistry.addInterval('DID Document Sync', interval);
  }

  private async InitEventListeners(): Promise<void> {
    const DIDAttributeChanged = 'DIDAttributeChanged'
    this.didRegistry.addListener(DIDAttributeChanged, async (owner, hash, value) => {
      this.logger.log(`${DIDAttributeChanged} event received for owner: ${owner}`)
      const did = `did:${Methods.Erc1056}:${owner}`;
      await this.didQueue.add(this.refresh_queue_channel, did);
    })
  }

  private async syncDocuments() {
    const cachedDIDs = await this.didRepository.queryAllDIDs();
    cachedDIDs.forEach(async (did) => {
      await this.didQueue.add(this.refresh_queue_channel, did.id);
    })
  }

  /**
   * Retrieves a DID Document for a given DID
   * @param {DID} did DID whose document should be retrieved
   * @param {boolean} enhanceWithClaims 
   * @returns {IDIDDocument} Resolved DID Document. Null if no Document is not cached.
   */
  public async getById(did: DID, enhanceWithClaims: boolean = false): Promise<IDIDDocument> {
    const didEntity = await this.didRepository.queryById(did);
    if (!didEntity) {
      return null;
    }
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
      this.logger.log(`upserting cached document for did: ${did.id}`);
      const didEntity = await this.didRepository.queryById(did) ?? new DIDDocumentEntity(did);
      const logs = await this.readNewLogsFromChain(didEntity);
      didEntity.updateLogData(logs);
      didEntity.cacheIPFSClaims(this.ipfsStore);
      await this.didRepository.saveDocument(didEntity.getDTO());
    }
    catch (err) {
      this.logger.error(`upserting cached document for did: ${did.id} threw error: ${err}`);
    }
  }

  /**
   * Refresh the DID Document cache for a given DID.
   * Also retrieves all claims from IPFS for the document.
   * @param {DID} did 
   */
  public async refreshCachedDocument(did: DID): Promise<void> {
    try {
      this.logger.log(`refreshing cached document for did: ${did.id}`);
      const didEntity = await this.didRepository.queryById(did) ?? new DIDDocumentEntity(did);
      const logs = await this.readAllLogsFromChain(didEntity);
      didEntity.setLogData(logs);
      await didEntity.cacheIPFSClaims(this.ipfsStore);
      await this.didRepository.saveDocument(didEntity.getDTO());
    }
    catch (err) {
      this.logger.error(`refreshing cached document for did: ${did.id} threw error: ${err}`);
    }
  }

  /**
   * Reads all logs for a given DID that haven't been cached yet
   * @param documentEntity 
   */
  private async readNewLogsFromChain(documentEntity: DIDDocumentEntity): Promise<IDIDLogData> {
    if (documentEntity.getLogData()?.topBlock) {
      const logData = documentEntity.getLogData();
      const readFromBlock = logData.topBlock.add(1); // Want to read from 1 more than previously last read to
      return await this.resolver.readFromBlock(documentEntity.id, readFromBlock);
    }
    else {
      this.readAllLogsFromChain(documentEntity);
    }
  }

  /**
   * Reads all logs for a given DID
   * @param documentEntity 
   */
  private async readAllLogsFromChain(documentEntity: DIDDocumentEntity): Promise<IDIDLogData> {
    let readFromBlock: BigNumber;
    const genesisBlockNumber = 0;
    readFromBlock = bigNumberify(genesisBlockNumber);
    return await this.resolver.readFromBlock(documentEntity.id, readFromBlock);
  }

  /**
   * Enhances a DID Document with full claim data
   * Remark: The approach of enhancing the IServiceEndpoint structure directly is taken from iam-client-lib
   * @param {DIDDocumentEntity} documentEntity Document entity which contains the full claim data
   * @param {IDIDDocument} resolvedDocument Resolved document to enhance
   */
  private async enhanceWithClaims(documentEntity: DIDDocumentEntity, resolvedDocument: IDIDDocument) {
    const cachedClaims = documentEntity.getCachedClaimsMap();

    resolvedDocument.service = resolvedDocument.service?.map((service: IServiceEndpoint) => {
      const { serviceEndpoint, ...rest } = service;
      const cachedClaim = cachedClaims.get(serviceEndpoint);
      if (!cachedClaim) {
        this.logger.warn(`claim at service endpoint ${serviceEndpoint} not cached for did: ${documentEntity.id}`);
        return service;
      }
      const { claimData, ...claimRest } = jwt_decode(cachedClaim) as {
        claimData: Record<string, string>;
      };
      return {
        serviceEndpoint,
        ...rest,
        ...claimData,
        ...claimRest
      };
    })
  }
}