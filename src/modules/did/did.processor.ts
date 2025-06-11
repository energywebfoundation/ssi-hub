import {
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
  Processor
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDService } from './did.service';
import {
  ADD_DID_DOC_JOB_NAME,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';


const totalPool = parseInt(process.env.DB_MAXIMUM_CONNECTION_POOL || '10', 10);
const buffer = Math.ceil(totalPool * 0.2); // 20% buffer
const usablePool = totalPool - buffer;
const MAX_CONCURRENCY = Math.max(1, usablePool);

@Processor(UPDATE_DOCUMENT_QUEUE_NAME)
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
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

  @Process({ name: ADD_DID_DOC_JOB_NAME, concurrency: MAX_CONCURRENCY })
  public async processDIDDocumentAddition(job: Job<string>) {
    await this.didService.addCachedDocument(job.data);
  }

  @Process({ name: UPDATE_DID_DOC_JOB_NAME, concurrency: MAX_CONCURRENCY })
  public async processDIDDocumentRefresh(job: Job<string>) {
    if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
      await this.didService.addCachedDocument(job.data, true);
    } else {
      await this.didService.incrementalRefreshCachedDocument(job.data);
    }
  }
}
