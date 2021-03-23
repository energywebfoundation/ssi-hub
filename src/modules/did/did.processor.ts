import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDService } from './did.service';
import { ADD_DID_DOC_QUEUE_NAME, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';

@Processor('dids')
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @Process(ADD_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    try {
      this.logger.debug(`processing cache add for ${job.data}`);
      await this.didService.addCachedDocument(job.data);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Process(UPDATE_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    try {
      this.logger.debug(`processing cache refresh for ${job.data}`);
      await this.didService.refreshCachedDocument(job.data);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
