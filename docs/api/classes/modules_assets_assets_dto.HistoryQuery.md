# Class: HistoryQuery

[modules/assets/assets.dto](../modules/modules_assets_assets_dto.md).HistoryQuery

## Table of contents

### Constructors

- [constructor](modules_assets_assets_dto.HistoryQuery.md#constructor)

### Properties

- [order](modules_assets_assets_dto.HistoryQuery.md#order)
- [skip](modules_assets_assets_dto.HistoryQuery.md#skip)
- [take](modules_assets_assets_dto.HistoryQuery.md#take)
- [type](modules_assets_assets_dto.HistoryQuery.md#type)

### Methods

- [create](modules_assets_assets_dto.HistoryQuery.md#create)

## Constructors

### constructor

• **new HistoryQuery**()

## Properties

### order

• `Optional` **order**: [`Order`](../enums/modules_assets_assets_types.Order.md)

___

### skip

• `Optional` **skip**: `number` = `0`

___

### take

• `Optional` **take**: `number` = `10`

___

### type

• `Optional` **type**: [`AssetHistoryEventType`](../enums/modules_assets_assets_event.AssetHistoryEventType.md)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`HistoryQuery`](modules_assets_assets_dto.HistoryQuery.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`HistoryQuery`](modules_assets_assets_dto.HistoryQuery.md)\> |

#### Returns

`Promise`<[`HistoryQuery`](modules_assets_assets_dto.HistoryQuery.md)\>
