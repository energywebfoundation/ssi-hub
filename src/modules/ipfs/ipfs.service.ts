import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { DidStore as DidStoreGateway } from 'didStoreInfura';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CID } from 'multiformats/cid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PIN_CLAIM_QUEUE_NAME, PIN_CLAIM_JOB_NAME } from './ipfs.types';
import { Logger } from '../logger/logger.service';

@Injectable()
export class IPFSService {
  constructor(
    private didStoreCluster: DidStoreCluster,
    private didStoreInfura: DidStoreGateway,
    @InjectQueue(PIN_CLAIM_QUEUE_NAME)
    private readonly pinsQueue: Queue<string>,
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
    try {
      claim = await Promise.any([getFromCluster, getFromInfura]);
    } catch (e) {
      // TODO: catch this in DidService
      throw new HttpException(`Claim ${cid} not found`, HttpStatus.NOT_FOUND);
    }

    await this.pinsQueue.add(
      PIN_CLAIM_JOB_NAME,
      JSON.stringify({ cid, claim })
    );
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
