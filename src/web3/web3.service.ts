import { Injectable } from '@nestjs/common';
import { providers } from 'ethers';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';
import { RoleDefinition } from '../Interfaces/Types';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class Web3Service {

  constructor(
    private roleService: RoleService,
    private applicationService: ApplicationService,
    private organizationService: OrganizationService
  ) {
    this.connect();
    // this.testOrgAppRole();
  }

  private async testOrgAppRole(){
    await this.createRole({
      data: JSON.stringify({
        version: "1",
        roleType: 'org',
        roleName: 'onion',
        fields: [{
          fieldType: 'a',
          label: 'bb',
          validation: 'ccc'
        }],
        metadata: {
          a: '1',
          b: '2',
          c: '3',
        },
      }),
      namespace: 'onion.org.iam.ewc',
    })
    await this.createRole({
      data: JSON.stringify({
        version: "1",
        roleType: 'app',
        roleName: 'onionapp',
        fields: [{
          fieldType: 'a',
          label: 'bb',
          validation: 'ccc'
        }],
        metadata: {
          a: '1',
          b: '2',
          c: '3',
        },
      }),
      namespace: 'onionapp.apps.onion.org.iam.ewc',
    })
    await this.createRole({
      data: JSON.stringify({
        version: "1",
        roleType: 'custom',
        roleName: 'admin',
        fields: [{
          fieldType: 'a',
          label: 'bb',
          validation: 'ccc'
        }],
        metadata: {
          a: '1',
          b: '2',
          c: '3',
        },
      }),
      namespace: 'admin.roles.onionapp.apps.onion.org.iam.ewc',
    })
  }

  private async connect() {
    const provider = new providers.JsonRpcProvider('https://volta-rpc.energyweb.org');

    const publicResolverFactory = PublicResolverFactory.connect(
      '0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680'
      , provider
    );

    publicResolverFactory.addListener('TextChanged', async (hash) => {

      const namespace = await publicResolverFactory.name(hash);
      if(!namespace) {
        return;
      }

      const data = await publicResolverFactory.text(hash, "metadata");

      await this.createRole({data, namespace});
    })
  }

  private async createRole({data, namespace} :{ data: string; namespace: string }) {
    const metadata: RoleDefinition = JSON.parse(data);
    const namespaceFragments = this.roleService.splitNamespace(namespace);

    const orgNamespace = this.roleService.getNamespaceOf('org', namespaceFragments);
    const appNamespace = this.roleService.getNamespaceOf('app', namespaceFragments);
    const roleNamespace = this.roleService.getNamespaceOf('role', namespaceFragments);

    if(metadata.roleType === 'org' && orgNamespace) {
      const orgExists = await this.organizationService.exists(orgNamespace);
      if(!orgExists) {
        await this.organizationService.create(namespaceFragments.org, metadata, namespace);
        return;
      }
    }

    const org = await this.organizationService.getByNamespace(orgNamespace);
    const orgId = org.Data[0].uid;

    if(metadata.roleType === 'app' && appNamespace) {
      const appExists = await this.applicationService.exists(appNamespace);
      if(orgId && !appExists) {
        const appId = await this.applicationService.create(namespaceFragments.apps, metadata, namespace);
        await this.organizationService.addApp(orgId, appId);
        return;
      }
    }

    const app = await this.applicationService.getByNamespace(appNamespace);
    const appId = app.Data[0]?.uid;

    if(metadata.roleType === 'custom' && roleNamespace) {
      const roleExists = await this.roleService.exists(roleNamespace);
      if(orgId && appId && !roleExists) {
        const roleId = await this.roleService.create(namespaceFragments.apps, metadata, namespace);
        await this.applicationService.addRole(appId, roleId);
        return
      }
    }
  }
}
