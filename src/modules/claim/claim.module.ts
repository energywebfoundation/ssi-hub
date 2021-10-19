import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from '../nats/nats.module';
import { RoleModule } from '../role/role.module';
import { ClaimController } from './claim.controller';
import { Claim } from './claim.entity';
import { ClaimProcessor } from './claim.processor';
import { ClaimResolver } from './claim.resolver';
import { ClaimService } from './claim.service';
import { AssetsModule } from '../assets/assets.module';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Claim]),
    BullModule.registerQueue({
      name: 'claims',
      redis: redisConfig,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 20,
      },
    }),
    NatsModule,
    RoleModule,
    AssetsModule,
  ],
  controllers: [ClaimController],
  providers: [ClaimService, ClaimProcessor, TypeOrmModule, ClaimResolver],
})
export class ClaimModule {}
