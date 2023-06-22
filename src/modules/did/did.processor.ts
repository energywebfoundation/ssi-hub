import {
  InjectQueue,
  OnGlobalQueueActive,
  OnGlobalQueueError,
  OnGlobalQueueFailed,
  OnGlobalQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import {
  ADD_DID_DOC_JOB_NAME,
  PIN_CLAIM_JOB_NAME,
  PIN_CLAIM_QUEUE_NAME,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';

@Processor(UPDATE_DOCUMENT_QUEUE_NAME)
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectQueue(UPDATE_DOCUMENT_QUEUE_NAME)
    private queue: Queue,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private pinQueue: Queue
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @OnGlobalQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @OnGlobalQueueActive()
  async onActive(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(`Starting ${job.name} document ${job.data}`);
  }

  @OnGlobalQueueStalled()
  async onStalled(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(`Stalled ${job.name} document ${job.data}`);
  }

  @OnGlobalQueueFailed()
  async onFailed(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(`Failed ${job.name} document ${job.data}`);
  }

  @Process(ADD_DID_DOC_JOB_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    const doc = await this.didService.addCachedDocument(job.data);

    await this.pinQueue.add(PIN_CLAIM_JOB_NAME, doc);
  }

  @Process(UPDATE_DID_DOC_JOB_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    let doc: DIDDocumentEntity;
    if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
      doc = await this.didService.addCachedDocument(job.data, true);
    } else {
      doc = await this.didService.incrementalRefreshCachedDocument(job.data);
    }

    await this.pinQueue.add(PIN_CLAIM_JOB_NAME, doc);
  }
}
