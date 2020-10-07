import { Module } from '@nestjs/common';
import { DgraphService } from './dgraph/dgraph.service';
import { ClaimController } from './claim/claim.controller';
import { ClaimService } from './claim/claim.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { ApplicationController } from './application/application.controller';
import { RoleController } from './role/role.controller';
import { IdentityController } from './identity/identity.controller';
import { IdentityService } from './identity/identity.service';
import { ApplicationService } from './application/application.service';
import { RoleService } from './role/role.service';
import { EnsService } from './ENS/ens.service';
import { GraphqlController } from './graphql/graphql.controller';
import { ConfigModule } from '@nestjs/config';
import { OwnerController } from './owner/owner.controller';
import { OwnerService } from './owner/owner.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    ClaimController,
    OrganizationController,
    ApplicationController,
    RoleController,
    IdentityController,
    GraphqlController,
    OwnerController,
  ],
  providers: [
    DgraphService,
    ClaimService,
    OrganizationService,
    IdentityService,
    ApplicationService,
    RoleService,
    EnsService,
    OwnerService,
  ],
})
export class AppModule {}
