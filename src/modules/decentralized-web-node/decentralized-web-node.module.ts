import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsWriteMessage } from './entities/collections-write-message.entity';
import { HandlerService } from './services/handler.service';
import { MessageService } from './services/message.service';
import { DecentralizedWebNodeController } from './decentralized-web-node.controller';
import { DecentralizedWebNodeInterceptor } from './decentralized-web-node-response.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionsWriteMessage])],
  controllers: [DecentralizedWebNodeController],
  providers: [MessageService, HandlerService, DecentralizedWebNodeInterceptor],
  exports: [HandlerService],
})
export class DecentralizedWebNodeModule {}
