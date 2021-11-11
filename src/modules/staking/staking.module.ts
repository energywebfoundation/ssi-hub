import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../../common/provider';
import { OrganizationModule } from '../organization/organization.module';
import { RoleModule } from '../role/role.module';
import { StakingController } from './controllers/staking.controller';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { StakingService } from './staking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StakingTerms, StakingPool]),
    ConfigModule,
    RoleModule,
    OrganizationModule,
  ],
  controllers: [StakingController],
  providers: [StakingService, Provider],
})
export class StakingModule {}
