import { BigNumber } from 'ethers';

export enum AssetHistoryEventType {
  ASSET_CREATED = 'asset-created',
  ASSET_OFFERED = 'asset-offered',
  ASSET_OFFER_CANCELED = 'asset-offer-canceled',
  ASSET_TRANSFERRED = 'asset-transfered',
  ASSET_OFFER_REJECTED = 'asset-offer-rejected',
}

export interface AssetHistoryEvent {
  emittedBy: string;
  relatedTo?: string;
  at: number;
  timestamp: string;
  assetId?: string;
}

export class AssetEvent implements AssetHistoryEvent {
  static create(data: AssetEvent) {
    const event = new AssetEvent();
    Object.assign(event, data);
    return event;
  }
  emittedBy: string;
  relatedTo?: string;
  at: number;
  timestamp: string;
  assetId: string;
}

interface AssetEventValues {
  at: BigNumber;
  identity: string;
}

export interface AssetCreatedEventValues extends AssetEventValues {
  owner: string;
}

export interface OfferCanceledEventValues extends AssetEventValues {
  owner: string;
}

export interface OfferRejectedEventValues extends AssetEventValues {
  offeredTo: string;
}

export interface OfferedEventValues extends AssetEventValues {
  owner: string;
}

export interface TransferEventValue extends AssetEventValues {
  owner: string;
}
