# Interface: ENSRegistryInterface

[ethers/ENSRegistry](../modules/ethers_ENSRegistry.md).ENSRegistryInterface

## Hierarchy

- `Interface`

  ↳ **`ENSRegistryInterface`**

## Table of contents

### Properties

- [events](ethers_ENSRegistry.ENSRegistryInterface.md#events)
- [functions](ethers_ENSRegistry.ENSRegistryInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_ENSRegistry.ENSRegistryInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_ENSRegistry.ENSRegistryInterface.md#encodefunctiondata)
- [getEvent](ethers_ENSRegistry.ENSRegistryInterface.md#getevent)

## Properties

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ApprovalForAll(address,address,bool)` | `any` |
| `NewOwner(bytes32,bytes32,address)` | `any` |
| `NewResolver(bytes32,address)` | `any` |
| `NewTTL(bytes32,uint64)` | `any` |
| `Transfer(bytes32,address)` | `any` |

#### Overrides

ethers.utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll(address,address)` | `any` |
| `owner(bytes32)` | `any` |
| `recordExists(bytes32)` | `any` |
| `resolver(bytes32)` | `any` |
| `setApprovalForAll(address,bool)` | `any` |
| `setOwner(bytes32,address)` | `any` |
| `setRecord(bytes32,address,address,uint64)` | `any` |
| `setResolver(bytes32,address)` | `any` |
| `setSubnodeOwner(bytes32,bytes32,address)` | `any` |
| `setSubnodeRecord(bytes32,bytes32,address,address,uint64)` | `any` |
| `setTTL(bytes32,uint64)` | `any` |
| `ttl(bytes32)` | `any` |

#### Overrides

ethers.utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setRecord"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeRecord"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setOwner"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeOwner"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setResolver"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setTTL"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setApprovalForAll"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owner"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"resolver"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ttl"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"recordExists"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isApprovedForAll"`` |
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
| `functionFragment` | ``"setRecord"`` |
| `values` | [`BytesLike`, `string`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeRecord"`` |
| `values` | [`BytesLike`, `BytesLike`, `string`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setOwner"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setSubnodeOwner"`` |
| `values` | [`BytesLike`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setResolver"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setTTL"`` |
| `values` | [`BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setApprovalForAll"`` |
| `values` | [`string`, `boolean`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owner"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"resolver"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ttl"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"recordExists"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isApprovedForAll"`` |
| `values` | [`string`, `string`] |

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
| `nameOrSignatureOrTopic` | ``"ApprovalForAll"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewOwner"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewResolver"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NewTTL"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"Transfer"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent
