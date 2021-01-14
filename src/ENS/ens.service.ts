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
import { DgraphService } from '../dgraph/dgraph.service';
import chunk from 'lodash.chunk';

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
    private dgraph: DgraphService,
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
    const ENS_SYNC_ENABLED =
      this.config.get<string>('ENS_SYNC_ENABLED') !== 'false';
    if (ensSyncInterval && ENS_SYNC_ENABLED) {
      const interval = setInterval(
        () => this.syncENS(),
        parseInt(ensSyncInterval),
      );
      this.schedulerRegistry.addInterval('ENS Sync', interval);
    }

    const setup = async () => {
      await this.InitEventListeners();
      await this.loadNamespaces();
      if (ENS_SYNC_ENABLED) {
        await this.syncENS();
      }
    };
    setup();
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

  private async getAllNamespaces() {
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
    const domains = await Promise.all(
      logs.map(log => {
        const parsedLog = ensInterface.parseLog(log);
        const { node } = parsedLog.values;
        return this.publicResolver.name(node);
      }),
    );

    const uniqDomains = [...new Set(domains)];
    return uniqDomains;
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
      this.logger.debug(JSON.stringify(err));
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
      const namespaces = await this.getAllNamespaces();
      const chunks = chunk(namespaces, 50);
      for (const part of chunks) {
        await Promise.allSettled(
          part.map(item => {
            const hash = namehash(item);
            return this.eventHandler(hash, item);
          }),
        );
      }
    } catch (err) {
      this.logger.error(err.toString());
    }
    this.logger.debug('finished sync');
  }
}
