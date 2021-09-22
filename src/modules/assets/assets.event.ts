import { utils } from 'ethers';

export enum AssetHistoryEventType {
  ASSET_CREATED = 'ASSET_CREATED',
  ASSET_OFFERED = 'ASSET_OFFERED',
  ASSET_OFFER_CANCELED = 'ASSET_OFFER_CANCELED',
  ASSET_TRANSFERRED = 'ASSET_TRANSFERRED',
  ASSET_OFFER_REJECTED = 'ASSET_OFFER_REJECTED',
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
  at: utils.BigNumber;
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
