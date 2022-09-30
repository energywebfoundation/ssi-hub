import { IIssuerDefinition } from '@energyweb/credential-governance';
import {
  IRoleDefinitionCache,
  IssuerResolver,
} from '@energyweb/vc-verification';
import { RoleService } from '../../role/role.service';

export class RoleIssuerResolver implements IssuerResolver {
  roleDefinitionCache: IRoleDefinitionCache;
  constructor(private readonly roleService: RoleService) {}

  async getIssuerDefinition(namespace: string): Promise<IIssuerDefinition> {
    const role = await this.roleService.getByNamespace(namespace);
    return role?.definition?.issuer;
  }
  setRoleDefinitionCache(roleDefCache: IRoleDefinitionCache): void {
    this.roleDefinitionCache = roleDefCache;
  }
}
