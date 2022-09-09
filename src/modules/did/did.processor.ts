import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { IPFSHTTPClient, Options } from 'ipfs-http-client';
import { Repository } from 'typeorm';
import { IPFSService } from '../ipfs/ipfs.service';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity, IClaim } from './did.entity';
import { DIDService } from './did.service';
import { ADD_DID_DOC_QUEUE_NAME, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';

@Processor('dids')
export class DIDProcessor {
  private ipfs: IPFSHTTPClient;
  private ipfsOpts: Options = { url: '' };
  private pinset = new Set<string>();

  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectRepository(DIDDocumentEntity)
    private readonly didRepository: Repository<DIDDocumentEntity>
  ) {
    this.logger.setContext(DIDProcessor.name);
    this.pinCacheServices();
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(ADD_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    this.logger.debug(`processing cache add for ${job.data}`);
    const doc = await this.didService.addCachedDocument(job.data);
    await this.pinServices(doc.service);
  }

  @Process(UPDATE_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    this.logger.debug(`processing cache refresh for ${job.data}`);
    let doc: DIDDocumentEntity;
    if (this.configService.get('DID_SYNC_MODE_FULL') === 'true') {
      doc = await this.didService.addCachedDocument(job.data, true);
    } else {
      doc = await this.didService.incrementalRefreshCachedDocument(job.data);
    }
    await this.pinServices(doc.service);
  }

  public async pinServices(services: IClaim[]) {
    const servicesToPin = services
      .map(({ serviceEndpoint }) => serviceEndpoint)
      .filter(IPFSService.isCID)
      .filter((serviceEndpoint) => !this.pinset.has(serviceEndpoint));

    const ipfs = await this.getClient();
    for await (const service of servicesToPin) {
      await ipfs.pin.add(service);
      this.pinset.add(service);
    }
  }

  private async getClient() {
    if (!this.ipfs) {
      const { create } = await (eval(`import('ipfs-http-client')`) as Promise<
        typeof import('ipfs-http-client')
      >);
      this.ipfs = create(
        typeof this.ipfsOpts === 'string'
          ? { url: this.ipfsOpts }
          : this.ipfsOpts
      );
    }
    return this.ipfs;
  }

  private async pinCacheServices() {
    const ipfs = await this.getClient();
    for await (const { cid } of ipfs.pin.ls()) {
      this.pinset.add(cid.toString());
    }

    const docs = await this.didRepository.find();
    for await (const doc of docs) {
      await this.pinServices(doc.service);
    }
  }
}
