import { DidStore as S3DidStoreGateway } from '@ew-did-registry/did-s3-store';
import { Global, Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    S3Service,
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
  ],
  controllers: [S3Controller],
  exports: [
    S3Service,
    S3DidStoreGateway,
  ],
})
export class S3Module { }
