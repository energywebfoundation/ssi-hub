import { DidStore as DidStoreCluster } from 'didStoreCluster';

export type IpfsClusterConfig = ConstructorParameters<typeof DidStoreCluster>;

// copied from https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions, because ipfs-http-client isnt' typed
export type IpfsInfuraConfig = {
  url?: string;
  protocol?: string;
  host?: string;
  port?: number;
  path?: string;
  headers?: {
    Authorization?: string;
  };
};

export const IPFSInfuraConfigToken = Symbol.for('IPFSInfuraConfigToken');
export const IPFSClusterConfigToken = Symbol.for('IPFSClusterConfigToken');

export const PIN_CLAIM_JOB_NAME = 'pinning';
export const PIN_CLAIM_QUEUE_NAME = 'pinClaimQueue';

export type PinClaimData = {
  cid: string;
  claim?: string;
};
