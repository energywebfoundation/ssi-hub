# Interface: ENSRegistryInterface

[ethers/ENSRegistry](../modules/ethers_ENSRegistry.md).ENSRegistryInterface

## Hierarchy

- `Interface`

  ↳ **`ENSRegistryInterface`**

## Table of contents

### Properties

- [contractName](ethers_ENSRegistry.ENSRegistryInterface.md#contractname)
- [events](ethers_ENSRegistry.ENSRegistryInterface.md#events)
- [functions](ethers_ENSRegistry.ENSRegistryInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_ENSRegistry.ENSRegistryInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_ENSRegistry.ENSRegistryInterface.md#encodefunctiondata)
- [getEvent](ethers_ENSRegistry.ENSRegistryInterface.md#getevent)

## Properties

### contractName

• **contractName**: ``"ENSRegistry"``

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ApprovalForAll(address,address,bool)` | `EventFragment` |
| `NewOwner(bytes32,bytes32,address)` | `EventFragment` |
| `NewResolver(bytes32,address)` | `EventFragment` |
| `NewTTL(bytes32,uint64)` | `EventFragment` |
| `Transfer(bytes32,address)` | `EventFragment` |

#### Overrides

utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll(address,address)` | `FunctionFragment` |
| `owner(bytes32)` | `FunctionFragment` |
| `recordExists(bytes32)` | `FunctionFragment` |
| `resolver(bytes32)` | `FunctionFragment` |
| `setApprovalForAll(address,bool)` | `FunctionFragment` |
| `setOwner(bytes32,address)` | `FunctionFragment` |
| `setRecord(bytes32,address,address,uint64)` | `FunctionFragment` |
| `setResolver(bytes32,address)` | `FunctionFragment` |
| `setSubnodeOwner(bytes32,bytes32,address)` | `FunctionFragment` |
| `setSubnodeRecord(bytes32,bytes32,address,address,uint64)` | `FunctionFragment` |
| `setTTL(bytes32,uint64)` | `FunctionFragment` |
| `ttl(bytes32)` | `FunctionFragment` |

#### Overrides

utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setRecord"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeRecord"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setOwner"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeOwner"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setResolver"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setTTL"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setApprovalForAll"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owner"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"resolver"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ttl"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"recordExists"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isApprovedForAll"`` |
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
| `functionFragment` | ``"setRecord"`` |
| `values` | [`BytesLike`, `string`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeRecord"`` |
| `values` | [`BytesLike`, `BytesLike`, `string`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setOwner"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeOwner"`` |
| `values` | [`BytesLike`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setResolver"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setTTL"`` |
| `values` | [`BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setApprovalForAll"`` |
| `values` | [`string`, `boolean`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owner"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"resolver"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ttl"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"recordExists"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isApprovedForAll"`` |
| `values` | [`string`, `string`] |

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
| `nameOrSignatureOrTopic` | ``"ApprovalForAll"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewOwner"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewResolver"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewTTL"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"Transfer"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent
