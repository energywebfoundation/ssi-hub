import { IAuthentication, IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { DGraphObject, KeyValue } from '../Interfaces/Types';

/**
 * Representation of value property from DIDAttributeChanged event
 * See EIP-1056 (https://eips.ethereum.org/EIPS/eip-1056)
 */
export interface DIDAttributeChangedValue {
  serviceEndpoint?: string
  hash?: string;
  hashAlg?: string;

  publicKey?: string;
  tag?: string;
}

/**
 * Claim as retrievable from IPFS
 */
export interface IpfsClaim {
  did: string;
  signer: string;
  claimData: {
    fields: KeyValue[],
    claimType: string;
  },
  sub: string;
  iat: number;
  iss: string;
  jti: string;
  exp: number;
}