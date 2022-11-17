import { providers, utils } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Logger } from '../modules/logger/logger.service';

const { poll } = utils;

@Injectable()
export class Provider extends providers.JsonRpcProvider {
  private attempts: number;

  constructor(configService: ConfigService, private logger: Logger) {
    super(configService.get('ENS_URL'));
    // By default request will not be retried
    this.attempts = configService.get('CHAIN_REQUEST_ATTEMPTS') || 1;
  }

  /**
   * Retries failed chain requests https://github.com/ethers-io/ethers.js/issues/427#issuecomment-465329448
   * @override
   */
  public perform(method: string, params: any) {
    let attempts = 0;
    return poll(() => {
      attempts++;
      return super.perform(method, params).then(
        (result) => {
          return result;
        },
        (error) => {
          if (attempts >= this.attempts) {
            this.logger.warn(
              `Failed to perform rpc-method {${method}} with params ${JSON.stringify(
                params
              )} after ${this.attempts} attempts`
            );
            throw new Error(error);
          } else {
            // Returning undefined to poll tells it to try again
            return undefined;
          }
        }
      );
    });
  }
}
