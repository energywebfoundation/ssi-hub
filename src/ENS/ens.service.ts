import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
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
import { ORG_MOCK_DATA } from './ens.testService';
import { PopulateRolesConfig } from '../../PopulateRolesConfig';
import { CreateOrganizationDefinition } from '../organization/OrganizationDTO';
import { CreateApplicationDefinition } from '../application/ApplicationDTO';
import { CreateRoleDefinition } from '../role/RoleTypes';
import { namehash } from '../ethers/utils';
import { OwnerService } from '../owner/owner.service';

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
    private ownerService: OwnerService,
    private roleService: RoleService,
    private applicationService: ApplicationService,
    private organizationService: OrganizationService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private config: ConfigService,
  ) {
    this.logger = new Logger('ENSService');
    errors.setLogLevel('error');

    // Get config values from .env file
    const ENS_URL = this.config.get<string>('ENS_URL');
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>(
      'PUBLIC_RESOLVER_ADDRESS',
    );
    const ENS_REGISTRY_ADDRESS = this.config.get<string>(
      'ENS_REGISTRY_ADDRESS',
    );

    // Connect to smart contracts
    this.provider = new providers.JsonRpcProvider(ENS_URL);
    this.publicResolver = PublicResolverFactory.connect(
      PUBLIC_RESOLVER_ADDRESS,
      this.provider,
    );
    this.ensRegistry = EnsRegistryFactory.connect(
      ENS_REGISTRY_ADDRESS,
      this.provider,
    );

    // Using setInterval so that interval can be set dynamically from config
    const ensSyncInterval = this.config.get<string>('ENS_SYNC_INTERVAL_IN_MS');
    if (ensSyncInterval) {
      const interval = setInterval(
        () => this.syncENS(),
        parseInt(ensSyncInterval),
      );
      this.schedulerRegistry.addInterval('ENS Sync', interval);
    }

    this.InitEventListeners();
    this.loadNamespaces();
    this.syncENS();
  }

  private async InitEventListeners(): Promise<void> {
    // Register event handler for new Role/App/Org
    this.publicResolver.addListener('TextChanged', async hash => {
      await this.eventHandler(hash);
    });

    // Register event handler for owner change or namespace deletion
    this.ensRegistry.addListener('NewOwner', async (node, label, owner) => {
      const hash = utils.keccak256(node + label.slice(2));
      const namespace = await this.publicResolver.name(hash.toString());
      if (namespace === '') {
        return;
      }

      // Remove namespace if owner is set to hex zero
      if (owner === '0x0000000000000000000000000000000000000000') {
        await this.ownerService.deleteNamespace(namespace);
        return;
      }

      await this.ownerService.changeOwner(namespace, owner);
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
        // get owner did
        this.ensRegistry.owner(hash),
        // get role data
        this.publicResolver.text(hash, 'metadata'),
      ];
      if (!name) {
        promises.push(this.publicResolver.name(hash));
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
      await this.organizationService.updateNamespace(orgNamespace, {
        name: namespaceFragments.org,
        definition: orgData,
        namespace,
        owner,
      });
      this.logger.debug(`Org updated: ${orgNamespace}`);
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
      if (!orgId) {
        this.logger.debug(
          `Organization for application not exists ${appNamespace}`,
        );
        return;
      }
      await this.applicationService.updateNamespace(appNamespace, {
        name: namespaceFragments.apps,
        definition: appData,
        namespace,
        owner,
      });
      this.logger.debug(`App updated: ${appNamespace}`);
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
      if (!orgId && !appId) {
        this.logger.debug(
          `App or organization for role does not exists: ${roleNamespace}`,
        );
        return;
      }
      await this.roleService.updateNamespace(roleNamespace, {
        name: namespaceFragments.roles,
        definition: roleData,
        namespace,
        owner,
      });
      this.logger.debug(`Role updated: ${roleNamespace}`);
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

  async syncENS() {
    this.logger.debug('started sync');
    try {
      const organizations = await this.getSubdomains({ domain: 'iam.ewc' });
      for (const org of organizations) {
        try {
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
            try {
              const hash = namehash(
                `${role}.${ENSNamespaceTypes.Roles}.${org}.iam.ewc`,
              );
              await this.eventHandler(
                hash,
                `${role}.${ENSNamespaceTypes.Roles}.${org}.iam.ewc`,
              );
            } catch (err) {
              this.logger.error(err);
              return;
            }
          }
          for (const app of applications) {
            try {
              const hash = namehash(
                `${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
              );
              await this.eventHandler(
                hash,
                `${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
              );
              const roles = await this.getSubdomains({
                domain: `${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
              });
              for (const role of roles) {
                try {
                  const hash = namehash(
                    `${role}.${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
                  );
                  await this.eventHandler(
                    hash,
                    `${role}.${ENSNamespaceTypes.Roles}.${app}.${ENSNamespaceTypes.Application}.${org}.iam.ewc`,
                  );
                } catch (err) {
                  this.logger.error(err);
                  return;
                }
              }
            } catch (err) {
              this.logger.error(err);
              return;
            }
          }
        } catch (err) {
          this.logger.error(err);
          return;
        }
      }
    } catch (err) {
      this.logger.error(err);
      return;
    }
    this.logger.debug('finished sync');
  }
}
