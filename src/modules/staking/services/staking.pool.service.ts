import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StakingPool } from '../entities/staking.pool.entity';

@Injectable()
export class StakingPoolService {
  constructor(
    @InjectRepository(StakingPool)
    private readonly poolRepository: Repository<StakingPool>,
  ) {}

  async saveTermsAndConditions(pool: Partial<StakingPool>) {
    const stakePool = new StakingPool(pool);
    return this.poolRepository.save(stakePool);
  }
}
