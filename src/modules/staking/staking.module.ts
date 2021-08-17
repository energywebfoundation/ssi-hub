import { Module } from '@nestjs/common';
import { StakingController } from './controllers/staking.controller';
import { StakingService } from './staking.service';

@Module({
  imports: [],
  controllers: [StakingController],
  providers: [StakingService],
  exports: [StakingService],
})
export class StakingModule {}
