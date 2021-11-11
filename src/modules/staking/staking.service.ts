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

  async syncPool(address: string): Promise<StakingPool> {
    const poolToSync = await this.getPoolFromChain(address);

    const pools = await this.stakingPoolRepository.find({
      where: {
        address,
      },
    });

    if (pools && pools.length === 1) {
      const pool = pools[0];
      if (
        Object.values(poolToSync).every(prop =>
          Object.values(pool).includes(prop),
        )
      ) {
        return;
      }
    }

    if (pools && pools.length > 1) {
      await this.stakingPoolRepository.delete(pools.map(p => p.id));
    }

    return this.stakingPoolRepository.save({
      terms: await this.getTerms(),
      ...poolToSync,
    });
  }

  async getPool(id: string) {
    return this.stakingPoolRepository.findOne(id);
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
    const orgs = await this.stakingPoolFactory.orgsList();
    for await (const org of orgs) {
      const { pool } = await this.stakingPoolFactory.services(org);
      await this.syncPool(pool);
    }
  }

  private async getPoolFromChain(
    address: string,
  ): Promise<Partial<StakingPool>> {
    const filter = this.stakingPoolFactory.filters.StakingPoolLaunched(
      null,
      address,
    );
    const event = (await this.stakingPoolFactory.queryFilter(filter))[0];
    if (!event) {
      throw new Error('Pool was not launched');
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
    return {
      address,
      org: org?.namespace, // if organization is not synchronized yet
      patronRoles: patronRolesNames,
      minStakingPeriod,
      patronRewardPortion,
    };
  }
}
