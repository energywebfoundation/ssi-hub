# Interface: DomainNotifierInterface

[ethers/DomainNotifier](../modules/ethers_DomainNotifier.md).DomainNotifierInterface

## Hierarchy

- `Interface`

  ↳ **`DomainNotifierInterface`**

## Table of contents

### Properties

- [events](ethers_DomainNotifier.DomainNotifierInterface.md#events)
- [functions](ethers_DomainNotifier.DomainNotifierInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_DomainNotifier.DomainNotifierInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_DomainNotifier.DomainNotifierInterface.md#encodefunctiondata)
- [getEvent](ethers_DomainNotifier.DomainNotifierInterface.md#getevent)

## Properties

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DomainUpdated(bytes32)` | `any` |

#### Overrides

ethers.utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated(bytes32)` | `any` |

#### Overrides

ethers.utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"domainUpdated"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"domainUpdated"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DomainUpdated"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent
