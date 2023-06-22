import {
  InjectQueue,
  OnGlobalQueueActive,
  OnGlobalQueueError,
  OnGlobalQueueFailed,
  OnGlobalQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { PIN_CLAIM_JOB_NAME, PIN_CLAIM_QUEUE_NAME } from './did.types';

@Processor(PIN_CLAIM_QUEUE_NAME)
export class PinProcessor {
  private didCluster: DidStoreCluster;
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private didInfura: DidStoreInfura,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private queue: Queue
  ) {
    this.logger.setContext(PinProcessor.name);
    const IPFS_CLUSTER_ROOT = this.configService.get('IPFS_CLUSTER_ROOT');
    const IPFS_CLUSTER_USER = this.configService.get('IPFS_CLUSTER_USER');
    const IPFS_CLUSTER_PASSWORD = this.configService.get(
      'IPFS_CLUSTER_PASSWORD'
    );
    const Authorization = `Basic ${Buffer.from(
      `${IPFS_CLUSTER_USER}:${IPFS_CLUSTER_PASSWORD}`
    ).toString('base64')}`;
    this.didCluster = new DidStoreCluster(IPFS_CLUSTER_ROOT, {
      Authorization,
    });
  }

  @OnGlobalQueueError()
  onError(error: Error) {
    this.logger.error(`Error pinning claims ${error.message}`);
  }

  @OnGlobalQueueActive()
  async onActive(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(
      `Starting ${job.name} claims of document ${
        (job.data as DIDDocumentEntity).id
      }`
    );
  }

  @OnGlobalQueueStalled()
  async onStalled(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(
      `Stalled ${job.name} claims of document ${
        (job.data as DIDDocumentEntity).id
      }`
    );
  }

  @OnGlobalQueueFailed()
  async onFailed(jobId: number) {
    const job = await this.queue.getJob(jobId);
    this.logger.debug(
      `Failed ${job.name} claims of document ${
        (job.data as DIDDocumentEntity).id
      }`
    );
  }

  /**
   * This method migrates claims by retrieving from one DidStore and pinning to another
   * It was implemented for EW migration from Infura to EW hosted IPFS
   */
  @Process(PIN_CLAIM_JOB_NAME)
  async pinClaims(doc: DIDDocumentEntity) {
    for (const cid of doc.service.map((s) => s.serviceEndpoint)) {
      if (!(await this.didCluster.isPinned(cid))) {
        const token = await this.didInfura.get(cid);
        await this.didCluster.save(token);
      }
    }
  }
}
