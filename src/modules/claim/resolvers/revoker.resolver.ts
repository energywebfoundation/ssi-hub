import { IRevokerDefinition } from '@energyweb/credential-governance';
import { RevokerResolver } from '@energyweb/vc-verification';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../../role/role.service';

@Injectable()
export class RoleRevokerResolver implements RevokerResolver {
  constructor(private readonly roleService: RoleService) {}

  async getRevokerDefinition(namespace: string): Promise<IRevokerDefinition> {
    const role = await this.roleService.getByNamespace(namespace);
    if (!role) return undefined;

    const definition = role.definition;

    return 'revoker' in definition
      ? definition.revoker
      : { ...definition.issuer, revokerType: definition.issuer.issuerType };
  }
}
