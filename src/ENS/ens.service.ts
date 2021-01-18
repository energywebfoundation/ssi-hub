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
        this.logger.debug(`Role not supported ${name || owner || hash}`);
        return;
      }

      await this.syncNamespace({ data, namespace, owner });
    } catch (err) {
      this.logger.debug(err.toString());
      return;
    }
  }

  getNamespaceInfo({
    namespace,
    metadata,
  }: {
    namespace: string;
    metadata: {
      orgName?: string;
      appName?: string;
      roleName?: string;
      roleType?: string;
    };
  }): {
    type: 'Org' | 'App' | 'Role' | 'NotSupported';
    name?: string;
    orgNamespace?: string;
    appNamespace?: string;
  } {
    const [name, parent, ...rest] = namespace.split('.');
    if (metadata.orgName) {
      return {
        type: 'Org',
        name,
        orgNamespace:
          parent !== 'iam' ? [parent, ...rest].join('.') : undefined,
      };
    }
    if (metadata.appName) {
      if (parent === 'apps') {
        return {
          name,
          type: 'App',
          orgNamespace: rest.join('.'),
        };
      }
    }

    if (metadata.roleName) {
      if (metadata.roleType.toLowerCase() === 'app') {
        return {
          name,
          type: 'Role',
          appNamespace: rest.join('.'),
        };
      }
      if (metadata.roleType.toLowerCase() === 'org') {
        return {
          name,
          type: 'Role',
          orgNamespace: rest.join('.'),
        };
      }
    }
    return {
      type: 'NotSupported',
    };
  }

  public async syncNamespace({
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
      this.logger.debug('Metadata not parsable: ' + data);
      return;
    }
    const { type, appNamespace, name, orgNamespace } = this.getNamespaceInfo({
      metadata,
      namespace,
    });
    if (type === 'NotSupported') {
      this.logger.debug(
        'Metadata or namespace not supported for ' + namespace + ': ' + data,
      );
      return;
    }

    const organization = await this.organizationService.getByNamespace(
      orgNamespace,
    );
    const orgId = organization?.uid;

    if (type === 'Org') {
      const orgExists = await this.organizationService.exists(namespace);
      if (!orgExists) {
        await this.organizationService.create({
          name,
          definition: metadata as CreateOrganizationDefinition,
          namespace,
          owner,
          parentOrg: orgId ? organization : undefined,
        });
        this.logger.debug(
          `created ${
            orgId ? 'sub organization' : 'organization'
          } for ${namespace}`,
        );
        return;
      }
      await this.organizationService.updateNamespace(namespace, {
        name,
        definition: metadata as CreateOrganizationDefinition,
        namespace,
        owner,
      });
      this.logger.debug(`${orgId ? 'SubOrg' : 'Org'} updated: ${namespace}`);
      return;
    }

    if (type === 'App') {
      const appExists = await this.applicationService.exists(namespace);
      if (orgId && !appExists) {
        const newAppId = await this.applicationService.create({
          name,
          definition: metadata as CreateApplicationDefinition,
          namespace,
          owner,
        });
        await this.organizationService.addApp(orgId, newAppId);
        this.logger.debug(
          `created app for ${namespace} and added to ${orgNamespace}`,
        );
        return;
      }
      if (!orgId) {
        this.logger.debug(
          `Organization for application not exists ${namespace}`,
        );
        return;
      }
      await this.applicationService.updateNamespace(namespace, {
        name,
        definition: metadata as CreateApplicationDefinition,
        namespace,
        owner,
      });
      this.logger.debug(`App updated: ${namespace}`);
      return;
    }

    const app = await this.applicationService.getByNamespace(appNamespace);
    const appId = app?.uid;

    const roleData = metadata as CreateRoleDefinition;

    if (type === 'Role') {
      const roleExists = await this.roleService.exists(namespace);
      if ((orgId || appId) && !roleExists) {
        const roleId = await this.roleService.create({
          name,
          definition: roleData,
          namespace,
          owner,
        });
        if (appId) {
          await this.applicationService.addRole(appId, roleId);
          this.logger.debug(
            `created role ${namespace} and added to app ${appNamespace}`,
          );
        } else if (orgId) {
          await this.organizationService.addRole(orgId, roleId);
          this.logger.debug(
            `created role ${namespace} and added to org ${orgNamespace}`,
          );
        }
        return;
      }
      if (!orgId && !appId) {
        this.logger.debug(
          `App or organization for role does not exists: ${namespace}`,
        );
        return;
      }
      await this.roleService.updateNamespace(namespace, {
        name,
        definition: roleData,
        namespace,
        owner,
      });
      this.logger.debug(`Role updated: ${namespace}`);
      return;
    }
    this.logger.debug(
      `Bailed: Data not supported ${namespace}, ${JSON.stringify(metadata)}`,
    );
  }

  private async loadNamespaces() {
    const create = async (namespace: string, data: string) => {
      const owner = await this.ensRegistry.owner(namehash(namespace));
      await this.syncNamespace({ data, namespace, owner });
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
