# Interface: EthereumDIDRegistryInterface

[ethers/EthereumDIDRegistry](../modules/ethers_EthereumDIDRegistry.md).EthereumDIDRegistryInterface

## Hierarchy

- `Interface`

  ↳ **`EthereumDIDRegistryInterface`**

## Table of contents

### Properties

- [events](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md#events)
- [functions](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md#encodefunctiondata)
- [getEvent](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md#getevent)

## Properties

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DIDAttributeChanged(address,bytes32,bytes,uint256,uint256)` | `EventFragment` |
| `DIDDelegateChanged(address,bytes32,address,uint256,uint256)` | `EventFragment` |
| `DIDOwnerChanged(address,address,uint256)` | `EventFragment` |

#### Overrides

ethers.utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDelegate(address,bytes32,address,uint256)` | `FunctionFragment` |
| `addDelegateSigned(address,uint8,bytes32,bytes32,bytes32,address,uint256)` | `FunctionFragment` |
| `changeOwner(address,address)` | `FunctionFragment` |
| `changeOwnerSigned(address,uint8,bytes32,bytes32,address)` | `FunctionFragment` |
| `changed(address)` | `FunctionFragment` |
| `delegates(address,bytes32,address)` | `FunctionFragment` |
| `identityOwner(address)` | `FunctionFragment` |
| `nonce(address)` | `FunctionFragment` |
| `owners(address)` | `FunctionFragment` |
| `revokeAttribute(address,bytes32,bytes)` | `FunctionFragment` |
| `revokeAttributeSigned(address,uint8,bytes32,bytes32,bytes32,bytes)` | `FunctionFragment` |
| `revokeDelegate(address,bytes32,address)` | `FunctionFragment` |
| `revokeDelegateSigned(address,uint8,bytes32,bytes32,bytes32,address)` | `FunctionFragment` |
| `setAttribute(address,bytes32,bytes,uint256)` | `FunctionFragment` |
| `setAttributeSigned(address,uint8,bytes32,bytes32,bytes32,bytes,uint256)` | `FunctionFragment` |
| `validDelegate(address,bytes32,address)` | `FunctionFragment` |

#### Overrides

ethers.utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owners"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"delegates"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"nonce"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changed"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOwner"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"validDelegate"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changeOwner"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changeOwnerSigned"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addDelegate"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addDelegateSigned"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeDelegate"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeDelegateSigned"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAttribute"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAttributeSigned"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeAttribute"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeAttributeSigned"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"owners"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"delegates"`` |
| `values` | [`string`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"nonce"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changed"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOwner"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"validDelegate"`` |
| `values` | [`string`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changeOwner"`` |
| `values` | [`string`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"changeOwnerSigned"`` |
| `values` | [`string`, `BigNumberish`, `BytesLike`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addDelegate"`` |
| `values` | [`string`, `BytesLike`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addDelegateSigned"`` |
| `values` | [`string`, `BigNumberish`, `BytesLike`, `BytesLike`, `BytesLike`, `string`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeDelegate"`` |
| `values` | [`string`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeDelegateSigned"`` |
| `values` | [`string`, `BigNumberish`, `BytesLike`, `BytesLike`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAttribute"`` |
| `values` | [`string`, `BytesLike`, `BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAttributeSigned"`` |
| `values` | [`string`, `BigNumberish`, `BytesLike`, `BytesLike`, `BytesLike`, `BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeAttribute"`` |
| `values` | [`string`, `BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"revokeAttributeSigned"`` |
| `values` | [`string`, `BigNumberish`, `BytesLike`, `BytesLike`, `BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DIDOwnerChanged"`` |

#### Returns

`EventFragment`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DIDDelegateChanged"`` |

#### Returns

`EventFragment`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DIDAttributeChanged"`` |

#### Returns

`EventFragment`

#### Overrides

ethers.utils.Interface.getEvent
