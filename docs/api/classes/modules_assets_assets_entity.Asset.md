# Class: Asset

[modules/assets/assets.entity](../modules/modules_assets_assets_entity.md).Asset

## Table of contents

### Constructors

- [constructor](modules_assets_assets_entity.Asset.md#constructor)

### Properties

- [createdAt](modules_assets_assets_entity.Asset.md#createdat)
- [document](modules_assets_assets_entity.Asset.md#document)
- [history](modules_assets_assets_entity.Asset.md#history)
- [id](modules_assets_assets_entity.Asset.md#id)
- [offeredTo](modules_assets_assets_entity.Asset.md#offeredto)
- [owner](modules_assets_assets_entity.Asset.md#owner)
- [updatedAt](modules_assets_assets_entity.Asset.md#updatedat)

### Methods

- [create](modules_assets_assets_entity.Asset.md#create)

## Constructors

### constructor

• **new Asset**()

## Properties

### createdAt

• **createdAt**: `string`

___

### document

• **document**: [`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)

___

### history

• **history**: [`AssetsHistory`](modules_assets_assets_entity.AssetsHistory.md)[]

___

### id

• **id**: `string`

___

### offeredTo

• `Optional` **offeredTo**: `string`

___

### owner

• **owner**: `string`

___

### updatedAt

• **updatedAt**: `string`

## Methods

### create

▸ `Static` **create**(`data`): [`Asset`](modules_assets_assets_entity.Asset.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`Asset`](modules_assets_assets_entity.Asset.md)\> |

#### Returns

[`Asset`](modules_assets_assets_entity.Asset.md)
