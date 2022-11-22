import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Injectable } from '@nestjs/common';
import { CID } from 'multiformats/cid';

@Injectable()
export class IPFSService {
  constructor(
    private didStoreInfura: DidStoreInfura,
    private didStoreCluster: DidStoreCluster
  ) {}
  /**
   * Check if given value is a valid IPFS CID.
   *
   * ```typescript
   * didService.isCID('Qm...');
   * ```
   *
   * @param {Any} hash value to check
   *
   */
  static isCID(hash: unknown): boolean {
    try {
      if (typeof hash === 'string') {
        return Boolean(CID.parse(hash));
      }

      if (hash instanceof Uint8Array) {
        return Boolean(CID.decode(hash));
      }

      return Boolean(CID.asCID(hash));
    } catch (e) {
      return false;
    }
  }

  public async get(cid: string): Promise<string> {
    return this.didStoreInfura.get(cid);
  }

  public async save(credential: string): Promise<string> {
    return this.didStoreInfura.save(credential);
  }

  public isPinned(cid: string): Promise<boolean> {
    return this.didStoreCluster.isPinned(cid);
  }

  public async pin(token: string): Promise<void> {
    await this.didStoreCluster.save(token);
  }
}
