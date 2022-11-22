import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSController } from './ipfs.controller';
import { IPFSService } from './ipfs.service';
import {
  IPFSClusterConfig,
  IPFSClusterConfigToken,
  IPFSInfuraConfig,
  IPFSInfuraConfigToken,
} from './ipfs.types';

const IPFSInfuraConfigProvider = {
  provide: IPFSInfuraConfigToken,
  useFactory: (config: ConfigService): IPFSInfuraConfig => {
    const IPFS_CLIENT_PORT = config.get<string>('IPFS_CLIENT_PORT');
    const IPFS_CLIENT_HOST = config.get<string>('IPFS_CLIENT_HOST');
    // const IPFS_CLIENT_URI = config.get<string>('IPFS_CLIENT_URI');

    let headers: Record<string, any>;
    const IPFS_CLIENT_PROJECT_SECRET = config.get<string>(
      'IPFS_CLIENT_PROJECT_SECRET'
    );
    const IPFS_CLIENT_PROJECT_ID = config.get<string>('IPFS_CLIENT_PROJECT_ID');
    // https://community.infura.io/t/how-to-add-internet-content-from-a-url-using-ipfs-http-client/5188
    headers =
      IPFS_CLIENT_PROJECT_ID && IPFS_CLIENT_PROJECT_SECRET
        ? {
            authorization:
              'Basic ' +
              Buffer.from(
                `${IPFS_CLIENT_PROJECT_ID}:${IPFS_CLIENT_PROJECT_SECRET}`
              ).toString('base64'),
          }
        : {};

    return [
      {
        host: IPFS_CLIENT_HOST,
        port: parseInt(IPFS_CLIENT_PORT),
        protocol: 'https',
        headers,
      },
    ];
  },
  inject: [ConfigService],
};

const IPFSClusterConfigProvider = {
  provide: IPFSClusterConfigToken,
  useFactory: (config: ConfigService): IPFSClusterConfig => {
    const IPFS_CLUSTER_ROOT = config.get<string>('IPFS_CLUSTER_ROOT');
    const IPFS_CLUSTER_USER = config.get<string>('IPFS_CLUSTER_USER');
    const IPFS_CLUSTER_PASSWORD = config.get<string>('IPFS_CLUSTER_PASSWORD');
    const authorization =
      'Basic ' +
      Buffer.from(`${IPFS_CLUSTER_USER}:${IPFS_CLUSTER_PASSWORD}`).toString(
        'base64'
      );
    return [
      IPFS_CLUSTER_ROOT,
      {
        authorization,
      },
    ];
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [
    IPFSInfuraConfigProvider,
    IPFSClusterConfigProvider,
    IPFSService,
    {
      provide: DidStoreInfura,
      useFactory: (ipfsConfig: IPFSInfuraConfig) => {
        return new DidStoreInfura(...ipfsConfig);
      },
      inject: [{ token: IPFSInfuraConfigToken, optional: false }],
    },
    {
      provide: DidStoreCluster,
      useFactory: (ipfsConfig: IPFSClusterConfig) => {
        return new DidStoreCluster(...ipfsConfig);
      },
      inject: [{ token: IPFSInfuraConfigToken, optional: false }],
    },
  ],
  controllers: [IPFSController],
  exports: [IPFSInfuraConfigProvider, IPFSService],
})
export class IPFSModule {}
