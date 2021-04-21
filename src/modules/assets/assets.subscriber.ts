import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../logger/logger.service';
import { AssetsHistory } from './assets.entity';
import { AssetEvent, AssetHistoryEventType } from './assets.event';
import { NatsService } from '../nats/nats.service';
import { NATS_EXCHANGE_TOPIC } from '../claim/claim.types';

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

  @OnEvent(AssetHistoryEventType.ASSET_CREATED)
  async handleAssetCreatedEvent(event: AssetEvent) {
    if (
      await this.isEventAlreadySaved(AssetHistoryEventType.ASSET_CREATED, event)
    ) {
      return;
    }
    const eventToSave = AssetsHistory.create({
      ...event,
      type: AssetHistoryEventType.ASSET_CREATED,
    });
    const saved = await this.historyRepository.save(eventToSave);
    this.logger.debug(
      `${eventToSave.type} event for ${
        eventToSave.assetId
      } handled: ${JSON.stringify(saved)}`,
    );
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFER_CANCELED)
  async handleAssetCancelOfferEvent(event: AssetEvent) {
    if (
      await this.isEventAlreadySaved(
        AssetHistoryEventType.ASSET_OFFER_CANCELED,
        event,
      )
    ) {
      return;
    }
    const eventToSave = AssetsHistory.create({
      ...event,
      type: AssetHistoryEventType.ASSET_OFFER_CANCELED,
    });
    const saved = await this.historyRepository.save(eventToSave);
    this.logger.debug(
      `${eventToSave.type} event for ${
        eventToSave.assetId
      } saved: ${JSON.stringify(saved)}`,
    );

    this.nats.connection.publish(
      `${eventToSave.relatedTo}.${NATS_EXCHANGE_TOPIC}`,
      JSON.stringify(eventToSave)
    );
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFERED)
  async handleAssetOffered(event: AssetEvent) {
    if (
      await this.isEventAlreadySaved(AssetHistoryEventType.ASSET_OFFERED, event)
    ) {
      return;
    }
    const eventToSave = AssetsHistory.create({
      ...event,
      type: AssetHistoryEventType.ASSET_OFFERED,
    });
    const saved = await this.historyRepository.save(eventToSave);
    this.logger.debug(
      `${eventToSave.type} event for ${
        eventToSave.assetId
      } saved: ${JSON.stringify(saved)}`,
    );

    this.nats.connection.publish(
      `${eventToSave.relatedTo}.${NATS_EXCHANGE_TOPIC}`,
      JSON.stringify(eventToSave)
    );
  }

  @OnEvent(AssetHistoryEventType.ASSET_TRANSFERRED)
  async handleAssetTransferredEvent(event: AssetEvent) {
    if (
      await this.isEventAlreadySaved(
        AssetHistoryEventType.ASSET_TRANSFERRED,
        event,
      )
    ) {
      return;
    }
    const eventToSave = AssetsHistory.create({
      ...event,
      type: AssetHistoryEventType.ASSET_TRANSFERRED,
    });
    const saved = await this.historyRepository.save(eventToSave);
    this.logger.debug(
      `${eventToSave.type} event for ${
        eventToSave.assetId
      } saved: ${JSON.stringify(saved)}`,
    );

    this.nats.connection.publish(
      `${eventToSave.relatedTo}.${NATS_EXCHANGE_TOPIC}`,
      JSON.stringify(eventToSave)
    );
  }

  @OnEvent(AssetHistoryEventType.ASSET_OFFER_REJECTED)
  async handleAssetOfferRejected(event: AssetEvent) {
    if (
      await this.isEventAlreadySaved(
        AssetHistoryEventType.ASSET_OFFER_REJECTED,
        event,
      )
    ) {
      return;
    }
    const eventToSave = AssetsHistory.create({
      ...event,
      type: AssetHistoryEventType.ASSET_OFFER_REJECTED,
    });
    const saved = await this.historyRepository.save(eventToSave);
    this.logger.debug(
      `${eventToSave.type} event for ${
        eventToSave.assetId
      } saved: ${JSON.stringify(saved)}`,
    );

    this.nats.connection.publish(
      `${eventToSave.relatedTo}.${NATS_EXCHANGE_TOPIC}`,
      JSON.stringify(eventToSave)
    );
  }
}
