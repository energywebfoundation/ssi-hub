# Class: AssetResolver

[modules/assets/assets.resolver](../modules/modules_assets_assets_resolver.md).AssetResolver

## Table of contents

### Constructors

- [constructor](modules_assets_assets_resolver.AssetResolver.md#constructor)

### Methods

- [asset](modules_assets_assets_resolver.AssetResolver.md#asset)
- [getAssetHistory](modules_assets_assets_resolver.AssetResolver.md#getassethistory)
- [getAssetsByOfferedTo](modules_assets_assets_resolver.AssetResolver.md#getassetsbyofferedto)
- [getAssetsByOwner](modules_assets_assets_resolver.AssetResolver.md#getassetsbyowner)
- [getAssetsByPreviousOwner](modules_assets_assets_resolver.AssetResolver.md#getassetsbypreviousowner)

## Constructors

### constructor

• **new AssetResolver**(`assetsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |

## Methods

### asset

▸ **asset**(`id`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `take?`, `skip?`, `order?`, `type?`): `Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `take?` | `number` |
| `skip?` | `number` |
| `order?` | [`Order`](../enums/modules_assets_assets_types.Order.md) |
| `type?` | [`AssetHistoryEventType`](../enums/modules_assets_assets_event.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>

___

### getAssetsByOfferedTo

▸ **getAssetsByOfferedTo**(`offeredTo`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getAssetsByOwner

▸ **getAssetsByOwner**(`owner`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getAssetsByPreviousOwner

▸ **getAssetsByPreviousOwner**(`owner`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>
