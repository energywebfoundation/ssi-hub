import { Module } from '@nestjs/common';
import { Provider } from '../../common/provider';
import { ApplicationModule } from '../application/application.module';
import { OrganizationModule } from '../organization/organization.module';
import { RoleModule } from '../role/role.module';
import { StakingModule } from '../staking/staking.module';
import { EnsService } from './ens.service';

@Module({
  imports: [RoleModule, OrganizationModule, ApplicationModule, StakingModule],
  providers: [EnsService, Provider],
})
export class ENSModule {}
