import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DIDController } from './did.controller';
import { DIDEntity } from './did.entity';
import { DIDProcessor } from './did.processor';
import { DIDResolver } from './did.resolver';
import { DIDService } from './did.service';
import { ResolverFactory } from './ResolverFactory';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'dids',
      redis: redisConfig,
    }),
    TypeOrmModule.forFeature([DIDEntity]),
  ],
  controllers: [DIDController],
  providers: [DIDService, ResolverFactory, DIDProcessor, DIDResolver],
  exports: [DIDService],
})
export class DIDModule {}
