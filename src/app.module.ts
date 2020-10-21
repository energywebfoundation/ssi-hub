import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DgraphService } from './dgraph/dgraph.service';
import { ClaimController } from './claim/claim.controller';
import { ClaimService } from './claim/claim.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { ApplicationController } from './application/application.controller';
import { RoleController } from './role/role.controller';
import { ApplicationService } from './application/application.service';
import { RoleService } from './role/role.service';
import { EnsService } from './ENS/ens.service';
import { GraphqlController } from './graphql/graphql.controller';
import { ConfigModule } from '@nestjs/config';
import { OwnerController } from './owner/owner.controller';
import { OwnerService } from './owner/owner.service';
import { EnsTestService } from './ENS/ens.testService';
import { NamespaceController } from './namespace/namespace.controller';
import { NamespaceService } from './namespace/namespace.service';
import { NatsService } from './nats/nats.service';
import { BullModule } from '@nestjs/bull';
import { claimProcessor } from './claim/claim.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'claims',
      redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
      },
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot()],
  controllers: [
    ClaimController,
    OrganizationController,
    ApplicationController,
    RoleController,
    GraphqlController,
    OwnerController,
    NamespaceController,
  ],
  providers: [
    claimProcessor,

    DgraphService,
    ClaimService,
    OrganizationService,
    ApplicationService,
    RoleService,
    EnsService,
    EnsTestService,
    OwnerService,
    NamespaceService,
    NatsService,
  ],
})
export class AppModule {}
