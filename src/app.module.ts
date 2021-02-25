import fs from 'fs';
import { promisify } from 'util';
import { HttpModule, Module } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { LoginController } from './auth/login.controller';
import { AuthStrategy } from './auth/login.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './auth/token.service';
import { RefreshTokenRepository } from './auth/refreshToken.repository';
import { CookiesServices } from './auth/cookies.service';
import { SentryService } from './sentry/sentry.service';
import { Logger } from './logger/logger.service';

const readFile = promisify(fs.readFile);

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const [publicKey, privateKey] = await Promise.all([
          readFile(configService.get<string>('JWT_PUBLIC_KEY')),
          readFile(configService.get<string>('JWT_PRIVATE_KEY')),
        ]);

        return {
          privateKey,
          publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
          },
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
      },
      inject: [ConfigService],
    }),
    HttpModule,
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
    LoginController,
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
    AuthStrategy,
    JwtStrategy,
    TokenService,
    RefreshTokenRepository,
    CookiesServices,
    SentryService,
    Logger,
  ],
})
export class AppModule {}
