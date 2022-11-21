import { BullModule } from '@nestjs/bull';
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
import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { IpfsConfig } from '../ipfs/ipfs.types';

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
      name: 'dids',
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
    {
      provide: DidStoreInfura,
      useFactory: (ipfsConfig: IpfsConfig) => {
        return new DidStoreInfura(ipfsConfig);
      },
      inject: [{ token: 'IPFSClientConfig', optional: false }],
    },
  ],
  exports: [DIDService, RegistrySettingsProvider, DidStoreInfura],
})
export class DIDModule {}
