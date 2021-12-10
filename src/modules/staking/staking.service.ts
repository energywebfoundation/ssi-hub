import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { Logger } from '../logger/logger.service';
import { StakingPoolFactory__factory } from '../../ethers/factories/StakingPoolFactory__factory';
import { StakingPoolFactory } from '../../ethers/StakingPoolFactory';
import { Provider } from '../../common/provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StakingService implements OnModuleDestroy {
  private stakingPoolFactory: StakingPoolFactory;
  constructor(
    @InjectRepository(StakingTerms)
    private readonly stakingTermsRepository: Repository<StakingTerms>,
    @InjectRepository(StakingPool)
    private readonly stakingPoolRepository: Repository<StakingPool>,
    private readonly logger: Logger,
    private readonly provider: Provider,
    config: ConfigService,
  ) {
    this.logger.setContext(StakingService.name);

    const STAKING_POOL_FACTORY_ADDRESS = config.get<string>(
      'STAKING_POOL_FACTORY_ADDRESS',
    );

    if (!STAKING_POOL_FACTORY_ADDRESS) {
      this.logger.warn("'STAKING_POOL_FACTORY_ADDRESS' is not specified.");
    }

    this.stakingPoolFactory = StakingPoolFactory__factory.connect(
      STAKING_POOL_FACTORY_ADDRESS,
      this.provider,
    );
    this.InitEventListeners();
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

  async saveStakingPool(address: string): Promise<StakingPool> {
    const terms = await this.getTerms();

    const addressExist = await this.stakingPoolRepository.findOne({
      where: {
        address,
      },
    });

    if (addressExist) {
      throw new Error(`Staking pool with this address already exists!`);
    }

    return this.stakingPoolRepository.save({
      terms,
      address,
    });
  }
  private InitEventListeners(): void {
    this.stakingPoolFactory.on('StakingPoolLaunched', async (_, address) => {
      await this.saveStakingPool(address);
    });
  }

  onModuleDestroy() {
    this.stakingPoolFactory.removeAllListeners('StakingPoolLaunched');
  }
}
