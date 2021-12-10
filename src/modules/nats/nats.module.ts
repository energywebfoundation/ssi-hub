import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NatsWrapper } from './nats.wrapper';
import { NatsService } from './nats.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '../logger/logger.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'nats-messages',
    }),
    ConfigService,
    Logger,
  ],
  providers: [NatsService, NatsWrapper],
  exports: [NatsService],
})
export class NatsModule {}
