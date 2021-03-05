import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DgraphModule } from '../dgraph/dgraph.module';
import { NatsModule } from '../nats/nats.module';
import { RoleModule } from '../role/role.module';
import { SentryModule } from '../sentry/sentry.module';
import { ClaimController } from './claim.controller';
import { ClaimProcessor } from './claim.processor';
import { ClaimService } from './claim.service';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

@Module({
  imports: [
    DgraphModule,
    BullModule.registerQueue({
      name: 'claims',
      redis: redisConfig,
    }),
    SentryModule,
    NatsModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [ClaimController],
  providers: [ClaimService, ClaimProcessor],
})
export class ClaimModule {}
