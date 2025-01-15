import {
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import {
  PinClaimData,
  PIN_CLAIM_JOB_NAME,
  PIN_CLAIM_QUEUE_NAME,
} from '../ipfs/ipfs.types';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import {
  ADD_DID_DOC_JOB_NAME,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';

@Processor(UPDATE_DOCUMENT_QUEUE_NAME)
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private pinQueue: Queue<PinClaimData>
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Starting ${job.name} document ${job.data}`);
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    this.logger.debug(`Stalled ${job.name} document ${job.data}`);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.debug(`Failed ${job.name} document ${job.data}`);
  }

  @OnQueueWaiting()
  async OnQueueWaiting(job: Job) {
    this.logger.debug(`Waiting ${job.name} document ${job.data}`);
  }

  @Process(ADD_DID_DOC_JOB_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    const doc = await this.didService.addCachedDocument(job.data);
    await this.addPinJobs(doc);
  }

  @Process(UPDATE_DID_DOC_JOB_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    let doc: DIDDocumentEntity;
    if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
      doc = await this.didService.addCachedDocument(job.data, true);
    } else {
      doc = await this.didService.incrementalRefreshCachedDocument(job.data);
    }
    await this.addPinJobs(doc);
  }

  private async addPinJobs(doc: DIDDocumentEntity) {
    // Cluster pinning needs to be explictly set to true
    if (!this.configService.get<boolean>('IPFS_CLUSTER_PINNING_ENABLED')) {
      return;
    }
    await Promise.all(
      doc.service.map(({ serviceEndpoint }) => {
        this.pinQueue.add(PIN_CLAIM_JOB_NAME, {
          cid: serviceEndpoint,
        });
      })
    );
  }
}
