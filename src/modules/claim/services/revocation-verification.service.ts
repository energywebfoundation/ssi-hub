import { RevocationVerification } from '@energyweb/vc-verification';
import { Inject, Injectable } from '@nestjs/common';
import { verifyCredential } from 'didkit-wasm-node';
import { RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { ClaimService } from '.';
import { Provider } from '../../../common/provider';
import { RoleService } from '../../role/role.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { RoleIssuerResolver } from '../resolvers/issuer.resolver';
import { RoleRevokerResolver } from '../resolvers/revoker.resolver';

@Injectable()
export class RevocationVerificationService extends RevocationVerification {
  constructor(
    claimService: ClaimService,
    roleService: RoleService,
    provider: Provider,
    @Inject('RegistrySettings') registrySettings: RegistrySettings
  ) {
    const issuerResolver = new RoleIssuerResolver(roleService);
    const revokerResolver = new RoleRevokerResolver(roleService);
    const credentialResolver = new RoleCredentialResolver(claimService);
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
