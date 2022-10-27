import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from '../nats/nats.module';
import { RoleModule } from '../role/role.module';
import { ClaimController } from './claim.controller';
import { RoleClaim } from './entities/roleClaim.entity';
import { Claim } from './entities/claim.entity';
import { ClaimResolver } from './claim.resolver';
import {
  ClaimService,
  ClaimIssuanceService,
  RevocationVerificationService,
  ClaimVerificationService,
  IssuerVerificationService,
} from './services';
import { AssetsModule } from '../assets/assets.module';
import { DIDModule } from '../did/did.module';
import { Provider } from '../../common/provider';
import { RoleRevokerResolver } from './resolvers/revoker.resolver';

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
    Provider,
    RoleRevokerResolver,
    ClaimVerificationService,
    IssuerVerificationService,
  ],
  exports: [RevocationVerificationService, RoleRevokerResolver],
})
export class ClaimModule {}
