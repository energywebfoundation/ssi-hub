# Class: AssetsHistory

[modules/assets/assets.entity](../modules/modules_assets_assets_entity.md).AssetsHistory

## Implements

- [`AssetHistoryEvent`](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md)

## Table of contents

### Constructors

- [constructor](modules_assets_assets_entity.AssetsHistory.md#constructor)

### Properties

- [asset](modules_assets_assets_entity.AssetsHistory.md#asset)
- [assetId](modules_assets_assets_entity.AssetsHistory.md#assetid)
- [at](modules_assets_assets_entity.AssetsHistory.md#at)
- [emittedBy](modules_assets_assets_entity.AssetsHistory.md#emittedby)
- [id](modules_assets_assets_entity.AssetsHistory.md#id)
- [relatedTo](modules_assets_assets_entity.AssetsHistory.md#relatedto)
- [timestamp](modules_assets_assets_entity.AssetsHistory.md#timestamp)
- [type](modules_assets_assets_entity.AssetsHistory.md#type)

### Methods

- [create](modules_assets_assets_entity.AssetsHistory.md#create)

## Constructors

### constructor

• **new AssetsHistory**()

## Properties

### asset

• `Optional` **asset**: [`Asset`](modules_assets_assets_entity.Asset.md)

___

### assetId

• `Optional` **assetId**: `string`

#### Implementation of

[AssetHistoryEvent](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md).[assetId](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md#assetid)

___

### at

• **at**: `number`

#### Implementation of

[AssetHistoryEvent](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md).[at](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md#at)

___

### emittedBy

• **emittedBy**: `string`

#### Implementation of

[AssetHistoryEvent](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md).[emittedBy](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md#emittedby)

___

### id

• **id**: `number`

___

### relatedTo

• `Optional` **relatedTo**: `string`

#### Implementation of

[AssetHistoryEvent](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md).[relatedTo](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md#relatedto)

___

### timestamp

• **timestamp**: `string`

#### Implementation of

[AssetHistoryEvent](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md).[timestamp](../interfaces/modules_assets_assets_event.AssetHistoryEvent.md#timestamp)

___

### type

• **type**: [`AssetHistoryEventType`](../enums/modules_assets_assets_event.AssetHistoryEventType.md)

## Methods

### create

▸ `Static` **create**(`data`): [`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |

#### Returns

[`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)
