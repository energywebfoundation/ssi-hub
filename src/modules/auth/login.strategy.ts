import { LoginStrategy } from 'passport-did-auth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(LoginStrategy, 'login') {
  constructor(configService: ConfigService) {
    let loginStrategyParams = {
      name: 'login',
      rpcUrl: configService.get<string>('ENS_URL'),
      cacheServerUrl: configService.get<string>('STRATEGY_CACHE_SERVER'),
      privateKey: configService.get<string>('STRATEGY_PRIVATE_KEY'),
      ensResolverAddress: configService.get<string>('RESOLVER_V2_ADDRESS'),
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
