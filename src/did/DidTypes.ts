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
