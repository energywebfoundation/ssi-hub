import {
  Injectable,
  HttpException,
  OnModuleInit,
  InternalServerErrorException,
  Inject,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Methods } from '@ew-did-registry/did';
import { Transaction } from '@sentry/types';
import { isJWT } from 'class-validator';
import { firstValueFrom } from 'rxjs';
import { Queue } from 'bull';
import { DataSource, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { BigNumber } from 'ethers';
import {
  IDIDDocument,
  IDIDLogData,
  IServiceEndpoint,
  DidEventNames,
  RegistrySettings,
} from '@ew-did-registry/did-resolver-interface';
import {
  documentFromLogs,
  Resolver,
  mergeLogs,
} from '@ew-did-registry/did-ethr-resolver';
import { EthereumDIDRegistry__factory } from '../../ethers/factories/EthereumDIDRegistry__factory';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import {
  DID,
  DidSyncStatus,
  getDIDFromAddress,
  UpdateDocumentJobData,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity, IClaim } from './did.entity';
import { Provider } from '../../common/provider';
import { SentryTracingService } from '../sentry/sentry-tracing.service';
import { isVerifiableCredential } from '@ew-did-registry/credentials-interface';
import { IPFSService } from '../ipfs/ipfs.service';
import { inspect } from 'util';
import { LatestDidSync } from './latestDidSync.entity';
import { DidSyncStatusEntity } from './didSyncStatus.entity';

@Injectable()
export class DIDService implements OnModuleInit, OnModuleDestroy {
  private readonly didRegistry: EthereumDIDRegistry;
  private readonly resolver: Resolver;
  private readonly JOBS_CLEANUP_DELAY = 1000;
  private readonly MAX_EVENTS_QUERY_INTERVAL = 1000000;
  private readonly MAX_SYNC_DOCUMENTS = 1000;

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    @InjectQueue(UPDATE_DOCUMENT_QUEUE_NAME)
    private readonly didQueue: Queue<UpdateDocumentJobData>,
    private readonly logger: Logger,
    @InjectRepository(DIDDocumentEntity)
    private readonly didRepository: Repository<DIDDocumentEntity>,
    private readonly provider: Provider,
    private readonly sentryTracingService: SentryTracingService,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    private readonly ipfsService: IPFSService,
    @InjectRepository(LatestDidSync)
    private readonly latestDidSyncRepository: Repository<LatestDidSync>,
    @InjectRepository(DidSyncStatusEntity)
    private readonly didSyncStatusRepository: Repository<DidSyncStatusEntity>,
    private dataSource: DataSource
  ) {
    this.logger.setContext(DIDService.name);

    const DID_REGISTRY_ADDRESS = this.config.get<string>(
      'DID_REGISTRY_ADDRESS'
    );
    this.resolver = new Resolver(this.provider, registrySettings);

    this.didRegistry = EthereumDIDRegistry__factory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider
    );

    // Using setInterval so that interval can be set dynamically from config
    const didDocSyncInterval = this.config.get<number>(
      'DIDDOC_SYNC_INTERVAL_IN_HOURS'
    );
    if (didDocSyncInterval && this.config.get<boolean>('DID_SYNC_ENABLED')) {
      const interval = setInterval(
        () => this.syncDocuments(),
        didDocSyncInterval * 3600000
      );
      this.schedulerRegistry.addInterval('DID Document Sync', interval);
    }
  }

  async onModuleInit() {
    await this.InitEventListeners();
  }

  async onModuleDestroy() {
    await this.didQueue.clean(this.JOBS_CLEANUP_DELAY, 'wait');
    await this.didQueue.clean(this.JOBS_CLEANUP_DELAY, 'active');
    await this.didQueue.clean(this.JOBS_CLEANUP_DELAY, 'delayed');
    this.didRegistry.removeAllListeners(DidEventNames.AttributeChanged);
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
    did = new DID(did).did;
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
    const cachedDIDDocument = await this.didRepository.findOneBy({ id: did });
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

    if (!entity) {
      throw new InternalServerErrorException('Could not add DID Document');
    }

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

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const updated = await queryRunner.manager.save(
          DIDDocumentEntity,
          updatedEntity
        );
        await queryRunner.manager.insert(DidSyncStatusEntity, {
          document: updated,
          status: DidSyncStatus.Synced,
        });
        await queryRunner.commitTransaction();
        this.logger.debug(`Document ${did} was synchronized`);
        return updated;
      } catch (_) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
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
      this.logger.info(`Refreshing cached document for did: ${did}`);
      let span = transaction?.startChild({
        op: 'find_did_document',
        description: 'Find DID Document',
      });
      const cachedDIDDocument = await this.didRepository.findOneBy({ id: did });
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

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const updated = await queryRunner.manager.save(
          DIDDocumentEntity,
          updatedEntity
        );
        await queryRunner.manager.upsert(
          DidSyncStatusEntity,
          {
            document: updated,
            status: DidSyncStatus.Synced,
          },
          ['document']
        );
        await queryRunner.commitTransaction();
        this.logger.debug(`Document ${did} was synchronized`);
        return updated;
      } catch (e) {
        await queryRunner.rollbackTransaction();
        this.logger.error(`Failed to synchronize DID ${did}: ${e}`);
      } finally {
        await queryRunner.release();
      }
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

  /**
   * Resolves service endponts, which represent credentials
   *
   * @param did DID of the document service endpoints
   */
  public async resolveCredentials(did: string) {
    const { service } = await this.getById(did);
    return (
      await Promise.all(
        service
          .map(({ serviceEndpoint }) => serviceEndpoint)
          .filter((endpoint) => IPFSService.isCID(endpoint))
          .map((cid) => this.ipfsService.get(cid).catch(() => null))
      )
    ).filter(Boolean);
  }

  private async InitEventListeners(): Promise<void> {
    this.didRegistry.on(DidEventNames.AttributeChanged, async (address) => {
      const did = `did:${Methods.Erc1056}:${process.env.CHAIN_NAME}:${address}`;

      this.logger.info(
        `${DidEventNames.AttributeChanged} event received for did: ${did}`
      );

      const didObject = new DID(did);
      const didDocEntity = await this.didRepository.findOneBy({
        id: didObject.did,
      });
      // Only refreshing a DID that is already cached.
      // Otherwise, cache could grow too large with DID Docs that aren't relevant to Switchboard
      if (didDocEntity) {
        await this.pinDocument(did);
      }
    });
  }

  private async syncDocuments() {
    await this.markStaleDocuments();

    const staleDIDs = (
      await this.didSyncStatusRepository.find({
        where: { status: DidSyncStatus.Stale },
        relations: { document: true },
        take: this.MAX_SYNC_DOCUMENTS,
      })
    ).map((status) => status.document.id);
    this.logger.debug(`Synchronizing ${staleDIDs.length} documents`);
    staleDIDs.forEach(async (did) => {
      this.logger.debug(`Synchronizing DID ${did}`);
      await this.pinDocument(did);
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
   * @param id
   */
  private async getAllLogs(id: string): Promise<IDIDLogData> {
    const genesisBlockNumber = 0;
    const readFromBlock = BigNumber.from(genesisBlockNumber);
    const logs = await this.resolver.readFromBlock(id, readFromBlock);
    return logs;
  }

  private async resolveNotCachedClaims(
    services: IServiceEndpoint[],
    cachedServices: IClaim[] = []
  ): Promise<IClaim[]> {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
        const cachedService = cachedServices.find(
          (claim) => claim.serviceEndpoint === serviceEndpoint
        );

        if (cachedService) {
          return cachedService;
        }

        if (!IPFSService.isCID(serviceEndpoint)) {
          return { serviceEndpoint, ...rest };
        }

        let token: string;
        try {
          token = await this.ipfsService.get(serviceEndpoint);
        } catch (e) {
          return { serviceEndpoint, ...rest };
        }

        if (isJWT(token)) {
          const decodedData = jwt.decode(token) as {
            claimData: Record<string, string>;
          };

          if (!decodedData) {
            return { serviceEndpoint, ...rest };
          }

          const { claimData, ...claimRest } = decodedData;

          return {
            serviceEndpoint,
            ...rest,
            ...claimData,
            ...claimRest,
          };
        }

        try {
          const data = JSON.parse(token);
          if (isVerifiableCredential(data)) {
            return {
              serviceEndpoint,
              ...rest,
              verifiableCredentials: data,
            };
          }
          return {
            serviceEndpoint,
            ...rest,
            ...data,
          };
        } catch {
          this.logger.debug(
            `Could not parse service: serviceEndpoint: ${serviceEndpoint}`
          );
          return { serviceEndpoint, ...rest };
        }
      })
    );
  }

  private async pinDocument(did: string): Promise<void> {
    try {
      await this.didQueue.add(UPDATE_DID_DOC_JOB_NAME, { did }, { jobId: did });
    } catch (e) {
      this.logger.warn(
        `Error to add DID synchronization job for document ${did}: ${e}`
      );
      const jobsCounts = await this.didQueue.getJobCounts();
      this.logger.debug(inspect(jobsCounts, { depth: 2, colors: true }));
    }
  }

  /**
   * Finds DIDs changed in given block interval. If fetching of DIDs fails at some block, then further fetching stops.
   *
   * Returns last successfully synced block
   */
  private async getChangedIdentities(
    fromBlock: number,
    topBlock: number
  ): Promise<{ changedIdentities: string[]; syncedBlock: number }> {
    const didEventFilters = [
      this.didRegistry.filters.DIDAttributeChanged(null),
      this.didRegistry.filters.DIDDelegateChanged(null),
      this.didRegistry.filters.DIDOwnerChanged(null),
    ];
    const events = [];
    let syncedBlock = fromBlock;
    while (fromBlock < topBlock) {
      const toBlock = Math.min(
        topBlock,
        fromBlock + this.MAX_EVENTS_QUERY_INTERVAL
      );
      try {
        const intervalEvents = (
          await Promise.all(
            didEventFilters.map((filter) =>
              this.didRegistry.queryFilter(filter, fromBlock, toBlock)
            )
          )
        ).flat();
        this.logger.debug(
          `Fetched ${intervalEvents.length} DID events from interval [${fromBlock}, ${toBlock}]`
        );
        events.push(...intervalEvents);
        syncedBlock = toBlock;
        fromBlock = toBlock;
      } catch (e) {
        this.logger.error(
          `Failed to fetch DID events from interval [${fromBlock}, ${toBlock}]: ${e.message}`
        );
        break;
      }
    }

    this.logger.debug(`Update document events count ${events.length}`);
    const changedIdentities = events.map((event) => {
      return event.args.identity;
    });
    return {
      // Deduplicate identities if they are appears in multiple events
      changedIdentities: [...new Set(changedIdentities).values()],
      syncedBlock,
    };
  }

  /**
   * Finds documents changed since last synchronization and sets their sync status to `Stale`
   */
  private async markStaleDocuments() {
    const syncs = await this.latestDidSyncRepository.find({
      order: { createdDate: 'DESC' },
    });
    const fromBlock = syncs.length > 0 ? syncs[0].block : 0;
    const topBlock = await this.provider.getBlockNumber();
    const { changedIdentities, syncedBlock } = await this.getChangedIdentities(
      fromBlock,
      topBlock
    );
    this.logger.debug(
      `Fetched DID update events from block ${fromBlock} to block ${syncedBlock}`
    );
    const changedDIDs = changedIdentities.map(getDIDFromAddress);
    if (changedDIDs.length > 0) {
      const changedCachedDIDs: { document_id: string }[] =
        await this.didRepository
          .createQueryBuilder('document')
          .select('document.id')
          .where('document.id IN (:...changedDIDs)', { changedDIDs })
          .execute();

      const { identifiers } = await this.didSyncStatusRepository
        .createQueryBuilder()
        .insert()
        .into(DidSyncStatusEntity)
        .values(
          changedCachedDIDs.map(({ document_id }) => ({
            document: { id: document_id },
            status: DidSyncStatus.Stale,
          }))
        )
        .orUpdate(['status'], ['document_id'])
        .execute();

      this.logger.debug(`Marked ${identifiers.length} stale documents`);
    }

    await this.latestDidSyncRepository.save({ block: syncedBlock });
  }
}
