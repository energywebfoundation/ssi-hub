import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDService } from './did.service';
import { ADD_DID_DOC_QUEUE_NAME, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';

@Processor('dids')
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(ADD_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    this.logger.debug(`processing cache add for ${job.data}`);
    await this.didService.addCachedDocument(job.data);
  }

  @Process(UPDATE_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    this.logger.debug(`processing cache refresh for ${job.data}`);
    if (this.configService.get('DID_SYNC_MODE_FULL') === 'true') {
      await this.didService.addCachedDocument(job.data);
    } else {
      await this.didService.incrementalRefreshCachedDocument(job.data);
    }
  }
}
