import { KeyValue } from '../Interfaces/Types';

export interface DIDAttributeChangedValue {
  serviceEndpoint?: string
  hash?: string;
  hashAlg?: string;

  publicKey?: string;
  tag?: string;
}

export interface DIDAttributeChangedJWTValue {
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
