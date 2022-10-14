import { IIssuerDefinition } from '@energyweb/credential-governance';
import { IssuerResolver } from '@energyweb/vc-verification';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../../role/role.service';

@Injectable()
export class RoleIssuerResolver implements IssuerResolver {
  constructor(private readonly roleService: RoleService) {}

  async getIssuerDefinition(namespace: string): Promise<IIssuerDefinition> {
    const role = await this.roleService.getByNamespace(namespace);
    return role?.definition?.issuer;
  }
}
