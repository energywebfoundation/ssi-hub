import { Methods } from '@ew-did-registry/did';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { providers, utils } from 'ethers';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DIDJob } from '../did.types';
import { Logger } from '../../logger/logger.service';
import { OfferableIdentity } from '../../ethers/OfferableIdentity';
import { OfferableIdentityFactory } from '../../ethers/OfferableIdentityFactory';
import { abi as offerableIdentityContract } from '../../../abi/OfferableIdentity.json';
import { DIDService } from '../did.service';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  private readonly provider: providers.JsonRpcProvider;
  private readonly offerableIdentity: OfferableIdentity;
  private readonly refresh_queue_channel = 'refreshDocument';
  private readonly upsert_queue_channel: 'upsertDocument';

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectQueue('dids') private readonly didQueue: Queue<DIDJob>,
    private readonly logger: Logger,
    private readonly didService: DIDService,
    private readonly assetRepository: AssetRepository,
  ) {
    this.logger.setContext(AssetService.name);

    this.offerableIdentity = OfferableIdentityFactory.connect(
      'address',
      this.provider,
    );

    this.InitEventListeners();

    // Using setInterval so that interval can be set dynamically from config
    const didDocSyncInterval = this.config.get<string>(
      'DIDDOC_SYNC_INTERVAL_IN_MS',
    );
    const DID_SYNC_ENABLED =
      this.config.get<string>('DID_SYNC_ENABLED') !== 'false';
    if (didDocSyncInterval && DID_SYNC_ENABLED) {
      const interval = setInterval(
        () => this.syncAssets(),
        parseInt(didDocSyncInterval),
      );
      this.schedulerRegistry.addInterval('DID Document Sync', interval);
    }
  }

  private async InitEventListeners(): Promise<void> {
    this.offerableIdentity.addListener(
      'OfferableIdentityCreated',
      async (identity, owner) => {
        const did = `did:${Methods.Erc1056}:${identity}`;
        await this.didQueue.add(this.upsert_queue_channel, { did, owner });
      },
    );

    this.offerableIdentity.addListener(
      'IdentityOffered',
      async (identity, offeredTo) => {
        const did = `did:${Methods.Erc1056}:${identity}`;
        await this.didQueue.add(this.refresh_queue_channel, { did, offeredTo });
      },
    );

    this.offerableIdentity.addListener(
      'IdentityTransferred',
      async (identity, owner) => {
        const did = `did:${Methods.Erc1056}:${identity}`;
        await this.didQueue.add(this.refresh_queue_channel, { did, owner });
      },
    );

    this.offerableIdentity.addListener(
      'OfferRejected',
      async (identity, offeredTo) => {
        const did = `did:${Methods.Erc1056}:${identity}`;
        await this.didQueue.add(this.refresh_queue_channel, { did, offeredTo });
      },
    );
  }

  private async syncAssets() {
    this.logger.debug('Beginning of assets sync');
    const assetsInterface = new utils.Interface(offerableIdentityContract);
    const Event = this.offerableIdentity.filters.OfferableIdentityCreated(
      null,
      null,
    );
    const filter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: Event.address,
      topics: [...(Event.topics as string[])],
    };
    const logs = await this.provider.getLogs(filter);
    for (const log of logs) {
      const {
        values: { identity },
      } = assetsInterface.parseLog(log);
      const owner = await this.offerableIdentity.owner();
      this.didQueue.add(this.upsert_queue_channel, {
        did: `did:${Methods.Erc1056}:${identity}`,
        owner,
      });
    }
  }

  async getAssetsByOwner(owner: string) {
    const assets = await this.assetRepository.queryAssetByOwner(owner);
    if (assets.length < 1) return assets;
    return Promise.all(
      assets.map(async asset => {
        const resolvedDocument = await asset.getResolvedDIDDocument();
        this.didService.enhanceWithClaims(asset, resolvedDocument);
        return resolvedDocument;
      }),
    );
  }

  async getAssetsByOfferedTo(offeredTo: string) {
    const assets = await this.assetRepository.queryAssetByOfferedTo(offeredTo);
    if (assets.length < 1) return assets;
    return Promise.all(
      assets.map(async asset => {
        const resolvedDocument = await asset.getResolvedDIDDocument();
        this.didService.enhanceWithClaims(asset, resolvedDocument);
        return resolvedDocument;
      }),
    );
  }
}
