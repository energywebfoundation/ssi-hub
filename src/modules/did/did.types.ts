/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  /**
   * A DID in the format of "did:" method-name ":" method-specific-id
   */
  readonly did: string;

  readonly method: 'ethr' | string;

  readonly id: string;

  readonly chain?: string;

  constructor(did: string) {
    const idParts = did.split(':');
    if (idParts.length < 3) {
      throw new Error('DID should consists of at least 3 components');
    }

    let didMethod: string;
    let didChain: string | undefined;
    let didId: string;

    // Back compatibility with old format
    if (idParts.length === 3) {
      didMethod = idParts[1];
      didChain = undefined;
      didId = idParts[2];
    } else if (idParts.length === 4) {
      didMethod = idParts[1];
      didChain = idParts[2];
      didId = idParts[3];
    } else {
      throw new Error('Unsupported DID format');
    }

    this.did = did;
    this.method = didMethod;
    this.id = didId;
    this.chain = didChain;
  }
}

export const getDIDFromAddress = (address: string) =>
  `did:ethr:${process.env.CHAIN_NAME}:${address}`;

export const ADD_DID_DOC_QUEUE_NAME = 'addDIDDocument';
export const UPDATE_DID_DOC_QUEUE_NAME = 'refreshDIDDocument';
