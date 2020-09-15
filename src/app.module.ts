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

@Module({
  imports: [],
  controllers: [ClaimController, OrganizationController, ApplicationController, RoleController, IdentityController],
  providers: [DgraphService, ClaimService, OrganizationService, IdentityService, ApplicationService, RoleService],
})
export class AppModule {}
