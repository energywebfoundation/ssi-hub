import { IRevokerDefinition } from '@energyweb/credential-governance';
import {
  IRoleDefinitionCache,
  RevokerResolver,
} from '@energyweb/vc-verification';
import { RoleService } from '../../role/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRevokerResolver implements RevokerResolver {
  constructor(private readonly roleService: RoleService) {}

  async getRevokerDefinition(
    namespace: string,
    roleDefCache: IRoleDefinitionCache
  ): Promise<IRevokerDefinition> {
    const role = await this.roleService.getByNamespace(namespace);
    if (!role) return undefined;

    const definition = role.definition;
    roleDefCache.setRoleDefinition(namespace, definition);

    return 'revoker' in definition
      ? definition.revoker
      : { ...definition.issuer, revokerType: definition.issuer.issuerType };
  }
}
