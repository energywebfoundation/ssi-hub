import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../../common/provider';
import { DIDController } from './did.controller';
import { DIDContact, DIDDocumentEntity } from './did.entity';
import { DIDProcessor } from './did.processor';
import { DIDResolver } from './did.resolver';
import { DIDService } from './did.service';
import { DIDContactController } from './did.contact.controller';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'dids',
    }),
    TypeOrmModule.forFeature([DIDDocumentEntity, DIDContact]),
  ],
  controllers: [DIDController, DIDContactController],
  providers: [DIDService, DIDProcessor, DIDResolver, Provider],
  exports: [DIDService],
})
export class DIDModule {}
