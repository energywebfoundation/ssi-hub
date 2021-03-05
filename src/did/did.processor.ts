import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDService } from './did.service';
import { DID } from './did.types';

@Processor('dids')
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @Process('upsertDocument')
  public async processDIDDocumentUpsert(job: Job<string>) {
    try {
      this.logger.debug(`processing cache upsert for ${job.data}`);
      const did = new DID(job.data);
      await this.didService.upsertCachedDocument(did);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Process('refreshDocument')
  public async processDIDDocumentRefresh(job: Job<string>) {
    try {
      this.logger.debug(`processing cache refresh for ${job.data}`);
      const did = new DID(job.data);
      await this.didService.refreshCachedDocument(did);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
