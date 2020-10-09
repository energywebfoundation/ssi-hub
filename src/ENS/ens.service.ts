import { Injectable } from '@nestjs/common';
import { providers } from 'ethers';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';
import { DefinitionData } from '../Interfaces/Types';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';
import { ConfigService } from '@nestjs/config';

enum RoleTypes {
  ORG= 'org',
  APP= 'app',
  ROLE= 'custom',
}

@Injectable()
export class EnsService {
  constructor(
    private roleService: RoleService,
    private applicationService: ApplicationService,
    private organizationService: OrganizationService,
    private config: ConfigService,
  ) {
    this.connect();
  }

  private async connect() {
    const ENS_URL = this.config.get<string>('ENS_URL');
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>('PUBLIC_RESOLVER_ADDRESS');
    const ENS_REGISTRY_ADDRESS = this.config.get<string>('ENS_REGISTRY_ADDRESS');

    const provider = new providers.JsonRpcProvider(ENS_URL);
    const publicResolverFactory = PublicResolverFactory.connect(PUBLIC_RESOLVER_ADDRESS, provider);

    publicResolverFactory.addListener('TextChanged', async hash => {
      try {
        const namespace = await publicResolverFactory.name(hash);
        const owner = await publicResolverFactory.name(hash);
        const data = await publicResolverFactory.text(hash, 'metadata');

        if (!namespace || !owner || !data) {
          return;
        }

        await this.createRole({ data, namespace, owner });
      } catch (err) {
        return;
      }
    });
  }

  public async createRole({
    data,
    namespace,
    owner,
  }: {
    data: string;
    namespace: string;
    owner: string;
  }) {
    let metadata: DefinitionData
    try {
      metadata = JSON.parse(data);
    } catch (err) {
      return;
    }
    const namespaceFragments = this.roleService.splitNamespace(namespace);

    const orgNamespace = this.roleService.getNamespaceOf('org', namespaceFragments);
    const appNamespace = this.roleService.getNamespaceOf('app', namespaceFragments);
    const roleNamespace = this.roleService.getNamespaceOf('role', namespaceFragments);

    if (metadata.roleType === RoleTypes.ORG && orgNamespace) {
      const orgExists = await this.organizationService.exists(orgNamespace);
      if (!orgExists) {
        await this.organizationService.create(
          namespaceFragments.org,
          metadata,
          namespace,
          owner,
        );
        return;
      }
    }

    const org = await this.organizationService.getByNamespace(orgNamespace);
    const orgId = org.Data[0].uid;

    if (metadata.roleType === RoleTypes.APP && appNamespace) {
      const appExists = await this.applicationService.exists(appNamespace);
      if (orgId && !appExists) {
        const appId = await this.applicationService.create(
          namespaceFragments.apps,
          metadata,
          namespace,
          owner,
        );
        await this.organizationService.addApp(orgId, appId);
        return;
      }
    }

    const app = await this.applicationService.getByNamespace(appNamespace);
    const appId = app.Data[0]?.uid;

    if (metadata.roleType === RoleTypes.ROLE && roleNamespace) {
      const roleExists = await this.roleService.exists(roleNamespace);
      if ((orgId || appId) && !roleExists) {
        const roleId = await this.roleService.create(
          namespaceFragments.roles,
          metadata,
          namespace,
          owner,
        );
        if(appId) {
          await this.applicationService.addRole(appId, roleId);
        } else if(orgId) {
          await this.organizationService.addRole(orgId, roleId);
        }
        return;
      }
    }
  }
}
