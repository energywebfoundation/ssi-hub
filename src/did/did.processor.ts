import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DIDService } from './did.service';
import { DID } from './DidTypes';

@Processor('dids')
export class DIDProcessor {
  private readonly logger: Logger;

  constructor(
    private readonly didService: DIDService
  ) {
    this.logger = new Logger('DIDProcessor');
  }

  @Process({ name: 'upsertDocument', concurrency: 0 })
  public async processDIDDocumentUpsert(job: Job<string>) {
    this.logger.log(`processing cache upsert for ${job.data}`);
    const did = new DID(job.data);
    await this.didService.upsertCachedDocument(did);
  }

  // Note that bull queue concurrency stacks for all methods in a processor:
  // - https://github.com/nestjs/bull/issues/258
  // - https://github.com/OptimalBits/bull/issues/1113#issuecomment-440706459
  @Process({ name: 'refreshDocument', concurrency: 3 })
  public async processDIDDocumentRefresh(job: Job<string>) {
    this.logger.log(`processing cache refresh for ${job.data}`);
    const did = new DID(job.data);
    await this.didService.refreshCachedDocument(did);
    this.logger.debug(`finished cache refresh for: ${job.data}`);
  }
}
