export const IPFS_PARAMS = Symbol('IPFS PARAMS');

export type IPFSClusterParams = {
  ipfsClusterRoot: string;
  headers?: Record<string, string>;
};
