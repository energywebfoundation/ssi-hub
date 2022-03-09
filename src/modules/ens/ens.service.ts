import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { utils } from 'ethers';
import chunk from 'lodash.chunk';
import { LogLevel } from '@ethersproject/logger';
import {
  IRoleDefinition,
  IAppDefinition,
  IOrganizationDefinition,
  DomainReader,
  DomainHierarchy,
  ResolverContractType,
  VOLTA_CHAIN_ID,
} from '@energyweb/iam-contracts';
import { PublicResolver__factory } from '../../ethers/factories/PublicResolver__factory';
import { RoleService } from '../role/role.service';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { ENSRegistry__factory } from '../../ethers/factories/ENSRegistry__factory';
import { PublicResolver } from '../../ethers/PublicResolver';
import { ENSRegistry } from '../../ethers/ENSRegistry';
import { namehash } from '../../ethers/utils';
import { DomainNotifier__factory } from '../../ethers/factories/DomainNotifier__factory';
import { DomainNotifier } from '../../ethers/DomainNotifier';
import { Logger } from '../logger/logger.service';
import { Provider } from '../../common/provider';
import { SentryTracingService } from '../sentry/sentry-tracing.service';

const { solidityKeccak256 } = utils;
export const emptyAddress = '0x'.padEnd(42, '0');

@Injectable()
export class EnsService implements OnModuleDestroy {
  private publicResolver: PublicResolver;
  private domainNotifier: DomainNotifier;
  private ensRegistry: ENSRegistry;
  private domainReader: DomainReader;
  private domainHierarchy: DomainHierarchy;

  constructor(
    private readonly roleService: RoleService,
    private readonly applicationService: ApplicationService,
    private readonly organizationService: OrganizationService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly provider: Provider,
    private readonly sentryTracingService: SentryTracingService
  ) {
    this.logger.setContext(EnsService.name);
    utils.Logger.setLogLevel(LogLevel.ERROR);

    const CHAIN_ID = parseInt(this.config.get<string>('CHAIN_ID'));
    const RESOLVER_V1_ADDRESS = this.config.get<string>('RESOLVER_V1_ADDRESS');
    const RESOLVER_V2_ADDRESS = this.config.get<string>('RESOLVER_V2_ADDRESS');
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>(
      'PUBLIC_RESOLVER_ADDRESS'
    );
    const DOMAIN_NOTIFIER_ADDRESS = this.config.get<string>(
      'DOMAIN_NOTIFIER_ADDRESS'
    );
    const ENS_REGISTRY_ADDRESS = this.config.get<string>(
      'ENS_REGISTRY_ADDRESS'
    );
    // Connect to smart contracts
    this.publicResolver = PublicResolver__factory.connect(
      PUBLIC_RESOLVER_ADDRESS,
      this.provider
    );
    this.domainNotifier = DomainNotifier__factory.connect(
      DOMAIN_NOTIFIER_ADDRESS,
      this.provider
    );
    this.ensRegistry = ENSRegistry__factory.connect(
      ENS_REGISTRY_ADDRESS,
      this.provider
    );
    this.domainReader = new DomainReader({
      ensRegistryAddress: ENS_REGISTRY_ADDRESS,
      provider: this.provider,
    });
    this.domainReader.addKnownResolver({
      chainId: CHAIN_ID,
      address: RESOLVER_V2_ADDRESS,
      type: ResolverContractType.RoleDefinitionResolver_v2,
    });
    if (CHAIN_ID === VOLTA_CHAIN_ID) {
      this.domainReader.addKnownResolver({
        chainId: CHAIN_ID,
        address: RESOLVER_V1_ADDRESS,
        type: ResolverContractType.RoleDefinitionResolver_v1,
      });
      this.domainReader.addKnownResolver({
        chainId: CHAIN_ID,
        address: PUBLIC_RESOLVER_ADDRESS,
        type: ResolverContractType.PublicResolver,
      });
    }

    this.domainHierarchy = new DomainHierarchy({
      domainReader: this.domainReader,
      ensRegistryAddress: this.ensRegistry.address,
      provider: this.provider,
      domainNotifierAddress: DOMAIN_NOTIFIER_ADDRESS,
      publicResolverAddress: PUBLIC_RESOLVER_ADDRESS,
    });

    // Using setInterval so that interval can be set dynamically from config
    const ensSyncInterval = this.config.get<string>(
      'ENS_SYNC_INTERVAL_IN_HOURS'
    );
    const ENS_SYNC_ENABLED =
      this.config.get<string>('ENS_SYNC_ENABLED') !== 'false';
    const isTestEnv = this.config.get<string>('NODE_ENV') === 'test';

    if (ensSyncInterval && ENS_SYNC_ENABLED && !isTestEnv) {
      const interval = setInterval(
        () => this.syncENS(),
        parseInt(ensSyncInterval) * 3600000
      );
      this.schedulerRegistry.addInterval('ENS Sync', interval);
      this.InitEventListeners();
      this.syncENS();
    }
    this.syncENS();
  }

  private async deleteNamespace(hash: string) {
    try {
      const isOrg = await this.organizationService.getByNamehash(hash);
      if (isOrg) {
        await this.organizationService.removeByNameHash(hash);
        this.logger.log(
          `OrgDeleted: successfully removed deregistered org with namehash ${hash}`
        );
      }

      const isRole = await this.roleService.getByNamehash(hash);
      if (isRole) {
        await this.roleService.removeByNameHash(hash);
        this.logger.log(
          `RoleDeleted: successfully removed deregistered role with namehash ${hash}`
        );
      }

      const isApp = await this.applicationService.getByNamehash(hash);
      if (isApp) {
        await this.applicationService.removeByNameHash(hash);
        this.logger.log(
          `AppDeleted: successfully removed deregistered app with namehash ${hash}`
        );
      }
      return;
    } catch (err) {
      this.logger.debug(
        `NamespaceDelete: An error occurred while try to remove ${namehash} namehash: ${err}`
      );
    }
  }

  private InitEventListeners(): void {
    // Register event handler for legacy PublicResolver definitions
    this.publicResolver.on('TextChanged', async (hash) => {
      await this.eventHandler({ hash });
    });

    // Register event handler for owner change or namespace deletion
    this.ensRegistry.on('NewOwner', async (node, label, owner) => {
      await this.eventHandler({
        hash: solidityKeccak256(['bytes', 'bytes'], [label, node]),
        owner,
      });
    });

    // Register event handler for new Role/App/Org
    this.ensRegistry.on('Transfer', async (node, owner) => {
      this.eventHandler({ hash: node, owner });
    });

    // Register event handler for domain definition updates
    this.domainNotifier.on('DomainUpdated', async (node) => {
      const namespace = await this.domainReader.readName(node);
      if (!namespace) return;
      await this.eventHandler({ hash: node });
    });
  }

  private async getAllNamespaces() {
    const domains = await this.domainHierarchy.getSubdomainsUsingResolver({
      domain: 'iam.ewc',
      mode: 'ALL',
    });
    return domains;
  }

  private async eventHandler({
    hash,
    owner,
  }: {
    hash: string;
    owner?: string;
  }) {
    let name: string;
    const namespaceOwner = owner ? owner : await this.ensRegistry.owner(hash);
    try {
      if (namespaceOwner === emptyAddress) {
        //prevent resync and remove namespace from database
        return this.deleteNamespace(hash);
      }

      name = await this.domainReader.readName(hash);
      // Don't want to sync domains that end in "roles" or "apps" (like "roles.domain.iam.ewc")
      // This is because these are "spacer" domains that do not have metadata
      if (name.startsWith('roles') || name.startsWith('apps')) {
        return;
      }

      const data = await this.domainReader.read({ node: hash });

      if (!namespaceOwner || !data) {
        this.logger.debug(
          `Role: ${name} not supported lack of owner or metadata`
        );
        return;
      }

      await this.syncNamespace({
        data,
        namespace: name,
        owner: namespaceOwner,
        hash,
      });
    } catch (err) {
      this.logger.error(
        `Error syncing namespace ${name}, owner ${namespaceOwner}, ${err}`
      );
      return;
    }
  }

  public async syncNamespace({
    data,
    namespace,
    owner,
    hash,
  }: {
    data: IRoleDefinition | IOrganizationDefinition | IAppDefinition;
    namespace: string;
    owner: string;
    hash: string;
  }) {
    const [name, parent, ...rest] = namespace.split('.');

    if (DomainReader.isOrgDefinition(data)) {
      return this.organizationService.handleOrgSyncWithEns({
        metadata: data,
        namespace,
        owner,
        name,
        parentOrgNamespace:
          parent !== 'iam' ? [parent, ...rest].join('.') : undefined,
        namehash: hash,
      });
    }
    if (DomainReader.isAppDefinition(data)) {
      if (parent === 'apps') {
        return this.applicationService.handleAppSyncWithEns({
          metadata: data,
          namespace,
          owner,
          name,
          parentOrgNamespace: rest.join('.'),
          namehash: hash,
        });
      }
      this.logger.debug(
        `Bailed: App with namespace:${namespace} does not have 'apps' subdomain`
      );
    }
    if (DomainReader.isRoleDefinition(data)) {
      if (data.roleType.toLowerCase() === 'app') {
        return this.roleService.handleRoleSyncWithEns({
          metadata: data,
          namespace,
          owner,
          name,
          appNamespace: rest.join('.'),
          namehash: hash,
        });
      }
      if (data.roleType.toLowerCase() === 'org') {
        return this.roleService.handleRoleSyncWithEns({
          metadata: data,
          namespace,
          owner,
          name,
          orgNamespace: rest.join('.'),
          namehash: hash,
        });
      }
      this.logger.debug(
        `Bailed: Roletype ${data.roleType} is not a valid roletype`
      );
    }
    this.logger.debug(
      `Bailed: Data not supported ${namespace}, ${JSON.stringify(data)}`
    );
  }

  async syncENS() {
    this.logger.info('### Started ENS Sync ###');
    const transaction = this.sentryTracingService.startTransaction({
      op: 'sync-ens',
      name: 'Sync ENS',
    });

    try {
      const namespaces = await this.getAllNamespaces();
      const chunks = chunk(namespaces, 10);

      for (const part of chunks) {
        await Promise.allSettled(
          part.map((item: string) => {
            const hash = namehash(item);
            return this.eventHandler({ hash });
          })
        );
      }
    } catch (err) {
      this.logger.error(err);
    } finally {
      transaction && transaction.finish();
    }
    this.logger.info('### Finished ENS Sync ###');
  }

  onModuleDestroy() {
    this.ensRegistry.removeAllListeners('Transfer');
    this.ensRegistry.removeAllListeners('NewOwner');
    this.domainNotifier.removeAllListeners('DomainUpdated');
    this.publicResolver.removeAllListeners('TextChanged');
  }
}
