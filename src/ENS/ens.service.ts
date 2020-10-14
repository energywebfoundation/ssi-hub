import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { providers, utils, errors } from 'ethers';
import { abi as ensResolverContract } from '@ensdomains/resolver/build/contracts/PublicResolver.json';
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
import { ORG_MOCK_DATA } from './ens.testService';
import { PopulateRolesConfig } from '../../PopulateRolesConfig';
import { CreateOrganizationDefinition } from '../organization/OrganizationDTO';
import { CreateApplicationDefinition } from '../application/ApplicationDTO';
import { CreateRoleDefinition } from '../role/RoleTypes';

enum ENSNamespaceTypes {
  Roles = 'roles',
  Application = 'apps',
  Organization = 'org',
}

@Injectable()
export class EnsService {
  private publicResolver: PublicResolver;
  private ensRegistry: EnsRegistry;
  private provider: providers.JsonRpcProvider;
  private logger: Logger;
  constructor(
    private roleService: RoleService,
    private applicationService: ApplicationService,
    private organizationService: OrganizationService,
    private config: ConfigService,
  ) {
    this.logger = new Logger('ENSService');
    errors.setLogLevel('error');
    const ENS_URL = this.config.get<string>('ENS_URL');
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>(
      'PUBLIC_RESOLVER_ADDRESS',
    );
    const ENS_REGISTRY_ADDRESS = this.config.get<string>(
      'ENS_REGISTRY_ADDRESS',
    );
    this.provider = new providers.JsonRpcProvider(ENS_URL);
    this.publicResolver = PublicResolverFactory.connect(
      PUBLIC_RESOLVER_ADDRESS,
      this.provider,
    );
    this.ensRegistry = EnsRegistryFactory.connect(
      ENS_REGISTRY_ADDRESS,
      this.provider,
    );

    this.InitEventListeners();
    this.loadNamespaces();
    this.syncDatabase();
  }

  private async InitEventListeners(): Promise<void> {
    this.publicResolver.addListener('TextChanged', async hash => {
      this.eventHandler(hash);
    });
  }

  private async getSubdomains({ domain }: { domain: string }) {
    const ensInterface = new utils.Interface(ensResolverContract);
    const Event = this.publicResolver.filters.TextChanged(
      null,
      'metadata',
      null,
    );
    const filter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: Event.address,
      topics: [...(Event.topics as string[])],
    };
    const logs = await this.provider.getLogs(filter);
    const rawLogs = logs.map(log => {
      const parsedLog = ensInterface.parseLog(log);
      return parsedLog.values;
    });
    const domains = await Promise.all(
      rawLogs.map(async ({ node }) => {
        return this.publicResolver.name(node);
      }),
    );
    const uniqDomains: Record<string, unknown> = {};
    for (const item of domains) {
      if (item && item.endsWith(domain) && !uniqDomains[item]) {
        uniqDomains[item] = null;
      }
    }
    const foundDomains = Object.keys(uniqDomains);
    const role = domain.split('.');
    const subdomains: Record<string, null> = {};
    for (const name of foundDomains) {
      const nameArray = name.split('.').reverse();
      if (nameArray.length <= role.length) return;
      subdomains[nameArray[role.length]] = null;
    }
    return Object.keys(subdomains);
  }

  public async eventHandler(hash: string, name?: string) {
    try {
      const promises = [
        this.ensRegistry.owner(hash),
        this.publicResolver.text(hash, 'metadata'),
      ]
      if (!name) {
        promises.push(this.publicResolver.name(hash))
      }
      
      const [owner, data, namespace = name] = await Promise.all(promises);

      if (!namespace || !owner || !data) {
        this.logger.debug(`Role not supported ${name || namespace || hash}`);
        return;
      }

      await this.createRole({ data, namespace, owner });
    } catch (err) {
      this.logger.debug(err);
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
    let metadata: DefinitionData;
    try {
      metadata = JSON.parse(data);
    } catch (err) {
      this.logger.debug('invalid metadata json: ', data);
      return;
    }
    const namespaceFragments = this.roleService.splitNamespace(namespace);

    const orgNamespace = this.roleService.getNamespaceOf(
      'org',
      namespaceFragments,
    );
    const appNamespace = this.roleService.getNamespaceOf(
      'app',
      namespaceFragments,
    );
    const roleNamespace = this.roleService.getNamespaceOf(
      'role',
      namespaceFragments,
    );

    const orgData = metadata as CreateOrganizationDefinition;

    if (orgData.orgName && orgNamespace) {
      const orgExists = await this.organizationService.exists(orgNamespace);
      if (!orgExists) {
        await this.organizationService.create({
          name: namespaceFragments.org,
          definition: orgData,
          namespace,
          owner,
        });
        this.logger.debug(`created organization for ${orgNamespace}`);
        return;
      }
      this.logger.debug(`Org already exists ${orgNamespace}`);
      // await this.organizationService.updateNamespace(orgNamespace, {
      //   name: namespaceFragments.org,
      //   definition: orgData,
      //   namespace,
      //   owner,
      // });
      return;
    }

    const org = await this.organizationService.getByNamespace(orgNamespace);
    const orgId = org?.uid;

    const appData = metadata as CreateApplicationDefinition;

    if (appData.appName && appNamespace) {
      const appExists = await this.applicationService.exists(appNamespace);
      if (orgId && !appExists) {
        const newAppId = await this.applicationService.create({
          name: namespaceFragments.apps,
          definition: appData,
          namespace,
          owner,
        });
        await this.organizationService.addApp(orgId, newAppId);
        this.logger.debug(
          `created app for ${appNamespace} and added to ${orgNamespace}`,
        );
        return;
      }
      if (appExists) {
        this.logger.debug(`Application already exists ${appNamespace}`);
      }
      if (!orgId) {
        this.logger.debug(
          `Organization for application not exists ${appNamespace}`,
        );
      }
      // await this.organizationService.updateNamespace(appNamespace, {
      //   name: namespaceFragments.apps,
      //   definition: orgData,
      //   namespace,
      //   owner,
      // });
      return;
    }

    const app = await this.applicationService.getByNamespace(appNamespace);
    const appId = app?.uid;

    const roleData = metadata as CreateRoleDefinition;

    if (roleData.roleName && roleNamespace) {
      const roleExists = await this.roleService.exists(roleNamespace);
      if ((orgId || appId) && !roleExists) {
        const roleId = await this.roleService.create({
          name: namespaceFragments.roles,
          definition: roleData,
          namespace,
          owner,
        });
        if (appId) {
          await this.applicationService.addRole(appId, roleId);
          this.logger.debug(
            `created role ${roleNamespace} and added to app ${appNamespace}`,
          );
        } else if (orgId) {
          await this.organizationService.addRole(orgId, roleId);
          this.logger.debug(
            `created role ${roleNamespace} and added to org ${orgNamespace}`,
          );
        }
        return;
      }
      if (roleExists) {
        this.logger.debug(`Role already exists ${roleNamespace}`);
      }
      if (!orgId || !appId) {
        this.logger.debug(
          `App or organization for role does not exists: ${roleNamespace}`,
        );
      }
      // await this.roleService.updateNamespace(roleNamespace, {
      //   name: namespaceFragments.roles,
      //   definition: roleData,
      //   namespace,
      //   owner,
      // });
      return;
    }
    this.logger.debug(
      `Bailed: Data not supported ${namespace}, ${JSON.stringify(metadata)}`,
    );
  }

  private async loadNamespaces() {
    const create = async (namespace: string, data: string) => {
      const owner = await this.ensRegistry.owner(namehash(namespace));
      await this.createRole({ data, namespace, owner });
    };

    await Promise.all(
      PopulateRolesConfig.orgs.map(o => create(o, ORG_MOCK_DATA)),
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async syncDatabase() {
    this.logger.debug('started sync');
    const organizations = await this.getSubdomains({ domain: 'iam.ewc' });
    for (const org of organizations) {
      const hash = namehash(`${org}.iam.ewc`);
      await this.eventHandler(hash, `${org}.iam.ewc`);
      const [roles, applications] = await Promise.all([
        this.getSubdomains({
          domain: `${ENSNamespaceTypes.Roles}.${org}.iam.ewc`,
        }),
        this.getSubdomains({
          domain: `${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
        }),
      ]);
      for (const role of roles) {
        const hash = namehash(
          `${role}.${ENSNamespaceTypes.Roles}.${org}.iam.ewc`,
        );
        await this.eventHandler(hash, `${role}.${ENSNamespaceTypes.Roles}.${org}.iam.ewc`);
      }
      for (const app of applications) {
        const hash = namehash(
          `${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
        );
        await this.eventHandler(hash, `${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`);
        const roles = await this.getSubdomains({
          domain: `${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
        });
        for (const role of roles) {
          const hash = namehash(
            `${role}.${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
          );
          await this.eventHandler(hash, `${role}.${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`);
        }
      }
    }
    this.logger.debug('finished sync');
  }
}
