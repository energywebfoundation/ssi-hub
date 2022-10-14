import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSService } from './ipfs.service';
import { IPFSClusterParams, IPFS_PARAMS } from './ipfs.types';

const IPFSParamsProvider = {
  provide: IPFS_PARAMS,
  useFactory: (config: ConfigService): IPFSClusterParams => {
    const params: IPFSClusterParams = {
      ipfsClusterRoot: config.get<string>('IPFS_CLUSTER_ROOT'),
    };

    const IPFS_CLUSTER_USER = config.get<string>('IPFS_CLUSTER_USER');
    const IPFS_CLUSTER_PASSWORD = config.get<string>('IPFS_CLUSTER_PASSWORD');
    if (IPFS_CLUSTER_USER && IPFS_CLUSTER_PASSWORD) {
      const Authorization = `Basic ${Buffer.from(
        `${IPFS_CLUSTER_USER}:${IPFS_CLUSTER_PASSWORD}`
      ).toString('base64')}`;
      params.headers = { Authorization };
    }

    return params;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [IPFSParamsProvider, IPFSService],
  exports: [IPFSParamsProvider, IPFSService],
})
export class IPFSModule {}
