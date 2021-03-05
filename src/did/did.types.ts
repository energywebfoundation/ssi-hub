/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  constructor(
    id: string,
    { offeredTo, owner }: { owner?: string; offeredTo?: string } = {},
  ) {
    this.owner = owner;
    this.offeredTo = offeredTo;

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
  readonly owner?: string;
  readonly offeredTo?: string;
}

export interface DIDJob {
  did: string;
  owner?: string;
  offeredTo?: string;
}
