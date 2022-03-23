import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApplicationModule } from './modules/application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClaimModule } from './modules/claim/claim.module';
import { DIDModule } from './modules/did/did.module';
import { LoggerModule } from './modules/logger/logger.module';
import { SearchModule } from './modules/search/search.module';
import { NatsModule } from './modules/nats/nats.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { RoleModule } from './modules/role/role.module';
import { SentryModule } from './modules/sentry/sentry.module';
import { InterceptorsModule } from './modules/interceptors/interceptors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENSModule } from './modules/ens/ens.module';
import { getDBConfig } from './db/config';
// import { GraphQLModule } from '@nestjs/graphql';
import { JSONObjectScalar } from './common/json.scalar';
// import { getGraphQlConfig } from './graphql/config';
import { AssetsModule } from './modules/assets/assets.module';
import { StakingModule } from './modules/staking/staking.module';
import { BullModule } from '@nestjs/bull';
import { HealthCheckModule } from './health-check/health-check.module';
import { DIDContactModule } from './modules/did-contact/did.contact.module';
import { DecentralizedWebNodeModule } from './modules/decentralized-web-node/decentralized-web-node.module';

@Module({
  imports: [
    // GraphQLModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: getGraphQlConfig,
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDBConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 20,
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    AuthModule,
    AssetsModule,
    ApplicationModule,
    ClaimModule,
    DIDModule,
    DIDContactModule,
    OrganizationModule,
    NatsModule,
    RoleModule,
    SearchModule,
    LoggerModule,
    SentryModule,
    InterceptorsModule,
    ENSModule,
    StakingModule,
    HealthCheckModule,
    DecentralizedWebNodeModule,
  ],
  providers: [JSONObjectScalar],
})
export class AppModule {}
