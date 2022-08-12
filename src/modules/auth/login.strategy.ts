import { LoginStrategy } from 'passport-did-auth';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(LoginStrategy, 'login') {
  constructor(
    configService: ConfigService,
    @Inject('IPFSClientConfig') ipfsConfig
  ) {
    let loginStrategyParams = {
      name: 'login',
      rpcUrl: configService.get<string>('ENS_URL'),
      cacheServerUrl: configService.get<string>('STRATEGY_CACHE_SERVER'),
      privateKey: configService.get<string>('STRATEGY_PRIVATE_KEY'),
      didContractAddress: configService.get<string>('DID_REGISTRY_ADDRESS'),
      ensRegistryAddress: configService.get<string>('ENS_REGISTRY_ADDRESS'),
      ipfsUrl: ipfsConfig,
    };
    const numBlocksBack = configService.get<string>('STRATEGY_NUM_BLOCKS_BACK');
    if (numBlocksBack) {
      loginStrategyParams = {
        ...loginStrategyParams,
        ...{ numberOfBlocksBack: numBlocksBack },
      };
    }
    super(loginStrategyParams);
  }
}
