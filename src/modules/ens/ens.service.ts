import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { providers, utils, errors } from 'ethers';
import { abi as publicResolverContract } from '@ensdomains/resolver/build/contracts/PublicResolver.json';
import { PublicResolverFactory } from '../../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { EnsRegistryFactory } from '../../ethers/EnsRegistryFactory';
import { ConfigService } from '@nestjs/config';
import { PublicResolver } from '../../ethers/PublicResolver';
import { DomainNotifier } from '../../ethers/DomainNotifier';
import { DomainNotifierFactory } from '../../ethers/DomainNotifierFactory';
import { EnsRegistry } from '../../ethers/EnsRegistry';
import { namehash } from '../../ethers/utils';
import chunk from 'lodash.chunk';
import { Logger } from '../logger/logger.service';
import { IRoleDefinition, IAppDefinition, IOrganizationDefinition, DomainReader } from '@energyweb/iam-contracts'
import { abi as domainNotifierContract } from '@energyweb/iam-contracts/build/contracts/DomainNotifier.json'

export const emptyAddress = '0x'.padEnd(42, '0');

@Injectable()
export class EnsService {
  private publicResolver: PublicResolver;
  private domainNotifer: DomainNotifier
  private ensRegistry: EnsRegistry;
  private roleDefinitionReader: DomainDefinitionReader;
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
    const PUBLIC_RESOLVER_ADDRESS = this.config.get<string>(
      'PUBLIC_RESOLVER_ADDRESS',
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
    this.domainNotifer = DomainNotifierFactory.connect(
      DOMAIN_NOTIFIER_ADDRESS,
      this.provider
    )
    this.ensRegistry = EnsRegistryFactory.connect(
      ENS_REGISTRY_ADDRESS,
      this.provider,
    );
    this.roleDefinitionReader = new DomainReader(this.provider);

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
    }
    this.InitEventListeners();
  }

  private InitEventListeners(): void {
    this.publicResolver.addListener('TextChanged', async hash => {
      const namespace = await this.publicResolver.name(hash.toString());
      if (!namespace) return;
      await this.eventHandler({ hash, name: namespace });
    });

    // Register event handler for owner change or namespace deletion
    this.ensRegistry.addListener('NewOwner', async (node, label, owner) => {
      const hash = utils.keccak256(node + label.slice(2));
      const namespace = await this.publicResolver.name(hash.toString());
      if (!namespace) return;

      await this.eventHandler({ hash, name: namespace, owner });
    });

    // Register event handler for new Role/App/Org
    this.ensRegistry.addListener('Transfer', async (node, owner) => {
      const namespace = await this.publicResolver.name(node.toString());
      if (!namespace) return;

      this.eventHandler({ hash: node, name: namespace, owner });
    });
  }

  private async getAllNamespaces() {
    // Get all namespaces from PublicResolver.
    // Role/App/Org definitions were initially stored as text value in PublicResolver
    const publicResolverInterface = new utils.Interface(publicResolverContract);
    const textChangedEvent = this.publicResolver.filters.TextChanged(
      null,
      'metadata',
      null,
    );
    const textChangedFilter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: textChangedEvent.address,
      topics: [...(textChangedEvent.topics as string[])],
    };
    const publicResolverLogs = await this.provider.getLogs(textChangedFilter);
    const publicResolverDomains = await Promise.all(
      publicResolverLogs.map(log => {
        const parsedLog = publicResolverInterface.parseLog(log);
        const { node } = parsedLog.values;
        return this.publicResolver.name(node);
      }),
    );

    // Get all namespaces from DomainNotifier.
    const domainNotifierInterface = new utils.Interface(domainNotifierContract);
    const domainNotifierFilter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: this.domainNotifer.address,
      topics: [...(textChangedEvent.topics as string[])],
    };

    const uniqueDomains = new Set<string>();

    const logs = await this.provider.getLogs(filter);
    const chunks = chunk(logs, 50);
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async log => {
          const parsedLog = ensInterface.parseLog(log);
          const { node } = parsedLog.values;
          const name = await this.publicResolver.name(node);
          if (name) {
            uniqueDomains.add(name);
          }
        }),
      );
    }

    const domainNotifierLogs = await this.provider.getLogs(textChangedFilter);
    await Promise.all(
      domainNotifierLogs.map(log => {
        const parsedLog = domainNotifierInterface.parseLog(log);
        const { node } = parsedLog.values;
        try {
          const name = this.domainReader.name(node);
          if (name) {
            uniqueDomains.add(name);
          }
        }
        catch (error) {
          this.logger.warn(error)
        }
      }),
    );
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
        this.roleDefinitionReader.read(hash)
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
      this.logger.error(err);
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
  }) {
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
