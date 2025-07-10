import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DidStore as S3DidStoreGateway } from '@ew-did-registry/did-s3-store';
import { CID } from 'multiformats/cid';
import { Logger } from '../logger/logger.service';

@Injectable()
export class S3Service {
  constructor(
    private didStore: S3DidStoreGateway,
    private readonly logger: Logger
  ) {
    this.logger.setContext(S3Service.name);
  }

  /**
   * Check if given value is a valid S3 CID.
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

  /**
   * Get claim from cluster. If claim isn't found tries to get from gateway
   *
   * @param cid Content identifier.
   * @returns Stringified credential
   */
  public async get(cid: string): Promise<string> {
    let claim: string;
    this.logger.debug(`trying to get ${cid}`);
    try {
      claim = await this.didStore.get(cid);
    } catch (e) {
      this.logger.debug(`Claim is not resolved in S3. Claim CID ${cid}`);
      throw new HttpException(
        `Claim ${cid} not resolved`,
        HttpStatus.NOT_FOUND
      );
    }
    this.logger.debug(`got ${cid}`);

    return claim;
  }

  /**
   * Get claim from cluster with timeout. If claim isn't found tries to get from gateway
   *
   * @param cid Content identifier.
   * @param timeoutMs timeout waiting.
   * @returns Stringified credential
   */
  public async getWithTimeout(cid: string, timeoutMs: number): Promise<string> {
    let claim: string;
    this.logger.debug(`trying to get ${cid}`);
    try {
      claim = await Promise.race<string>([
        this.didStore.get(cid),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        ),
      ]);
    } catch (e) {
      this.logger.debug(`Claim is not resolved in S3. Claim CID ${cid}`);
      throw new HttpException(
        `Claim ${cid} not resolved`,
        HttpStatus.NOT_FOUND
      );
    }
    this.logger.debug(`got ${cid}`);

    return claim;
  }

  /**
   * Saves credential on cluster
   *
   * @param credential Credential being persisted
   * @returns CID of the persisted credential
   */
  public async save(credential: string): Promise<string> {
    try {
      return await this.didStore.save(credential);
    } catch (error) {
      throw new Error(`Error saving ${credential} in s3: ${error.reason}`);
    }
  }
}
