import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { ClaimService } from './claim.service';

@Processor('claims')
export class ClaimProcessor {
  constructor(
    private readonly claimService: ClaimService,
    private readonly logger: Logger,
  ) {}

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process('save')
  public async processClaim(job: Job<string>) {
    const json = JSON.parse(job.data);
    await this.claimService.handleExchangeMessage(json);
  }
}
