import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '../logger/logger.service';
import { DidStoreGatewayFactory } from './did-store.gateway';

@Injectable()
export class DidStoreService {
  constructor(
    private readonly logger: Logger,
    private storeFactory: DidStoreGatewayFactory
  ) {
    this.logger.setContext(DidStoreService.name);
  }

  /**
   * Get claim from cluster. If claim isn't found tries to get from gateway
   *
   * @param cid Content identifier.
   * @returns Stringified credential
   */
  public async get(type: string, cid: string): Promise<string> {
    let claim: string;
    this.logger.debug(`trying to get ${cid}`);
    try {
      claim = await this.storeFactory.getGateway(type).get(cid);
    } catch (e) {
      this.logger.debug(`Claim is not resolved in ${type}. Claim CID ${cid}`);
      throw new HttpException(
        `Claim ${cid} not resolved`,
        HttpStatus.NOT_FOUND
      );
    }
    this.logger.debug(`got ${cid}`);

    return claim;
  }

  /**
   * Saves credential on cluster
   *
   * @param credential Credential being persisted
   * @returns CID of the persisted credential
   */
  public async save(type: string, credential: string): Promise<string> {
    try {
      return await this.storeFactory.getGateway(type).save(credential);
    } catch (error) {
      throw new Error(`Error saving ${credential} in ${type}: ${error.reason}`);
    }
  }

}
