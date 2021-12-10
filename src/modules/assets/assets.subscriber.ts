import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../logger/logger.service';
import { AssetsHistory } from './assets.entity';
import { AssetEvent, AssetHistoryEventType } from './assets.event';
import { NATS_EXCHANGE_TOPIC } from '../claim/claim.types';
import { NatsService } from '../nats/nats.service';

@Injectable()
export class AssetsEventSubscriber {
  constructor(
    @InjectRepository(AssetsHistory)
    private readonly historyRepository: Repository<AssetsHistory>,
    private readonly nats: NatsService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(AssetsEventSubscriber.name);
  }

  private async isEventAlreadySaved(
    type: AssetHistoryEventType,
    { at, assetId, emittedBy }: AssetEvent,
  ) {
    const savedEvent = await this.historyRepository.findOne({
      where: {
        type,
        assetId,
        at,
        emittedBy,
      },
    });
    return Boolean(savedEvent);
  }

  private async handleAssetEvent(
    event: AssetEvent,
    type: AssetHistoryEventType,
    publish = true,
  ) {
    if (await this.isEventAlreadySaved(type, event)) {
      return;
    }

    const saved = await this.historyRepository.save({ ...event, type });
    this.logger.debug(
      `${type} event for ${event.assetId} saved: ${JSON.stringify(saved)}`,
    );

    if (publish) {
      this.nats.publishForDids(type, NATS_EXCHANGE_TOPIC, [event.relatedTo], {
        ...event,
        type,
      });
    }
  }

  @OnEvent(AssetHistoryEventType.ASSET_CREATED)
  async handleAssetCreatedEvent(event: AssetEvent) {
    this.handleAssetEvent(event, AssetHistoryEventType.ASSET_CREATED, false);
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFER_CANCELED)
  async handleAssetCancelOfferEvent(event: AssetEvent) {
    this.handleAssetEvent(event, AssetHistoryEventType.ASSET_OFFER_CANCELED);
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFERED)
  async handleAssetOffered(event: AssetEvent) {
    this.handleAssetEvent(event, AssetHistoryEventType.ASSET_OFFERED);
  }

  @OnEvent(AssetHistoryEventType.ASSET_TRANSFERRED)
  async handleAssetTransferredEvent(event: AssetEvent) {
    this.handleAssetEvent(event, AssetHistoryEventType.ASSET_TRANSFERRED);
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFER_REJECTED)
  async handleAssetOfferRejected(event: AssetEvent) {
    this.handleAssetEvent(event, AssetHistoryEventType.ASSET_OFFER_REJECTED);
  }
}
