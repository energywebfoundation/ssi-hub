import { RevocationVerification, Ipfs } from '@energyweb/vc-verification';
import { Inject, Injectable } from '@nestjs/common';
import { verifyCredential } from 'didkit-wasm-node';
import { RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { Provider } from '../../../common/provider';
import { RoleService } from '../../role/role.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { RoleIssuerResolver } from '../resolvers/issuer.resolver';
import { RoleRevokerResolver } from '../resolvers/revoker.resolver';
import { DIDService } from '../../did/did.service';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class RevocationVerificationService extends RevocationVerification {
  constructor(
    didService: DIDService,
    roleService: RoleService,
    provider: Provider,
    @Inject('RegistrySettings') registrySettings: RegistrySettings,
    logger: Logger
  ) {
    const issuerResolver = new RoleIssuerResolver(roleService);
    const revokerResolver = new RoleRevokerResolver(roleService);
    const credentialResolver = new RoleCredentialResolver(didService, logger);
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
