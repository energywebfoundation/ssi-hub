import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { DidStore as DidStoreGateway } from 'didStoreGateway';
import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CID } from 'multiformats/cid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { inspect } from 'util';
import { PINS_QUEUE, PIN_CLAIM } from './ipfs.types';
import { Logger } from '../logger/logger.service';

@Injectable()
export class IPFSService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private didStoreCluster: DidStoreCluster,
    private didStoreGateway: DidStoreGateway,
    @InjectQueue(PINS_QUEUE) private readonly pinsQueue: Queue<string>,
    private readonly logger: Logger
  ) {
    this.logger.setContext(IPFSService.name);
  }

  async onModuleInit() {
    const jobsCount = await this.pinsQueue.getJobCounts();
    this.logger.info(
      `Service endpoints pinning jobs statuses ${inspect(jobsCount, {
        depth: 3,
        colors: true,
      })}`
    );
  }

  async onModuleDestroy() {
    await this.pinsQueue.close();
  }

  /**
   * Check if given value is a valid IPFS CID.
   *
   * ```typescript
   * didService.isCID('Qm...');
   * ```
   *
   * @param {Any} hash value to check
   *
   */
  static isCID(hash: unknown): boolean {
    try {
      if (typeof hash === 'string') {
        return Boolean(CID.parse(hash));
      }

      if (hash instanceof Uint8Array) {
        return Boolean(CID.decode(hash));
      }

      return Boolean(CID.asCID(hash));
    } catch (e) {
      return false;
    }
  }

  /**
   * Get claim from cluster. If claim isn't found tries to get from gateway
   *
   * @param cid Content identifier.
   * @returns Stringified credential
   */
  public async get(cid: string): Promise<string> {
    let claim: string;
    if (await this.didStoreCluster.isPinned(cid)) {
      this.logger.debug(`${cid} was pinned. Getting from cluster`);
      claim = await this.didStoreCluster.get(cid);
    } else {
      this.logger.debug(`${cid} was not pinned. Getting from gateway`);
      try {
        claim = await this.didStoreGateway.get(cid);
        await this.pinsQueue.add(PIN_CLAIM, JSON.stringify({ cid, claim }));
      } catch (e) {
        // 504 is the expected response code when IPFS gateway is unable to provide content within time limit
        // https://github.com/ipfs/specs/blob/main/http-gateways/PATH_GATEWAY.md#504-gateway-timeout
        // In other words, this is the expected response code if the traversal of the DHT fails to find the content
        if (e?.response?.status === 504 || e?.response?.status === 404) {
          throw new HttpException(
            `Claim ${cid} not found`,
            HttpStatus.NOT_FOUND
          );
        } else {
          throw e;
        }
      }
    }
    return claim;
  }

  /**
   * Saves credential on cluster
   *
   * @param credential Credential being persisted
   * @returns CID of the persisted credential
   */
  public async save(credential: string): Promise<string> {
    return this.didStoreCluster.save(credential);
  }
}
