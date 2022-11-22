import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { DidStore as DidStoreInfura } from 'didStoreInfura';

export type IPFSInfuraConfig = ConstructorParameters<typeof DidStoreInfura>;
export type IPFSClusterConfig = ConstructorParameters<typeof DidStoreCluster>;

export const IPFSInfuraConfigToken = Symbol.for('IPFSGatewayConfig');
export const IPFSClusterConfigToken = Symbol.for('IPFSClusterConfig');
