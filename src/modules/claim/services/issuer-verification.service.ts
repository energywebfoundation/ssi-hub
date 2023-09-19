import { Inject, Injectable } from '@nestjs/common';
import { verifyCredential } from 'didkit-wasm-node';
import { RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { Provider } from '../../../common/provider';
import { RoleService } from '../../role/role.service';
import { RoleCredentialResolver } from '../../claim/resolvers/credential.resolver';
import { RoleIssuerResolver } from '../../claim/resolvers/issuer.resolver';
import { DIDService } from '../../did/did.service';
import { IssuerVerification } from '@energyweb/vc-verification';
import { RevocationVerificationService } from '../../claim/services/revocation-verification.service';

@Injectable()
export class IssuerVerificationService extends IssuerVerification {
  constructor(
    didService: DIDService,
    roleService: RoleService,
    provider: Provider,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    revocationVerification: RevocationVerificationService
  ) {
    const issuerResolver = new RoleIssuerResolver(roleService);
    const credentialResolver = new RoleCredentialResolver(didService);
    super(
      issuerResolver,
      credentialResolver,
      provider,
      registrySettings,
      revocationVerification,
      verifyCredential
    );
  }
}
