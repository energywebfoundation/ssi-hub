import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { DidStore as DidStoreGateway } from 'didStoreInfura';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CID } from 'multiformats/cid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  PIN_CLAIM_QUEUE_NAME,
  PIN_CLAIM_JOB_NAME,
  PinClaimData,
} from './ipfs.types';
import { Logger } from '../logger/logger.service';
import { inspect } from 'util';

@Injectable()
export class IPFSService {
  constructor(
    private didStoreCluster: DidStoreCluster,
    private didStoreInfura: DidStoreGateway,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private readonly pinsQueue: Queue<PinClaimData>,
    private readonly logger: Logger
  ) {
    this.logger.setContext(IPFSService.name);
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
    const getFromCluster = this.didStoreCluster.get(cid);
    const getFromInfura = this.didStoreInfura.get(cid);
    const timeout = new Promise<string>(
      (_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000) // 5 seconds timeout
    );

    this.logger.debug(`trying to get ${cid}`);
    try {
      claim = await Promise.race([
        Promise.any([getFromCluster, getFromInfura]),
        timeout,
      ]);
    } catch (e) {
      this.logger.debug(`Claim is not resolved in IPFS. Claim CID ${cid}`);
      throw new HttpException(
        `Claim ${cid} not resolved`,
        HttpStatus.NOT_FOUND
      );
    }
    this.logger.debug(`got ${cid}`);

    try {
      await this.pinsQueue.add(PIN_CLAIM_JOB_NAME, { cid, claim });
    } catch (e) {
      this.logger.debug(`Error to add pin job for cid ${cid}: ${e}`);
      const jobsCounts = await this.pinsQueue.getJobCounts();
      this.logger.debug(inspect(jobsCounts, { depth: 2, colors: true }));
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
    const [clusterCID, infuraCID] = await Promise.allSettled([
      this.didStoreCluster.save(credential),
      this.didStoreInfura.save(credential),
    ]);
    if (clusterCID.status === 'fulfilled') {
      return clusterCID.value;
    } else if (infuraCID.status === 'fulfilled') {
      this.logger.warn(
        `Error saving ${credential} in cluster. Was saved to Infura as backup`
      );
      return infuraCID.value;
    } else {
      throw new Error(
        `Error saving ${credential} in Infura: ${infuraCID.reason}`
      );
    }
  }
}
