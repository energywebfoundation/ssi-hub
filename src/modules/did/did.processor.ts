import {
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import {
  PinClaimData,
  PIN_CLAIM_JOB_NAME,
  PIN_CLAIM_QUEUE_NAME,
} from '../ipfs/ipfs.types';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import {
  ADD_DID_DOC_JOB_NAME,
  UpdateDocumentJobData,
  UPDATE_DID_DOC_JOB_NAME,
  UPDATE_DOCUMENT_QUEUE_NAME,
} from './did.types';

@Processor(UPDATE_DOCUMENT_QUEUE_NAME)
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private pinQueue: Queue<PinClaimData>
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @OnQueueActive()
  onActive(job: Job<UpdateDocumentJobData>) {
    this.logger.debug(`Starting ${job.name} document ${job.data.did}`);
  }

  @OnQueueStalled()
  onStalled(job: Job<UpdateDocumentJobData>) {
    this.logger.debug(`Stalled ${job.name} document ${job.data.did}`);
  }

  @OnQueueFailed()
  onFailed(job: Job<UpdateDocumentJobData>) {
    this.logger.debug(`Failed ${job.name} document ${job.data.did}`);
  }

  @OnQueueWaiting()
  async OnQueueWaiting(jobId: number) {
    this.logger.debug(`Waiting job ${jobId}`);
  }

  @Process(ADD_DID_DOC_JOB_NAME)
  public async processDIDDocumentAddition(job: Job<UpdateDocumentJobData>) {
    const doc = await this.didService.addCachedDocument(job.data.did);

    await Promise.all(
      doc.service.map(({ serviceEndpoint }) => {
        this.pinQueue.add(PIN_CLAIM_JOB_NAME, {
          cid: serviceEndpoint,
        });
      })
    );
  }

  @Process(UPDATE_DID_DOC_JOB_NAME)
  public async processDIDDocumentRefresh(job: Job<UpdateDocumentJobData>) {
    let doc: DIDDocumentEntity;
    if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
      doc = await this.didService.addCachedDocument(job.data.did, true);
    } else {
      doc = await this.didService.incrementalRefreshCachedDocument(
        job.data.did
      );
    }

    await Promise.all(
      doc.service.map(({ serviceEndpoint }) => {
        this.pinQueue.add(PIN_CLAIM_JOB_NAME, {
          cid: serviceEndpoint,
        });
      })
    );
  }
}
