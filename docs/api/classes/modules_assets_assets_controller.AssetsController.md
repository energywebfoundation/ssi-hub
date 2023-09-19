# Class: AssetsController

[modules/assets/assets.controller](../modules/modules_assets_assets_controller.md).AssetsController

## Table of contents

### Constructors

- [constructor](modules_assets_assets_controller.AssetsController.md#constructor)

### Methods

- [getByID](modules_assets_assets_controller.AssetsController.md#getbyid)
- [getByOfferedTo](modules_assets_assets_controller.AssetsController.md#getbyofferedto)
- [getByOwner](modules_assets_assets_controller.AssetsController.md#getbyowner)
- [getByPreviousOwner](modules_assets_assets_controller.AssetsController.md#getbypreviousowner)
- [getHistoryByAssetId](modules_assets_assets_controller.AssetsController.md#gethistorybyassetid)

## Constructors

### constructor

• **new AssetsController**(`assetsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |

## Methods

### getByID

▸ **getByID**(`«destructured»`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DID`](modules_did_did_types.DID.md) |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)\>

___

### getByOfferedTo

▸ **getByOfferedTo**(`«destructured»`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DID`](modules_did_did_types.DID.md) |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getByOwner

▸ **getByOwner**(`«destructured»`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DID`](modules_did_did_types.DID.md) |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getByPreviousOwner

▸ **getByPreviousOwner**(`«destructured»`, `currentUser?`): `Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DID`](modules_did_did_types.DID.md) |
| `currentUser?` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_entity.Asset.md)[]\>

___

### getHistoryByAssetId

▸ **getHistoryByAssetId**(`«destructured»`, `take?`, `skip?`, `order?`, `type?`): `Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DID`](modules_did_did_types.DID.md) |
| `take?` | `number` |
| `skip?` | `number` |
| `order?` | [`Order`](../enums/modules_assets_assets_types.Order.md) |
| `type?` | [`AssetHistoryEventType`](../enums/modules_assets_assets_event.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]\>
