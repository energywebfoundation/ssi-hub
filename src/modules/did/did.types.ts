/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  constructor(id: string) {
    const idParts = id.split(':');
    if (idParts.length < 3) {
      throw new Error('DID should consists of at least 3 components');
    }
    this.id = id;
    const [, method] = idParts;
    this.method = method;
  }

  /**
   * A DID in the format of did:ethr:{ethereumAddress}
   */
  readonly id: string;
  readonly method: 'ethr' | string;
}

export const getDIDFromAddress = (address: string) => `did:ethr:${address}`;

export const ADD_DID_DOC_QUEUE_NAME = 'addDIDDocument';
export const UPDATE_DID_DOC_QUEUE_NAME = 'refreshDIDDocument';
