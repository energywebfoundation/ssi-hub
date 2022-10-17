import { RevocationVerification } from '@energyweb/vc-verification';
import { Inject, Injectable } from '@nestjs/common';
import { verifyCredential } from 'didkit-wasm-node';
import { RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { Provider } from '../../../common/provider';
import { RoleService } from '../../role/role.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { RoleIssuerResolver } from '../resolvers/issuer.resolver';
import { RoleRevokerResolver } from '../resolvers/revoker.resolver';
import { DIDService } from '../../did/did.service';

@Injectable()
export class RevocationVerificationService extends RevocationVerification {
  constructor(
    didService: DIDService,
    roleService: RoleService,
    provider: Provider,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    revokerResolver: RoleRevokerResolver
  ) {
    const issuerResolver = new RoleIssuerResolver(roleService);
    const credentialResolver = new RoleCredentialResolver(didService);
    super(
      revokerResolver,
      issuerResolver,
      credentialResolver,
      provider,
      registrySettings,
      verifyCredential
    );
  }
}
