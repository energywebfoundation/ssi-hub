import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSService } from './ipfs.service';

const IPFSClientConfigProvider = {
  provide: 'IPFSClientConfig',
  useFactory: (config: ConfigService) => {
    const IPFS_CLIENT_PORT = config.get<string>('IPFS_CLIENT_PORT');
    const IPFS_CLIENT_HOST = config.get<string>('IPFS_CLIENT_HOST');
    const IPFS_CLIENT_PROJECT_SECRET = config.get<string>(
      'IPFS_CLIENT_PROJECT_SECRET'
    );
    const IPFS_CLIENT_PROJECT_ID = config.get<string>('IPFS_CLIENT_PROJECT_ID');
    // https://community.infura.io/t/how-to-add-internet-content-from-a-url-using-ipfs-http-client/5188
    const auth =
      'Basic ' +
      Buffer.from(
        `${IPFS_CLIENT_PROJECT_ID}:${IPFS_CLIENT_PROJECT_SECRET}`
      ).toString('base64');
    return {
      host: IPFS_CLIENT_HOST,
      port: IPFS_CLIENT_PORT,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    };
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [IPFSClientConfigProvider, IPFSService],
  exports: [IPFSClientConfigProvider, IPFSService],
})
export class IPFSModule {}
