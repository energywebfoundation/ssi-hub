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
  onStalled(job: Job<PinClaimData>) {
    this.logger.warn(`Stalled ${job.name} claim ${job.data.cid}`);
  }

  @OnQueueWaiting()
  async OnQueueWaiting(jobId: number) {
    this.logger.debug(`Waiting ${jobId}`);
  }

  @OnQueueFailed()
  onFailed(job: Job<PinClaimData>, err: Error) {
    this.logger.error(`Failed ${job.name} claim ${job.data.cid}: ${err}`);
  }

  /**
   * This method migrates claims by retrieving from one DidStore and pinning to another
   * It was implemented for EW migration from Infura to EW hosted IPFS
   */
  @Process(PIN_CLAIM_JOB_NAME)
  async pin(job: Job<PinClaimData>) {
    return;
    const cid = job.data.cid;
    let claim = job.data.claim;
    this.logger.debug(`Pinning CID ${cid}`);
    try {
      await this.didStoreCluster.get(cid);
    } catch (_) {
      if (!claim) {
        try {
          claim = await this.didStoreInfura.get(cid);
        } catch (e) {
          this.logger.error(
            `Can not fetch claim from Infura IPFS. CID ${cid}: ${e}`
          );
          return;
        }
      }
      try {
        const clusterCid = await this.didStoreCluster.save(claim);
        this.logger.debug(`CID ${cid} saved in cluster by CID ${clusterCid}`);
      } catch (e) {
        this.logger.error(
          `Can not save claim in IPFS cluster. CID ${cid}: ${e}`
        );
        return;
      }
    }
  }
}
