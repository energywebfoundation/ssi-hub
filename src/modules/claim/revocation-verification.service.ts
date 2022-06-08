import { RevocationVerification } from '@energyweb/vc-verification';
import { Injectable } from '@nestjs/common';
import { ClaimService } from './services';
import { RoleService } from '../role/role.service';
import { RoleCredentialResolver } from './resolvers/credential.resolver';
import { RoleIssuerResolver } from './resolvers/issuer.resolver';
import { RoleRevokerResolver } from './resolvers/revoker.resolver';

@Injectable()
export class RevocationVerificationService extends RevocationVerification {
  constructor(claimService: ClaimService, roleService: RoleService) {
    const issuerResolver = new RoleIssuerResolver(roleService);
    const revokerResolver = new RoleRevokerResolver(roleService);
    const credentialResolver = new RoleCredentialResolver(claimService);
    super(issuerResolver, revokerResolver, credentialResolver);
  }
}
