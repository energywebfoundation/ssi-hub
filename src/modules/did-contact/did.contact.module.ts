import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DIDDocumentEntity } from '../did/did.entity';

import { DIDContactController } from './did.contact.controller';
import { DIDContact } from './did.contact.entity';
import { DIDContactService } from './did.contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([DIDContact, DIDDocumentEntity])],
  controllers: [DIDContactController],
  providers: [DIDContactService],
  exports: [DIDContactService],
})
export class DIDContactModule {}
