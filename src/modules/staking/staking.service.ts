import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { Logger } from '../logger/logger.service';

@Injectable()
export class StakingService {
  constructor(
    @InjectRepository(StakingPool)
    @InjectRepository(StakingTerms)
    private readonly stakingPoolRepository: Repository<StakingPool>,
    private readonly stakingTermsRepository: Repository<StakingTerms>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(StakingService.name);
  }

  async saveTerms(stakeTerms: Partial<StakingTerms>): Promise<StakingTerms> {
    const { version, terms } = stakeTerms;
    const stakingTerms = new StakingTerms(stakeTerms);
    const stakeTermsExist = this.stakingTermsRepository.findOne({
      where: {
        version,
        terms,
      },
    });
    if (stakeTermsExist) {
      this.logger.debug(`Staking terms and condition already exists`);
      return;
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

    const addressExist = this.stakingPoolRepository.findOne({
      where: {
        address,
      },
    });

    if (addressExist) {
      this.logger.debug(`Staking pool with this address already exists!`);
      return;
    }

    return this.stakingPoolRepository.save({
      terms,
      address,
    });
  }
}
