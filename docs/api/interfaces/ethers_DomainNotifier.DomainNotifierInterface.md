# Interface: DomainNotifierInterface

[ethers/DomainNotifier](../modules/ethers_DomainNotifier.md).DomainNotifierInterface

## Hierarchy

- `Interface`

  ↳ **`DomainNotifierInterface`**

## Table of contents

### Properties

- [contractName](ethers_DomainNotifier.DomainNotifierInterface.md#contractname)
- [events](ethers_DomainNotifier.DomainNotifierInterface.md#events)
- [functions](ethers_DomainNotifier.DomainNotifierInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_DomainNotifier.DomainNotifierInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_DomainNotifier.DomainNotifierInterface.md#encodefunctiondata)
- [getEvent](ethers_DomainNotifier.DomainNotifierInterface.md#getevent)

## Properties

### contractName

• **contractName**: ``"DomainNotifier"``

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DomainUpdated(bytes32)` | `EventFragment` |

#### Overrides

utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated(bytes32)` | `FunctionFragment` |

#### Overrides

utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"domainUpdated"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

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

utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DomainUpdated"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent
