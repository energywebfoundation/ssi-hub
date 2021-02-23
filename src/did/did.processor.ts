import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DIDService } from './did.service';
import { DID } from './DidTypes';

@Processor('dids')
export class DIDProcessor {
  private readonly logger: Logger;

  constructor(private readonly didService: DIDService) {
    this.logger = new Logger('DIDProcessor');
  }

  @Process('upsertDocument')
  public async processDIDDocumentUpsert(job: Job<string>) {
    this.logger.log(`processing cache upsert for ${job.data}`);
    const did = new DID(job.data);
    await this.didService.upsertCachedDocument(did);
  }

  @Process('refreshDocument')
  public async processDIDDocumentRefresh(job: Job<string>) {
    this.logger.log(`processing cache refresh for ${job.data}`);
    const did = new DID(job.data);
    await this.didService.refreshCachedDocument(did);
  }
}
