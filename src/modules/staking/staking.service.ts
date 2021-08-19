import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { Logger } from '../logger/logger.service';
import {
  StakingPoolFactory__factory,
  VOLTA_STAKING_POOL_FACTORY_ADDRESS,
} from '@energyweb/iam-contracts';
import { StakingPoolFactory } from '@energyweb/iam-contracts/dist/ethers-v4/StakingPoolFactory';
import { Provider } from '../../common/provider';

@Injectable()
export class StakingService {
  constructor(
    @InjectRepository(StakingTerms)
    private readonly stakingTermsRepository: Repository<StakingTerms>,
    @InjectRepository(StakingPool)
    private readonly stakingPoolRepository: Repository<StakingPool>,
    private readonly logger: Logger,
    private stakingPoolFactory: StakingPoolFactory,
    private readonly provider: Provider,
  ) {
    this.logger.setContext(StakingService.name);
    this.stakingPoolFactory = StakingPoolFactory__factory.connect(
      VOLTA_STAKING_POOL_FACTORY_ADDRESS,
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
    this.stakingPoolFactory.addListener(
      'StakingPoolLaunched',
      async (org, address) => {
        await this.saveStakingPool(address);
      },
    );
  }
}
