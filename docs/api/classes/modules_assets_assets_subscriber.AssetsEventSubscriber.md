# Class: AssetsEventSubscriber

[modules/assets/assets.subscriber](../modules/modules_assets_assets_subscriber.md).AssetsEventSubscriber

## Table of contents

### Constructors

- [constructor](modules_assets_assets_subscriber.AssetsEventSubscriber.md#constructor)

### Methods

- [handleAssetCancelOfferEvent](modules_assets_assets_subscriber.AssetsEventSubscriber.md#handleassetcancelofferevent)
- [handleAssetCreatedEvent](modules_assets_assets_subscriber.AssetsEventSubscriber.md#handleassetcreatedevent)
- [handleAssetOfferRejected](modules_assets_assets_subscriber.AssetsEventSubscriber.md#handleassetofferrejected)
- [handleAssetOffered](modules_assets_assets_subscriber.AssetsEventSubscriber.md#handleassetoffered)
- [handleAssetTransferredEvent](modules_assets_assets_subscriber.AssetsEventSubscriber.md#handleassettransferredevent)

## Constructors

### constructor

• **new AssetsEventSubscriber**(`historyRepository`, `nats`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `historyRepository` | `Repository`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)\> |
| `nats` | [`NatsService`](modules_nats_nats_service.NatsService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### handleAssetCancelOfferEvent

▸ **handleAssetCancelOfferEvent**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`AssetEvent`](modules_assets_assets_event.AssetEvent.md) |

#### Returns

`Promise`<`void`\>

___

### handleAssetCreatedEvent

▸ **handleAssetCreatedEvent**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`AssetEvent`](modules_assets_assets_event.AssetEvent.md) |

#### Returns

`Promise`<`void`\>

___

### handleAssetOfferRejected

▸ **handleAssetOfferRejected**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`AssetEvent`](modules_assets_assets_event.AssetEvent.md) |

#### Returns

`Promise`<`void`\>

___

### handleAssetOffered

▸ **handleAssetOffered**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`AssetEvent`](modules_assets_assets_event.AssetEvent.md) |

#### Returns

`Promise`<`void`\>

___

### handleAssetTransferredEvent

▸ **handleAssetTransferredEvent**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`AssetEvent`](modules_assets_assets_event.AssetEvent.md) |

#### Returns

`Promise`<`void`\>
