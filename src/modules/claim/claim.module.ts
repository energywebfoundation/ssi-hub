import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from '../nats/nats.module';
import { RoleModule } from '../role/role.module';
import { ClaimController } from './claim.controller';
import { RoleClaim } from './entities/roleClaim.entity';
import { Claim } from './entities/claim.entity';
import { ClaimResolver } from './claim.resolver';
import { ClaimService, ClaimIssuanceService } from './services';
import { AssetsModule } from '../assets/assets.module';
import { DIDModule } from '../did/did.module';
import { RevocationVerificationService } from './revocation-verification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleClaim, Claim]),
    NatsModule,
    RoleModule,
    AssetsModule,
    DIDModule,
  ],
  controllers: [ClaimController],
  providers: [
    ClaimService,
    ClaimIssuanceService,
    ClaimResolver,
    RevocationVerificationService,
  ],
  exports: [RevocationVerificationService],
})
export class ClaimModule {}
