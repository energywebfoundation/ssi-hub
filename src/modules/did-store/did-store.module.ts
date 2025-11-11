import { DidStore as S3DidStoreGateway } from '@ew-did-registry/did-s3-store';
import { Global, Module } from '@nestjs/common';
import { DidStoreController } from './did-store.controller';
import { DidStoreService } from './did-store.service';
import { ConfigService } from '@nestjs/config';
import { DidStoreGatewayFactory } from './did-store.gateway';

@Global()
@Module({
  providers: [
    DidStoreService,
    {
      provide: S3DidStoreGateway,
      useFactory: (config: ConfigService) => {
        const AWS_S3_BUCKET = config.get<string>('AWS_S3_BUCKET');
        const AWS_REGION = config.get<string>('AWS_REGION');
        const AWS_ACCESS_KEY_ID = config.get<string>('AWS_ACCESS_KEY_ID');
        const AWS_SECRET_ACCESS_KEY = config.get<string>('AWS_SECRET_ACCESS_KEY');
        return new S3DidStoreGateway(AWS_S3_BUCKET, {
          region: AWS_REGION,
          credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'DidStoreGateway',
      useFactory: (
        S3: S3DidStoreGateway,
      ) => ({
        S3
      }),
      inject: [S3DidStoreGateway],
    },
    DidStoreGatewayFactory
  ],
  controllers: [DidStoreController],
  exports: [
    DidStoreService,
    S3DidStoreGateway,
    DidStoreGatewayFactory
  ],
})
export class DidStoreModule { }
