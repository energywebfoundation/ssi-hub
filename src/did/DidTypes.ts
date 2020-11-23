import { KeyValue } from '../Interfaces/Types';

/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  constructor(id: string) {
    this.validate(id);
    this.id = id;
  }

  /**
   * A DID in the format of did:ethr:{ethereumAddress}
   */
  readonly id: string

  validate(id: string) {
    const parts = id.split(':');
    if (parts.length != 3) {
      throw new Error("DID should consists of 3 components");
    }
    if (parts[0] != 'did') {
      throw new Error('DID should begin with "did:"');
    }
    if (parts[1] != 'ethr') {
      throw new Error('DID method should be "ethr"');
    }
  }
}

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

