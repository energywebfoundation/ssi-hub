import { getAddress } from 'ethers/utils';

/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  constructor(id: string) {
    this.id = this.normalize(id);
  }

  /**
   * A DID in the format of did:ethr:{ethereumAddress}
   */
  readonly id: string;

  /**
   * Verifies that DID conforms to EIP-1056 and normalizes address
   * @param id 
   */
  normalize(id: string): string {
    const parts = id.split(':');
    if (parts.length != 3) {
      throw new Error('DID should consists of 3 components');
    }
    if (parts[0] !== 'did') {
      throw new Error('DID should begin with "did:"');
    }
    if (parts[1] !== 'ethr') {
      throw new Error('DID method should be "ethr"');
    }
    try {
      parts[2] = getAddress(parts[2]);
    } catch (e) { throw new Error('DID identifier should be valid address'); }
    return parts.join(':')
  }
}
