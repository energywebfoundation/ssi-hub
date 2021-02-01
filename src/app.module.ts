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
import { NamespaceController } from './namespace/namespace.controller';
import { NamespaceService } from './namespace/namespace.service';
import { NatsService } from './nats/nats.service';
import { BullModule } from '@nestjs/bull';
import { claimProcessor } from './claim/claim.processor';
import { DIDController } from './did/did.controller';
import { DIDService } from './did/did.service';
import { ResolverFactory } from './did/ResolverFactory';
import { DIDProcessor } from './did/did.processor';
import { DIDDGraphRepository } from './did/did.repository';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'claims',
      redis: redisConfig,
    }),
    BullModule.registerQueue({
      name: 'dids',
      redis: redisConfig,
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    ClaimController,
    OrganizationController,
    ApplicationController,
    RoleController,
    GraphqlController,
    OwnerController,
    NamespaceController,
    DIDController,
  ],
  providers: [
    claimProcessor,
    DIDProcessor,
    DgraphService,
    ClaimService,
    OrganizationService,
    ApplicationService,
    RoleService,
    EnsService,
    OwnerService,
    NamespaceService,
    NatsService,
    DIDService,
    DIDDGraphRepository,
    ResolverFactory,
  ],
})
export class AppModule {}
