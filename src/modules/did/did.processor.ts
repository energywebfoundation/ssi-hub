import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { DidStore as DidStoreInfura } from 'didStoreInfura';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { Logger } from '../logger/logger.service';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import { ADD_DID_DOC_QUEUE_NAME, UPDATE_DID_DOC_QUEUE_NAME } from './did.types';

@Processor('dids')
export class DIDProcessor {
  private didCluster: DidStoreCluster;

  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private didInfura: DidStoreInfura
  ) {
    this.logger.setContext(DIDProcessor.name);

    const IPFS_CLUSTER_ROOT = this.configService.get('IPFS_CLUSTER_ROOT');
    const IPFS_CLUSTER_USER = this.configService.get('IPFS_CLUSTER_USER');
    const IPFS_CLUSTER_PASSWORD = this.configService.get(
      'IPFS_CLUSTER_PASSWORD'
    );
    const Authorization = `Basic ${Buffer.from(
      `${IPFS_CLUSTER_USER}:${IPFS_CLUSTER_PASSWORD}`
    ).toString('base64')}`;
    this.didCluster = new DidStoreCluster(IPFS_CLUSTER_ROOT, {
      Authorization,
    });
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(ADD_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentAddition(job: Job<string>) {
    this.logger.debug(`processing cache add for ${job.data}`);
    const doc = await this.didService.addCachedDocument(job.data);

    await this.pinClaims(doc.service.map((s) => s.serviceEndpoint));
  }

  @Process(UPDATE_DID_DOC_QUEUE_NAME)
  public async processDIDDocumentRefresh(job: Job<string>) {
    this.logger.debug(`processing cache refresh for ${job.data}`);
    let doc: DIDDocumentEntity;
    if (this.configService.get<boolean>('DID_SYNC_MODE_FULL')) {
      doc = await this.didService.addCachedDocument(job.data, true);
    } else {
      doc = await this.didService.incrementalRefreshCachedDocument(job.data);
    }

    await this.pinClaims(doc.service.map((s) => s.serviceEndpoint));
  }

  /**
   * This method migrates claims by retrieving from one DidStore and pinning to another
   * It was implemented for EW migration from Infura to EW hosted IPFS
   */
  private async pinClaims(cids: string[]) {
    for (const cid of cids) {
      if (!(await this.didCluster.isPinned(cid))) {
        const token = await this.didInfura.get(cid);
        await this.didCluster.save(token);
      }
    }
  }
}
