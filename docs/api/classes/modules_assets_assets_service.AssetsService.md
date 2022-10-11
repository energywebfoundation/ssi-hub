# Class: AssetsService

[modules/assets/assets.service](../modules/modules_assets_assets_service.md).AssetsService

## Table of contents

### Constructors

- [constructor](modules_assets_assets_service.AssetsService.md#constructor)

### Methods

- [create](modules_assets_assets_service.AssetsService.md#create)
- [getAssetHistory](modules_assets_assets_service.AssetsService.md#getassethistory)
- [getById](modules_assets_assets_service.AssetsService.md#getbyid)
- [getByOfferedTo](modules_assets_assets_service.AssetsService.md#getbyofferedto)
- [getByOwner](modules_assets_assets_service.AssetsService.md#getbyowner)
- [getPreviouslyOwnedAssets](modules_assets_assets_service.AssetsService.md#getpreviouslyownedassets)
- [update](modules_assets_assets_service.AssetsService.md#update)

## Constructors

### constructor

• **new AssetsService**(`configService`, `provider`, `assetsRepository`, `assetsHistoryRepository`, `didService`, `logger`, `schedulerRegistry`, `eventEmitter`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `assetsRepository` | `Repository`<[`Asset`](modules_assets_assets_entity.Asset.md)\> |
| `assetsHistoryRepository` | `Repository`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)\> |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `schedulerRegistry` | `SchedulerRegistry` |
| `eventEmitter` | `EventEmitter2` |

## Methods

### create

▸ **create**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AssetDto`](modules_assets_assets_dto.AssetDto.md) |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`assetId`, `__namedParameters`): `Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.order` | ``"ASC"`` \| ``"DESC"`` |
| `__namedParameters.skip` | `number` |
| `__namedParameters.take` | `number` |
| `__namedParameters.type` | [`AssetHistoryEventType`](../enums/modules_assets_assets_event.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>

___

### getById

▸ **getById**(`id`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

___

### getByOfferedTo

▸ **getByOfferedTo**(`offeredTo`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getByOwner

▸ **getByOwner**(`owner`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### update

▸ **update**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AssetDto`](modules_assets_assets_dto.AssetDto.md) |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>
