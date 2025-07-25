import { isVerifiableCredential } from '@ew-did-registry/credentials-interface';
import { Methods } from '@ew-did-registry/did';
import {
  documentFromLogs,
  mergeLogs,
  Resolver,
} from '@ew-did-registry/did-ethr-resolver';
import {
  DidEventNames,
  IDIDDocument,
  IDIDLogData,
  IServiceEndpoint,
  RegistrySettings,
} from '@ew-did-registry/did-resolver-interface';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '@sentry/types';
import { Queue } from 'bull';
import { isJWT } from 'class-validator';
import { BigNumber } from 'ethers';
import jwt from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Provider } from '../../common/provider';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import { EthereumDIDRegistry__factory } from '../../ethers/factories/EthereumDIDRegistry__factory';
import { Logger } from '../logger/logger.service';
import { SentryTracingService } from '../sentry/sentry-tracing.service';
import { DIDDocumentEntity, IClaim } from './did.entity';
import {
  DID,
  EVENT_UPDATE_DOCUMENT_QUEUE_NAME,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
  EVENT_UPDATE_DID_DOC_JOB_NAME,
} from './did.types';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class DIDService implements OnModuleInit, OnModuleDestroy {
  private readonly didRegistry: EthereumDIDRegistry;
  private readonly resolver: Resolver;
  private readonly JOBS_CLEANUP_DELAY = 1000;
  private readonly DIDSTORE_TIMEOUT = 10000;

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    @InjectQueue(UPDATE_DOCUMENT_QUEUE_NAME)
    private readonly didQueue: Queue<string>,
    @InjectQueue(EVENT_UPDATE_DOCUMENT_QUEUE_NAME)
    private readonly eventDidQueue: Queue<string>,
    private readonly logger: Logger,
    @InjectRepository(DIDDocumentEntity)
    private readonly didRepository: Repository<DIDDocumentEntity>,
    private readonly provider: Provider,
    private readonly sentryTracingService: SentryTracingService,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    private readonly s3Service: S3Service
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
   * Also retrieves all claims from DidStore for the document.
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

  public async incrementalRefreshCachedDocumentByDid(did: string) {
    const obscuredDid = this.obscureDid(did);
    const didDocEntity = await this.didRepository.findOneBy({ id: did });
    if (!didDocEntity) {
      throw new InternalServerErrorException(
        `DID ${obscuredDid} was not found`
      );
    }
    return this.incrementalRefreshCachedDocument(did);
  }

  /**
   * Add any incremental changes to the DID document that occurred since the last sync.
   * Also retrieves all claims from DidStore for the document.
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
          .filter((endpoint) => S3Service.isCID(endpoint))
          .map((cid) => this.s3Service.get(cid).catch(() => null))
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
        try {
          await this.eventDidQueue.add(EVENT_UPDATE_DID_DOC_JOB_NAME, did, {
            jobId: did,
            lifo: true,
          });
        } catch (e) {
          this.logger.warn(
            `Error to add DID synchronization job for document ${did}: ${e}`
          );
          const jobsCounts = await this.eventDidQueue.getJobCounts();
          this.logger.debug(inspect(jobsCounts, { depth: 2, colors: true }));
        }
      }
    });
  }

  private async syncDocuments() {
    this.logger.debug(`Beginning sync of DID Documents`);
    const cachedDIDs = await this.didRepository.find({ select: ['id'] });
    cachedDIDs.forEach(async (did) => {
      await this.pinDocument(did.id);
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

        if (!S3Service.isCID(serviceEndpoint)) {
          return { serviceEndpoint, ...rest };
        }

        let token: string;
        try {
          token = await this.s3Service.getWithTimeout(
            serviceEndpoint,
            this.DIDSTORE_TIMEOUT
          );
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
      await this.didQueue.add(UPDATE_DID_DOC_JOB_NAME, did, {
        jobId: did,
        lifo: true,
      });
    } catch (e) {
      this.logger.warn(
        `Error to add DID synchronization job for document ${did}: ${e}`
      );
      const jobsCounts = await this.didQueue.getJobCounts();
      this.logger.debug(inspect(jobsCounts, { depth: 2, colors: true }));
    }
  }
}
