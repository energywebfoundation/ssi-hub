import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDProcessor } from './did.processor';
import {
  EVENT_UPDATE_DID_DOC_JOB_NAME,
  EVENT_UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';

const totalPool = parseInt(process.env.DB_MAXIMUM_CONNECTION_POOL || '10', 10);
const buffer = Math.ceil(totalPool * 0.2); // 20% buffer
const usablePool = totalPool - buffer;
const MAX_CONCURRENCY = Math.max(1, usablePool);

@Processor(EVENT_UPDATE_DOCUMENT_QUEUE_NAME)
export class DIDProcessorEvent {
  constructor(
    private readonly didProcessor: DIDProcessor,
    private readonly logger: Logger
  ) {
    this.logger.setContext(DIDProcessorEvent.name);
  }

  @Process({
    name: EVENT_UPDATE_DID_DOC_JOB_NAME,
    concurrency: MAX_CONCURRENCY,
  })
  public async processDIDDocumentRefresh(job: Job<string>) {
    const obscuredDid = this.obscureDid(job.data);
    this.logger.info(`Event refreshing for did: ${obscuredDid}`);
    this.didProcessor.processDIDDocumentRefresh(job);
  }

  obscureDid(did: string) {
    return did.replace(/(?<=0x[a-f0-9-]{3})[a-f0-9-]+/gi, '***');
  }
}
