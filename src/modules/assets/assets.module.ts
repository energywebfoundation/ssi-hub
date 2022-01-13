import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../../common/provider';
import { GraphQLParser } from '../../graphql/graphql.parser';
import { DIDModule } from '../did/did.module';
import { AssetsController } from './assets.controller';
import { Asset, AssetsHistory } from './assets.entity';
import { AssetResolver } from './assets.resolver';
import { AssetsService } from './assets.service';
import { AssetsEventSubscriber } from './assets.subscriber';
import { NatsModule } from '../nats/nats.module';

@Module({
  imports: [
    DIDModule,
    TypeOrmModule.forFeature([Asset, AssetsHistory]),
    NatsModule,
  ],
  providers: [
    AssetsService,
    AssetResolver,
    Provider,
    GraphQLParser,
    AssetsEventSubscriber,
  ],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}
