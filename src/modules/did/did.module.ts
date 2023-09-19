import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Methods } from '@ew-did-registry/did';
import { Provider } from '../../common/provider';
import { DIDController } from './did.controller';
import { DIDDocumentEntity } from './did.entity';
import { DIDProcessor } from './did.processor';
import { DIDResolver } from './did.resolver';
import { DIDService } from './did.service';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { UPDATE_DOCUMENT_QUEUE_NAME } from './did.types';
import { PIN_CLAIM_QUEUE_NAME } from '../ipfs/ipfs.types';

const RegistrySettingsProvider = {
  provide: 'RegistrySettings',
  useFactory: (configService: ConfigService) => ({
    abi: ethrReg.abi,
    address: configService.get<string>('DID_REGISTRY_ADDRESS'),
    method: Methods.Erc1056,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: UPDATE_DOCUMENT_QUEUE_NAME,
    }),
    BullModule.registerQueue({
      name: PIN_CLAIM_QUEUE_NAME,
    }),
    TypeOrmModule.forFeature([DIDDocumentEntity]),
  ],
  controllers: [DIDController],
  providers: [
    DIDService,
    DIDProcessor,
    DIDResolver,
    Provider,
    RegistrySettingsProvider,
  ],
  exports: [DIDService, RegistrySettingsProvider],
})
export class DIDModule {}
