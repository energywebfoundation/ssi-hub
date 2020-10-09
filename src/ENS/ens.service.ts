import { Injectable } from '@nestjs/common';
import { providers } from 'ethers';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';
import { DefinitionData } from '../Interfaces/Types';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';
import { ConfigService } from '@nestjs/config';
import { PublicResolver } from '../ethers/PublicResolver';
import { EnsRegistry } from '../ethers/EnsRegistry';
import { namehash } from '../ethers/utils';
import { APP_MOCK_DATA, ORG_MOCK_DATA, ROLE_MOCK_DATA } from './ens.testService';
import { PopulateRolesConfig } from '../../PopulateRolesConfig';

enum RoleTypes {
  ORG= 'org',
  APP= 'app',
  ROLE= 'custom',
}

@Injectable()
export class EnsService {
  private publicResolver: PublicResolver;
  private ensRegistry: EnsRegistry;
  constructor(
    private roleService: RoleService,
    private applicationService: ApplicationService,
    private organizationService: OrganizationService,
    private config: ConfigService,
  ) {

    const ENS_URL = this.config.get<string>('ENS_URL');
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>('PUBLIC_RESOLVER_ADDRESS');
    const ENS_REGISTRY_ADDRESS = this.config.get<string>('ENS_REGISTRY_ADDRESS');
    const provider = new providers.JsonRpcProvider(ENS_URL);
    this.publicResolver = PublicResolverFactory.connect(PUBLIC_RESOLVER_ADDRESS, provider);
    this.ensRegistry = EnsRegistryFactory.connect(ENS_REGISTRY_ADDRESS, provider);

    this.InitEventListeners();
    this.loadNamespaces();
  }

  private async InitEventListeners(): Promise<void> {
    this.publicResolver.addListener('TextChanged', async hash => {
      this.eventHandler(hash);
    });
  }

  public async eventHandler(hash: string) {
    try {
      const [namespace, owner, data] = await Promise.all([
        this.publicResolver.name(hash),
        this.ensRegistry.owner(hash),
        this.publicResolver.text(hash, 'metadata'),
      ]);

      console.log('hash: ' + hash)
      console.log('namespace: ' + namespace);
      console.log('owner: ' + owner);
      console.log('data: ' + data);

      if (!namespace || !owner || !data) {
        return;
      }

      await this.createRole({ data, namespace, owner });
    } catch (err) {
      return;
    }
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
      console.log('invalid metadata json', err)
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
    const orgId = org?.uid;

    if (metadata.roleType === RoleTypes.APP && appNamespace) {
      const appExists = await this.applicationService.exists(appNamespace);
      if (orgId && !appExists) {
        const newAppId = await this.applicationService.create(
          namespaceFragments.apps,
          metadata,
          namespace,
          owner,
        );
        await this.organizationService.addApp(orgId, newAppId);
        return;
      }
    }

    const app = await this.applicationService.getByNamespace(appNamespace);
    const appId = app?.uid;

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

  private async loadNamespaces() {
    const create = async (namespace: string, data: string) => {
      const owner = await this.ensRegistry.owner(namehash(namespace));
      await this.createRole({data, namespace, owner})
    }

    await Promise.all(PopulateRolesConfig.orgs.map(o => create(o, ORG_MOCK_DATA)))
    await Promise.all(PopulateRolesConfig.apps.map(a => create(a, APP_MOCK_DATA)))
    await Promise.all(PopulateRolesConfig.roles.map(r => create(r, ROLE_MOCK_DATA)))
  }
}
