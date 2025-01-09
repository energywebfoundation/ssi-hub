import {
  OnQueueError,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Logger } from '../logger/logger.service';
import {
  PinClaimData,
  PIN_CLAIM_JOB_NAME,
  PIN_CLAIM_QUEUE_NAME,
} from './ipfs.types';

@Processor(PIN_CLAIM_QUEUE_NAME)
export class PinProcessor {
  constructor(
    private readonly logger: Logger,
    private didStoreCluster: DidStoreCluster,
    private didStoreInfura: DidStoreInfura
  ) {
    this.logger.setContext(PinProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(`Error pinning claims ${error.message}`);
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    this.logger.warn(`Stalled ${job.name} claim ${JSON.parse(job.data).cid}`);
  }

  @OnQueueWaiting()
  async OnQueueWaiting(job: Job) {
    this.logger.debug(`Waiting ${job.name} claim ${job.data}`);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    this.logger.error(
      `Failed ${job.name} claim ${JSON.parse(job.data).cid}: ${err}`
    );
  }

  /**
   * This method migrates claims by retrieving from one DidStore and pinning to another
   * It was implemented for EW migration from Infura to EW hosted IPFS
   */
  @Process(PIN_CLAIM_JOB_NAME)
  async pin(job: Job<PinClaimData>) {
    const cid = job.data.cid;
    let claim = job.data.claim;
    try {
      await this.didStoreCluster.get(cid);
    } catch (_) {
      if (!claim) {
        claim = await this.didStoreInfura.get(cid);
      }
      const clusterCid = await this.didStoreCluster.save(claim);
      this.logger.debug(`CID ${cid} saved in cluster by CID ${clusterCid}`);
    }
  }
}
