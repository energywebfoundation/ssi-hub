import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VOLTA_STAKING_POOL_FACTORY_ADDRESS } from '@energyweb/iam-contracts';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { Logger } from '../logger/logger.service';
import { StakingPoolFactory__factory } from '../../ethers/factories/StakingPoolFactory__factory';
import { StakingPoolFactory } from '../../ethers/StakingPoolFactory';
import { Provider } from '../../common/provider';
import { RoleService } from '../role/role.service';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OrganizationService } from '../organization/organization.service';
import { StakingPool__factory } from '../../ethers/factories/StakingPool__factory';

@Injectable()
export class StakingService implements OnModuleDestroy {
  private stakingPoolFactory: StakingPoolFactory;
  constructor(
    @InjectRepository(StakingTerms)
    private readonly stakingTermsRepository: Repository<StakingTerms>,
    @InjectRepository(StakingPool)
    private readonly stakingPoolRepository: Repository<StakingPool>,
    private readonly roleService: RoleService,
    private readonly orgService: OrganizationService,
    private readonly logger: Logger,
    private readonly provider: Provider,
    private config: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(StakingService.name);
    this.stakingPoolFactory = StakingPoolFactory__factory.connect(
      VOLTA_STAKING_POOL_FACTORY_ADDRESS,
      this.provider,
    );
    this.InitEventListeners();
    const SyncInterval = this.config.get<string>('ENS_SYNC_INTERVAL_IN_HOURS');
    const SYNC_ENABLED =
      this.config.get<string>('STAKING_SYNC_ENABLED') !== 'false';
    const isTestEnv = this.config.get<string>('NODE_ENV') === 'test';

    if (SyncInterval && SYNC_ENABLED && !isTestEnv) {
      const interval = setInterval(
        () => this.sync(),
        parseInt(SyncInterval) * 3600000,
      );
      this.schedulerRegistry.addInterval('Staking Sync', interval);
      this.InitEventListeners();
      this.sync();
    }
  }

  async saveTerms(stakeTerms: Partial<StakingTerms>): Promise<StakingTerms> {
    const { version, terms } = stakeTerms;
    const stakingTerms = new StakingTerms(stakeTerms);
    const stakeTermsExist = await this.stakingTermsRepository.findOne({
      where: {
        version,
        terms,
      },
    });

    if (stakeTermsExist) {
      this.logger.debug(`Staking terms and condition already exists`);
      throw new BadRequestException(
        'Staking terms and condition already exists',
      );
    }
    return this.stakingTermsRepository.save(stakingTerms);
  }

  async getTerms(): Promise<StakingTerms> {
    return this.stakingTermsRepository.findOne({
      order: {
        version: 'DESC',
      },
    });
  }

  /**
   * @description pesists pool deployed on `address`. If pool wasn't deployed by registered staking pool factory
   * or organization for which pool launched not yet been synchronized pool synchronization will be skipped
   * @param address address of deployed pool
   */
  async syncPool(address: string): Promise<void> {
    const poolToSync = await this.getPoolFromChain(address);
    if (!poolToSync) {
      return;
    }

    const pool = await this.stakingPoolRepository.findOne(address);

    if (pool) {
      await this.stakingPoolRepository.save({ ...pool, ...poolToSync });
    } else {
      await this.stakingPoolRepository.save({
        terms: await this.getTerms(),
        ...poolToSync,
      });
    }
  }

  async getPoolByAddress(address: string) {
    return this.stakingPoolRepository.findOne(address);
  }

  /**
   * @description returns organization for which pool was launched
   * @param namespace
   * @returns
   */
  async getPoolByOrg(namespace: string) {
    return this.stakingPoolRepository.findOne({
      where: { org: { namespace } },
    });
  }

  private InitEventListeners(): void {
    this.stakingPoolFactory.on('StakingPoolLaunched', async (_, address) => {
      await this.syncPool(address);
    });
  }

  onModuleDestroy() {
    this.stakingPoolFactory.removeAllListeners('StakingPoolLaunched');
  }

  private async sync() {
    this.logger.info('Syncing Staking Pools');
    const orgs = await this.stakingPoolFactory.orgsList();
    for await (const org of orgs) {
      const { pool } = await this.stakingPoolFactory.services(org);
      await this.syncPool(pool);
    }
    this.logger.info('Staking Pools syncing is finished');
  }

  private async getPoolFromChain(
    address: string,
  ): Promise<Partial<StakingPool> | null> {
    const filter = this.stakingPoolFactory.filters.StakingPoolLaunched(
      null,
      address,
    );
    const event = (await this.stakingPoolFactory.queryFilter(filter))[0];
    if (!event) {
      return null;
    }
    const txHash = event.transactionHash;
    const tx = await this.provider.getTransaction(txHash);
    const {
      args: {
        org: orgHash,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: roleHashes = [],
      },
    } = StakingPoolFactory__factory.createInterface().parseTransaction(tx);
    const patronRoles = await Promise.all(
      (roleHashes as string[]).map((hash: string) =>
        this.roleService.getByNamehash(hash),
      ),
    );
    const patronRolesNames = patronRoles.filter(Boolean).map(r => r.namespace);
    const org = await this.orgService.getByNamehash(orgHash);
    if (!org) {
      return null;
    }
    return {
      address,
      org,
      patronRoles: patronRolesNames,
      withdrawDelay: await StakingPool__factory.connect(
        address,
        this.provider,
      ).withdrawDelay(),
      minStakingPeriod,
      patronRewardPortion,
    };
  }
}
