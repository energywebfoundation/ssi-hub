import { DidStore as DidStoreGateway } from 'didStoreGateway';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSController } from './ipfs.controller';
import { IPFSService } from './ipfs.service';
import {
  IpfsClusterConfig,
  IPFSClusterConfigToken,
  IpfsGatewayConfig,
  IPFSGatewayConfigToken,
  PINS_QUEUE,
} from './ipfs.types';
import { BullModule } from '@nestjs/bull';
import { PinsProcessor } from './pins.processor';

const IPFSGatewayConfigProvider = {
  provide: IPFSGatewayConfigToken,
  useFactory: (config: ConfigService): IpfsGatewayConfig => {
    const IPFS_CLIENT_URL = config.get<string>('IPFS_CLIENT_URL');
    const IPFS_CLIENT_PROTO = config.get<string>('IPFS_CLIENT_PROTO');
    const IPFS_CLIENT_HOST = config.get<string>('IPFS_CLIENT_HOST');
    const IPFS_CLIENT_PORT = config.get<string>('IPFS_CLIENT_PORT');
    const ipfsConfig: IpfsGatewayConfig = {
      url: IPFS_CLIENT_URL,
      protocol: IPFS_CLIENT_PROTO,
      host: IPFS_CLIENT_HOST,
      port: parseInt(IPFS_CLIENT_PORT),
    };
    const IPFS_CLIENT_PASSWORD = config.get<string>('IPFS_CLIENT_PASSWORD');
    const IPFS_CLIENT_USER = config.get<string>('IPFS_CLIENT_USER');
    // https://community.infura.io/t/how-to-add-internet-content-from-a-url-using-ipfs-http-client/5188
    if (IPFS_CLIENT_USER && IPFS_CLIENT_PASSWORD) {
      ipfsConfig.headers = {
        Authorization:
          'Basic ' +
          Buffer.from(`${IPFS_CLIENT_USER}:${IPFS_CLIENT_PASSWORD}`).toString(
            'base64'
          ),
        // Authorization: 'Basic WHpOY1NoVGF1R1NTQkk6Y0dnMVZ2dld0dkI1QTF5UW84SE8=',
      };
    }
    return ipfsConfig;
  },
  inject: [ConfigService],
};

const IPFSClusterConfigProvider = {
  provide: IPFSClusterConfigToken,
  useFactory: (config: ConfigService): IpfsClusterConfig => {
    const IPFS_CLUSTER_ROOT_URL = config.get<string>('IPFS_CLUSTER_ROOT_URL');
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
      ipfsConfig = [IPFS_CLUSTER_ROOT_URL, headers];
    } else {
      ipfsConfig = [IPFS_CLUSTER_ROOT_URL];
    }
    return ipfsConfig;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: PINS_QUEUE,
    }),
  ],
  providers: [
    IPFSClusterConfigProvider,
    IPFSGatewayConfigProvider,
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
      useFactory: (ipfsConfig: IpfsGatewayConfig) => {
        return new DidStoreGateway(ipfsConfig);
      },
      inject: [{ token: IPFSGatewayConfigToken, optional: false }],
    },
    PinsProcessor,
  ],
  controllers: [IPFSController],
  exports: [
    IPFSClusterConfigProvider,
    IPFSGatewayConfigProvider,
    IPFSService,
    DidStoreCluster,
    DidStoreGateway,
  ],
})
export class IPFSModule {}
