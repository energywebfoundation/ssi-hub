import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { IPFSService } from '../ipfs/ipfs.service';
import { DIDService } from './did.service';
import { ADD_DID_DOC_QUEUE_NAME, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';

@Processor('dids')
export class DIDProcessor {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private ipfsService: IPFSService
  ) {
    this.logger.setContext(DIDProcessor.name);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(ADD_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    try {
      this.logger.debug(`processing cache add for ${job.data}`);
      const doc = await this.didService.addCachedDocument(job.data);

      await this.pinClaims(doc.service.map((s) => s.serviceEndpoint)).catch(
        (err) => {
          this.logger.error(`error pinning the claim: ${err}`);
        }
      );
    } catch (err) {
      this.logger.error(`error adding ${job.data}: ${err}`);
      throw err;
    }
  }

  @Process(UPDATE_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    try {
      this.logger.debug(`processing cache refresh for ${job.data}`);
      let doc: DIDDocumentEntity;
      if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
        doc = await this.didService.addCachedDocument(job.data, true);
      } else {
        doc = await this.didService.incrementalRefreshCachedDocument(job.data);
      }

      await this.pinClaims(doc.service.map((s) => s.serviceEndpoint)).catch(
        (err) => {
          this.logger.error(`error pinning the claim: ${err}`);
        }
      );
    } catch (err) {
      this.logger.error(`error refreshing ${job.data}: ${err}`);
      throw err;
    }
  }

  /**
   * This method migrates claims by retrieving from one DidStore and pinning to another
   * It was implemented for EW migration from Infura to EW hosted IPFS
   */
  private async pinClaims(cids: string[]) {
    for (const cid of cids) {
      if (!(await this.ipfsService.isPinned(cid))) {
        const token = await this.ipfsService.get(cid);
        await this.ipfsService.pin(token);
      }
    }
  }
}
