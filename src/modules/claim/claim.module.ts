import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from '../nats/nats.module';
import { RoleModule } from '../role/role.module';
import { ClaimController } from './claim.controller';
import { RoleClaim } from './entities/roleClaim.entity';
import { Claim } from './entities/claim.entity';
import { ClaimResolver } from './claim.resolver';
import { ClaimService } from './claim.service';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleClaim, Claim]),
    NatsModule,
    RoleModule,
    AssetsModule,
  ],
  controllers: [ClaimController],
  providers: [ClaimService, TypeOrmModule, ClaimResolver],
})
export class ClaimModule {}
