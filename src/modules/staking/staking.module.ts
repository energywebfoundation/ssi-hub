import { Module } from '@nestjs/common';
import { StakingPoolService } from './services/staking.pool.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StakingPoolService],
  exports: [StakingPoolService],
})
export class StakingModule {}
