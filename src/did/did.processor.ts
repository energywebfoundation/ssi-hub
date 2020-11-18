import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DIDService } from './did.service';

@Processor('dids')
export class DIDProcessor {
  private readonly logger: Logger;

  constructor(
    private readonly didService: DIDService,
  ) {
    this.logger = new Logger('DIDProcessor');
  }

  @Process('register')
  public async processDidRegistration(job: Job<string>) {
    this.logger.debug(`processing ${job.data}`);
    const id = job.data;
    this.didService.upsertCache(id)
  }
}