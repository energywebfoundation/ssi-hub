import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDService } from './did.service';
import { DID, DIDJob } from './did.types';

@Processor('dids')
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @Process('upsertDocument')
  public async processDIDDocumentUpsert({
    data: { did, owner, offeredTo },
  }: Job<DIDJob>) {
    try {
      if (!did) return;
      this.logger.debug(`processing cache upsert for ${did}`);
      const didObject = new DID(did, { owner, offeredTo });
      await this.didService.upsertCachedDocument(didObject);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Process('refreshDocument')
  public async processDIDDocumentRefresh({
    data: { did, offeredTo, owner },
  }: Job<DIDJob>) {
    try {
      if (!did) return;
      this.logger.debug(`processing cache refresh for ${did}`);
      const didEntity = new DID(did, { offeredTo, owner });
      await this.didService.refreshCachedDocument(didEntity);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
