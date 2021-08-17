import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakingController } from './controllers/staking.controller';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { StakingService } from './staking.service';

@Module({
  imports: [TypeOrmModule.forFeature([StakingTerms, StakingPool])],
  controllers: [StakingController],
  providers: [StakingService],
  exports: [StakingService, TypeOrmModule],
})
export class StakingModule {}
