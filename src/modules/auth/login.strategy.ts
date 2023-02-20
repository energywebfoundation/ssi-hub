import { LoginStrategy } from 'passport-did-auth';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { verifyCredential } from 'didkit-wasm-node';
import { RoleIssuerResolver } from '../claim/resolvers/issuer.resolver';
import { RoleRevokerResolver } from '../claim/resolvers/revoker.resolver';
import { RoleCredentialResolver } from '../claim/resolvers/credential.resolver';
import { LoginStrategyOptions } from 'passport-did-auth/dist/lib/LoginStrategy';

@Injectable()
export class AuthStrategy extends PassportStrategy(LoginStrategy, 'login') {
  constructor(
    configService: ConfigService,
    @Inject('IPFSClientConfig') ipfsConfig,
    issuerResolver: RoleIssuerResolver,
    revokerResolver: RoleRevokerResolver,
    credentialResolver: RoleCredentialResolver
  ) {
    const loginStrategyOptions: LoginStrategyOptions = {
      name: 'login',
      rpcUrl: configService.get<string>('ENS_URL'),
      cacheServerUrl: configService.get<string>('STRATEGY_CACHE_SERVER'),
      privateKey: configService.get<string>('STRATEGY_PRIVATE_KEY'),
      didContractAddress: configService.get<string>('DID_REGISTRY_ADDRESS'),
      ensRegistryAddress: configService.get<string>('ENS_REGISTRY_ADDRESS'),
      ipfsUrl: ipfsConfig,
    };
    const loginStrategyParams: ConstructorParameters<typeof LoginStrategy> = [
      loginStrategyOptions,
      issuerResolver,
      revokerResolver,
      credentialResolver,
      verifyCredential,
    ];
    const numberOfBlocksBack = parseInt(
      configService.get<string>('STRATEGY_NUM_BLOCKS_BACK')
    );
    if (numberOfBlocksBack) {
      loginStrategyOptions.numberOfBlocksBack = numberOfBlocksBack;
    }
    super(...loginStrategyParams);
  }
}
