export const DIDDocumentClaim_DgraphType = 'IPFSClaim';

/**
 * DIDDocument as persisted to DGraph
 */
export interface DIDDocumentDTO {
  id: string;

  /**
   * JSON serialized IDIDLogData from did-resolver-interface
   * Deserialized logs could potentially be persisted but it would require a more complicated model structure
   */
  logs: string;

  claims?: IPFSClaimDTO[];
}

/**
 * An IPFS claim as persisted to DGraph
 */
export class IPFSClaimDTO {
  constructor(jwt: string, serviceEndpoint: string) {
    this.jwt = jwt;
    this.serviceEndpoint = serviceEndpoint;
  }

  serviceEndpoint: string;

  jwt: string;
}
