import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { ClaimModule } from './claim/claim.module';
import { DIDModule } from './did/did.module';
import { ENSModule } from './ens/ens.module';
import { LoggerModule } from './logger/logger.module';
import { NamespaceModule } from './namespace/namespace.module';
import { NatsModule } from './nats/nats.module';
import { OrganizationModule } from './organization/organization.module';
import { DgraphModule } from './dgraph/dgraph.module';
import { OwnerModule } from './owner/owner.module';
import { RoleModule } from './role/role.module';
import { SentryModule } from './sentry/sentry.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    ApplicationModule,
    AuthModule,
    ClaimModule,
    DIDModule,
    ENSModule,
    LoggerModule,
    NamespaceModule,
    NatsModule,
    OrganizationModule,
    DgraphModule,
    OwnerModule,
    RoleModule,
    SentryModule,
    InterceptorsModule,
  ],
})
export class AppModule {}
