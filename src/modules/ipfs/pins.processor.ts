import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Logger } from '../logger/logger.service';
import { PINS_QUEUE, PIN_CLAIM } from './ipfs.types';

@Processor(PINS_QUEUE)
export class PinsProcessor {
  constructor(
    private readonly didStoreCluster: DidStoreCluster,
    private readonly logger: Logger
  ) {
    this.logger.setContext(PinsProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(PIN_CLAIM)
  public async pinClaim({ data }: Job<string>) {
    const { cid: cidGateway, claim } = JSON.parse(data);
    this.logger.debug(`Pinning ${claim}`);
    try {
      const cidCluster = await this.didStoreCluster.save(claim);
      await this.didStoreCluster.pin(cidGateway);
      this.logger.debug(`${cidGateway} saved on cluster as ${cidCluster}`);
      if (claim !== (await this.didStoreCluster.get(cidGateway))) {
        throw new Error('Cluster content is not resolved by gateway CID');
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
