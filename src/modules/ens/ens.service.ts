import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { utils, errors } from 'ethers';
import { PublicResolverFactory } from '../../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { EnsRegistryFactory } from '../../ethers/EnsRegistryFactory';
import { ConfigService } from '@nestjs/config';
import { PublicResolver } from '../../ethers/PublicResolver';
import { EnsRegistry } from '../../ethers/EnsRegistry';
import { namehash } from '../../ethers/utils';
import chunk from 'lodash.chunk';
import { Logger } from '../logger/logger.service';
import { Provider } from '../../common/provider';
import {
  IRoleDefinition,
  IAppDefinition,
  IOrganizationDefinition,
  DomainReader,
  DomainHierarchy,
  ResolverContractType,
  DomainNotifier__factory,
} from '@energyweb/iam-contracts';
import type { DomainNotifier } from "@energyweb/iam-contracts/dist/ethers-v4/DomainNotifier";

export const emptyAddress = '0x'.padEnd(42, '0');

@Injectable()
export class EnsService {
  private publicResolver: PublicResolver;
  private domainNotifer: DomainNotifier
  private ensRegistry: EnsRegistry;
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
  ) {
    this.logger.setContext(EnsService.name);
    errors.setLogLevel('error');

    // Get config values from .env file
    const CHAIN_ID = parseInt(this.config.get<string>(
      'CHAIN_ID',
    ));
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>(
      'PUBLIC_RESOLVER_ADDRESS',
    );
    const RESOLVER_V1_ADDRESS = this.config.get<string>(
      'RESOLVER_V1_ADDRESS',
    );
    const DOMAIN_NOTIFIER_ADDRESS = this.config.get<string>(
      'DOMAIN_NOTIFIER_ADDRESS',
    );
    const ENS_REGISTRY_ADDRESS = this.config.get<string>(
      'ENS_REGISTRY_ADDRESS',
    );
    // Connect to smart contracts
    this.publicResolver = PublicResolverFactory.connect(
      PUBLIC_RESOLVER_ADDRESS,
      this.provider,
    );
    this.domainNotifer = DomainNotifier__factory.connect(
      DOMAIN_NOTIFIER_ADDRESS,
      this.provider
    )
    this.ensRegistry = EnsRegistryFactory.connect(
      ENS_REGISTRY_ADDRESS,
      this.provider,
    );
    this.domainReader = new DomainReader({
      ensRegistryAddress: ENS_REGISTRY_ADDRESS,
      provider: this.provider
    });
    this.domainReader.addKnownResolver({ chainId: CHAIN_ID, address: RESOLVER_V1_ADDRESS, type: ResolverContractType.RoleDefinitionResolver_v1 });
    this.domainReader.addKnownResolver({ chainId: CHAIN_ID, address: PUBLIC_RESOLVER_ADDRESS, type: ResolverContractType.PublicResolver });

    this.domainHierarchy = new DomainHierarchy({
      domainReader: this.domainReader,
      ensRegistry: this.ensRegistry,
      provider: this.provider,
      domainNotifierAddress: DOMAIN_NOTIFIER_ADDRESS,
      publicResolverAddress: PUBLIC_RESOLVER_ADDRESS
    });

    // Using setInterval so that interval can be set dynamically from config
    const ensSyncInterval = this.config.get<string>(
      'ENS_SYNC_INTERVAL_IN_HOURS',
    );
    const ENS_SYNC_ENABLED =
      this.config.get<string>('ENS_SYNC_ENABLED') !== 'false';
    if (ensSyncInterval && ENS_SYNC_ENABLED) {
      const interval = setInterval(
        () => this.syncENS(),
        parseInt(ensSyncInterval) * 3600000,
      );
      this.schedulerRegistry.addInterval('ENS Sync', interval);
      this.InitEventListeners();
      this.syncENS();
    }
 
  }

  private InitEventListeners(): void {
    // Register event handler for legacy PublicResolver definitions
    this.publicResolver.addListener('TextChanged', async hash => {
      const namespace = await this.publicResolver.name(hash.toString());
      if (!namespace) return;
      await this.eventHandler({ hash, name: namespace });
    });

    // Register event handler for owner change or namespace deletion
    this.ensRegistry.addListener('NewOwner', async (node, label, owner) => {
      const hash = utils.keccak256(node + label.slice(2));
      const namespace = await this.domainReader.readName(hash.toString());
      if (!namespace) return;

      await this.eventHandler({ hash, name: namespace, owner });
    });

    // Register event handler for new Role/App/Org
    this.ensRegistry.addListener('Transfer', async (node, owner) => {
      const namespace = await this.domainReader.readName(node.toString());
      if (!namespace) return;

      this.eventHandler({ hash: node, name: namespace, owner });
    });

    // Register event handler for domain definition updates
    this.domainNotifer.addListener('DomainUpdated', async node => {
      const namespace = await this.domainReader.readName(node);
      if (!namespace) return;
      await this.eventHandler({ hash: node, name: namespace });
    });
  }

  private async getAllNamespaces() {
    const domains = await this.domainHierarchy.getSubdomainsUsingResolver({
      domain: 'iam.ewc',
      mode: "ALL"
    })
    return domains;
  }

  private async eventHandler({
    hash,
    name,
    owner,
  }: {
    hash: string;
    name: string;
    owner?: string;
  }) {
    try {

      const promises: Promise<any>[] = [
        // get role data
        this.domainReader.read({ node: hash })
      ];
      if (!owner) {
        promises.push(this.ensRegistry.owner(hash));
      }

      const [data, namespaceOwner = owner] = await Promise.all(promises);

      if (!namespaceOwner || !data) {
        this.logger.debug(
          `Role: ${name} not supported lack of owner or metadata`,
        );
        return;
      }

      await this.syncNamespace({
        data,
        namespace: name,
        owner: namespaceOwner,
      });
    } catch (err) {
      this.logger.error(`Error syncing namespace ${name}, owner ${owner}, ${err}`);
      return;
    }
  }

  public async syncNamespace({
    data,
    namespace,
    owner,
  }: {
    data: IRoleDefinition | IOrganizationDefinition | IAppDefinition;
    namespace: string;
    owner: string;
  }){
    const [name, parent, ...rest] = namespace.split('.');

    if (DomainReader.isOrgDefinition(data)) {
      return this.organizationService.handleOrgSyncWithEns({
        metadata: data,
        namespace,
        owner,
        name,
        parentOrgNamespace: parent !== 'iam' ? [parent, ...rest].join('.') : undefined,
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
        });
      }
      this.logger.debug(
      `Bailed: App with namespace:${namespace} does not have 'apps' subdomain`,
      );
    }
    if (DomainReader.isRoleDefinition(data)) {
      if (data.roleType.toLowerCase() === 'app') {
        return this.roleService.handleRoleSyncWithEns({
          metadata: data,
          namespace,
          owner,
          name,
          appNamespace: rest.join('.')
        });
      }
      if (data.roleType.toLowerCase() === 'org') {
        return this.roleService.handleRoleSyncWithEns({
          metadata: data,
          namespace,
          owner,
          name,
          orgNamespace: rest.join('.')
        });
      }
      this.logger.debug(
      `Bailed: Roletype ${data.roleType} is not a valid roletype`,
      );
    }
    this.logger.debug(
      `Bailed: Data not supported ${namespace}, ${JSON.stringify(data)}`,
    );
  }

  async syncENS() {
    this.logger.info('### Started ENS Sync ###');
    try {
      const namespaces = await this.getAllNamespaces();
      const chunks = chunk(namespaces, 10);
      for (const part of chunks) {
        await Promise.allSettled(
          part.map((item: string) => {
            const hash = namehash(item);
            return this.eventHandler({ hash, name: item });
          }),
        );
      }
    } catch (err) {
      this.logger.error(err);
    }
    this.logger.info('### Finished ENS Sync ###');
  }
}
