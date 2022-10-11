import { RevocationVerification } from '@energyweb/vc-verification';
import { Inject, Injectable } from '@nestjs/common';
import { verifyCredential } from 'didkit-wasm-node';
import { RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { Provider } from '../../../common/provider';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { RoleIssuerResolver } from '../resolvers/issuer.resolver';
import { RoleRevokerResolver } from '../resolvers/revoker.resolver';

@Injectable()
export class RevocationVerificationService extends RevocationVerification {
  constructor(
    provider: Provider,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    issuerResolver = RoleIssuerResolver,
    revokerResolver = RoleRevokerResolver,
    credentialResolver = RoleCredentialResolver
  ) {
    super(
      revokerResolver,
      issuerResolver,
      credentialResolver,
      verifyCredential
    );
  }
}
