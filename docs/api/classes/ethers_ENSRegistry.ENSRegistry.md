# Class: ENSRegistry

[ethers/ENSRegistry](../modules/ethers_ENSRegistry.md).ENSRegistry

## Hierarchy

- `BaseContract`

  ↳ **`ENSRegistry`**

## Table of contents

### Constructors

- [constructor](ethers_ENSRegistry.ENSRegistry.md#constructor)

### Properties

- [callStatic](ethers_ENSRegistry.ENSRegistry.md#callstatic)
- [estimateGas](ethers_ENSRegistry.ENSRegistry.md#estimategas)
- [filters](ethers_ENSRegistry.ENSRegistry.md#filters)
- [functions](ethers_ENSRegistry.ENSRegistry.md#functions)
- [interface](ethers_ENSRegistry.ENSRegistry.md#interface)
- [populateTransaction](ethers_ENSRegistry.ENSRegistry.md#populatetransaction)

### Methods

- [attach](ethers_ENSRegistry.ENSRegistry.md#attach)
- [connect](ethers_ENSRegistry.ENSRegistry.md#connect)
- [deployed](ethers_ENSRegistry.ENSRegistry.md#deployed)
- [isApprovedForAll](ethers_ENSRegistry.ENSRegistry.md#isapprovedforall)
- [listeners](ethers_ENSRegistry.ENSRegistry.md#listeners)
- [off](ethers_ENSRegistry.ENSRegistry.md#off)
- [on](ethers_ENSRegistry.ENSRegistry.md#on)
- [once](ethers_ENSRegistry.ENSRegistry.md#once)
- [owner](ethers_ENSRegistry.ENSRegistry.md#owner)
- [queryFilter](ethers_ENSRegistry.ENSRegistry.md#queryfilter)
- [recordExists](ethers_ENSRegistry.ENSRegistry.md#recordexists)
- [removeAllListeners](ethers_ENSRegistry.ENSRegistry.md#removealllisteners)
- [removeListener](ethers_ENSRegistry.ENSRegistry.md#removelistener)
- [resolver](ethers_ENSRegistry.ENSRegistry.md#resolver)
- [setApprovalForAll](ethers_ENSRegistry.ENSRegistry.md#setapprovalforall)
- [setOwner](ethers_ENSRegistry.ENSRegistry.md#setowner)
- [setRecord](ethers_ENSRegistry.ENSRegistry.md#setrecord)
- [setResolver](ethers_ENSRegistry.ENSRegistry.md#setresolver)
- [setSubnodeOwner](ethers_ENSRegistry.ENSRegistry.md#setsubnodeowner)
- [setSubnodeRecord](ethers_ENSRegistry.ENSRegistry.md#setsubnoderecord)
- [setTTL](ethers_ENSRegistry.ENSRegistry.md#setttl)
- [ttl](ethers_ENSRegistry.ENSRegistry.md#ttl)

## Constructors

### constructor

• **new ENSRegistry**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |
| `contractInterface` | `ContractInterface` |
| `signerOrProvider?` | `Signer` \| `Provider` |

#### Inherited from

BaseContract.constructor

## Properties

### callStatic

• **callStatic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `owner` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `recordExists` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `resolver` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setOwner` | (`node`: `BytesLike`, `owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setRecord` | (`node`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setResolver` | (`node`: `BytesLike`, `resolver`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setSubnodeOwner` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `setSubnodeRecord` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setTTL` | (`node`: `BytesLike`, `ttl`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `ttl` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `owner` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `recordExists` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `resolver` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setOwner` | (`node`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setRecord` | (`node`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setResolver` | (`node`: `BytesLike`, `resolver`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setSubnodeOwner` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setSubnodeRecord` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setTTL` | (`node`: `BytesLike`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `ttl` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ApprovalForAll` | (`owner?`: `string`, `operator?`: `string`, `approved?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `boolean`], { `approved`: `boolean` ; `operator`: `string` ; `owner`: `string`  }\> |
| `ApprovalForAll(address,address,bool)` | (`owner?`: `string`, `operator?`: `string`, `approved?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `boolean`], { `approved`: `boolean` ; `operator`: `string` ; `owner`: `string`  }\> |
| `NewOwner` | (`node?`: `BytesLike`, `label?`: `BytesLike`, `owner?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `label`: `string` ; `node`: `string` ; `owner`: `string`  }\> |
| `NewOwner(bytes32,bytes32,address)` | (`node?`: `BytesLike`, `label?`: `BytesLike`, `owner?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `label`: `string` ; `node`: `string` ; `owner`: `string`  }\> |
| `NewResolver` | (`node?`: `BytesLike`, `resolver?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `node`: `string` ; `resolver`: `string`  }\> |
| `NewResolver(bytes32,address)` | (`node?`: `BytesLike`, `resolver?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `node`: `string` ; `resolver`: `string`  }\> |
| `NewTTL` | (`node?`: `BytesLike`, `ttl?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], { `node`: `string` ; `ttl`: `BigNumber`  }\> |
| `NewTTL(bytes32,uint64)` | (`node?`: `BytesLike`, `ttl?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], { `node`: `string` ; `ttl`: `BigNumber`  }\> |
| `Transfer` | (`node?`: `BytesLike`, `owner?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `node`: `string` ; `owner`: `string`  }\> |
| `Transfer(bytes32,address)` | (`node?`: `BytesLike`, `owner?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `node`: `string` ; `owner`: `string`  }\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `owner` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `recordExists` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `resolver` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setOwner` | (`node`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setRecord` | (`node`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setResolver` | (`node`: `BytesLike`, `resolver`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setSubnodeOwner` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setSubnodeRecord` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setTTL` | (`node`: `BytesLike`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `ttl` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`ENSRegistryInterface`](../interfaces/ethers_ENSRegistry.ENSRegistryInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `owner` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `recordExists` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `resolver` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setOwner` | (`node`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setRecord` | (`node`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setResolver` | (`node`: `BytesLike`, `resolver`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setSubnodeOwner` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setSubnodeRecord` | (`node`: `BytesLike`, `label`: `BytesLike`, `owner`: `string`, `resolver`: `string`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setTTL` | (`node`: `BytesLike`, `ttl`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `ttl` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### attach

▸ **attach**(`addressOrName`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.attach

___

### connect

▸ **connect**(`signerOrProvider`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.connect

___

### deployed

▸ **deployed**(): `Promise`<[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)\>

#### Returns

`Promise`<[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)\>

#### Overrides

BaseContract.deployed

___

### isApprovedForAll

▸ **isApprovedForAll**(`owner`, `operator`, `overrides?`): `Promise`<`boolean`\>

Query if an address is an authorized operator for another address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address that owns the records. |
| `operator` | `string` | The address that acts on behalf of the owner. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`boolean`\>

True if `operator` is an approved operator for `owner`, false otherwise.

___

### listeners

▸ **listeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter?`): [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\>[]

#### Overrides

BaseContract.listeners

▸ **listeners**(`eventName?`): `Listener`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

`Listener`[]

#### Overrides

BaseContract.listeners

___

### off

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.once

___

### owner

▸ **owner**(`node`, `overrides?`): `Promise`<`string`\>

Returns the address that owns the specified node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The specified node. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

address of the owner.

___

### queryFilter

▸ **queryFilter**<`EventArgsArray`, `EventArgsObject`\>(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `fromBlockOrBlockhash?` | `string` \| `number` |
| `toBlock?` | `string` \| `number` |

#### Returns

`Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>[]\>

#### Overrides

BaseContract.queryFilter

___

### recordExists

▸ **recordExists**(`node`, `overrides?`): `Promise`<`boolean`\>

Returns whether a record has been imported to the registry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The specified node. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`boolean`\>

Bool if record exists

___

### removeAllListeners

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`ENSRegistry`](ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

BaseContract.removeListener

___

### resolver

▸ **resolver**(`node`, `overrides?`): `Promise`<`string`\>

Returns the address of the resolver for the specified node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The specified node. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

address of the resolver.

___

### setApprovalForAll

▸ **setApprovalForAll**(`operator`, `approved`, `overrides?`): `Promise`<`ContractTransaction`\>

Enable or disable approval for a third party ("operator") to manage all of `msg.sender`'s ENS records. Emits the ApprovalForAll event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operator` | `string` | Address to add to the set of authorized operators. |
| `approved` | `boolean` | True if the operator is approved, false to revoke approval. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setOwner

▸ **setOwner**(`node`, `owner`, `overrides?`): `Promise`<`ContractTransaction`\>

Transfers ownership of a node to a new address. May only be called by the current owner of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to transfer ownership of. |
| `owner` | `string` | The address of the new owner. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setRecord

▸ **setRecord**(`node`, `owner`, `resolver`, `ttl`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the record for a node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `owner` | `string` | The address of the new owner. |
| `resolver` | `string` | The address of the resolver. |
| `ttl` | `BigNumberish` | The TTL in seconds. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setResolver

▸ **setResolver**(`node`, `resolver`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the resolver address for the specified node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `resolver` | `string` | The address of the resolver. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setSubnodeOwner

▸ **setSubnodeOwner**(`node`, `label`, `owner`, `overrides?`): `Promise`<`ContractTransaction`\>

Transfers ownership of a subnode keccak256(node, label) to a new address. May only be called by the owner of the parent node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The parent node. |
| `label` | `BytesLike` | The hash of the label specifying the subnode. |
| `owner` | `string` | The address of the new owner. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setSubnodeRecord

▸ **setSubnodeRecord**(`node`, `label`, `owner`, `resolver`, `ttl`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the record for a subnode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The parent node. |
| `label` | `BytesLike` | The hash of the label specifying the subnode. |
| `owner` | `string` | The address of the new owner. |
| `resolver` | `string` | The address of the resolver. |
| `ttl` | `BigNumberish` | The TTL in seconds. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setTTL

▸ **setTTL**(`node`, `ttl`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the TTL for the specified node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `ttl` | `BigNumberish` | The TTL in seconds. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### ttl

▸ **ttl**(`node`, `overrides?`): `Promise`<`BigNumber`\>

Returns the TTL of a node, and any records associated with it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The specified node. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`BigNumber`\>

ttl of the node.
