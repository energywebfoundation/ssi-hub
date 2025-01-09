import { DidStore as DidStoreGateway } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSController } from './ipfs.controller';
import { IPFSService } from './ipfs.service';
import {
  IpfsClusterConfig,
  IPFSClusterConfigToken,
  IpfsInfuraConfig,
  IPFSInfuraConfigToken,
  PIN_CLAIM_QUEUE_NAME,
} from './ipfs.types';
import { BullModule } from '@nestjs/bull';
import { PinProcessor } from './pin.processor';

const IPFSInfuraConfigProvider = {
  provide: IPFSInfuraConfigToken,
  useFactory: (config: ConfigService): IpfsInfuraConfig => {
    const IPFS_CLIENT_URL = config.get<string>('IPFS_CLIENT_URL');
    const IPFS_CLIENT_PROTOCOL = config.get<string>('IPFS_CLIENT_PROTOCOL');
    const IPFS_CLIENT_HOST = config.get<string>('IPFS_CLIENT_HOST');
    const IPFS_CLIENT_PORT = config.get<string>('IPFS_CLIENT_PORT');
    const ipfsConfig: IpfsInfuraConfig = {
      url: IPFS_CLIENT_URL,
      protocol: IPFS_CLIENT_PROTOCOL,
      host: IPFS_CLIENT_HOST,
      port: parseInt(IPFS_CLIENT_PORT),
    };
    const IPFS_CLIENT_PROJECT_SECRET = config.get<string>(
      'IPFS_CLIENT_PROJECT_SECRET'
    );
    const IPFS_CLIENT_PROJECT_ID = config.get<string>('IPFS_CLIENT_PROJECT_ID');
    // https://community.infura.io/t/how-to-add-internet-content-from-a-url-using-ipfs-http-client/5188
    if (IPFS_CLIENT_PROJECT_ID && IPFS_CLIENT_PROJECT_SECRET) {
      ipfsConfig.headers = {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${IPFS_CLIENT_PROJECT_ID}:${IPFS_CLIENT_PROJECT_SECRET}`
          ).toString('base64'),
      };
    }
    return ipfsConfig;
  },
  inject: [ConfigService],
};

const IPFSClusterConfigProvider = {
  provide: IPFSClusterConfigToken,
  useFactory: (config: ConfigService): IpfsClusterConfig => {
    const IPFS_CLUSTER_ROOT = config.get<string>('IPFS_CLUSTER_ROOT');
    const IPFS_CLUSTER_USER = config.get<string>('IPFS_CLUSTER_USER');
    const IPFS_CLUSTER_PASSWORD = config.get<string>('IPFS_CLUSTER_PASSWORD');
    let ipfsConfig: IpfsClusterConfig;
    if (IPFS_CLUSTER_USER && IPFS_CLUSTER_PASSWORD) {
      const headers = {
        authorization:
          'Basic ' +
          Buffer.from(`${IPFS_CLUSTER_USER}:${IPFS_CLUSTER_PASSWORD}`).toString(
            'base64'
          ),
      };
      ipfsConfig = [IPFS_CLUSTER_ROOT, { headers }];
    } else {
      ipfsConfig = [IPFS_CLUSTER_ROOT];
    }
    return ipfsConfig;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: PIN_CLAIM_QUEUE_NAME,
    }),
  ],
  providers: [
    IPFSClusterConfigProvider,
    IPFSInfuraConfigProvider,
    IPFSService,
    {
      provide: DidStoreCluster,
      useFactory: (ipfsConfig: IpfsClusterConfig) => {
        return new DidStoreCluster(...ipfsConfig);
      },
      inject: [{ token: IPFSClusterConfigToken, optional: false }],
    },
    {
      provide: DidStoreGateway,
      useFactory: (ipfsConfig: IpfsInfuraConfig) => {
        return new DidStoreGateway(ipfsConfig);
      },
      inject: [{ token: IPFSInfuraConfigToken, optional: false }],
    },
    PinProcessor,
  ],
  controllers: [IPFSController],
  exports: [
    IPFSClusterConfigProvider,
    IPFSInfuraConfigProvider,
    IPFSService,
    DidStoreCluster,
    DidStoreGateway,
  ],
})
export class IPFSModule {}
