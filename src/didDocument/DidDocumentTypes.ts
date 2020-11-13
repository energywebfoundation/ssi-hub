import { DGraphObject, KeyValue } from '../Interfaces/Types';

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

export interface DidDocumentMessage {
    id: string;
}

export interface DidDocument extends DGraphObject {
    id: string;
}

// IDIDDocument from ew-did-registry
// export interface IDIDDocument {
//     '@context': string;
//     id: string;
//     publicKey: IPublicKey[];
//     authentication: Array<IAuthentication | string>;
//     delegates?: string[];
//     service?: IServiceEndpoint[];
//     created?: string;
//     updated?: string;
//     proof?: ILinkedDataProof;
// }