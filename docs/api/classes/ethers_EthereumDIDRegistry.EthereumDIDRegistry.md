# Class: EthereumDIDRegistry

[ethers/EthereumDIDRegistry](../modules/ethers_EthereumDIDRegistry.md).EthereumDIDRegistry

## Hierarchy

- `BaseContract`

  ↳ **`EthereumDIDRegistry`**

## Table of contents

### Constructors

- [constructor](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#constructor)

### Properties

- [callStatic](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#callstatic)
- [estimateGas](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#estimategas)
- [filters](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#filters)
- [functions](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#functions)
- [interface](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#interface)
- [populateTransaction](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#populatetransaction)

### Methods

- [addDelegate](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#adddelegate)
- [addDelegateSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#adddelegatesigned)
- [attach](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#attach)
- [changeOwner](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#changeowner)
- [changeOwnerSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#changeownersigned)
- [changed](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#changed)
- [connect](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#connect)
- [delegates](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#delegates)
- [deployed](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#deployed)
- [identityOwner](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#identityowner)
- [listeners](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#listeners)
- [nonce](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#nonce)
- [off](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#off)
- [on](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#on)
- [once](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#once)
- [owners](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#owners)
- [queryFilter](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#queryfilter)
- [removeAllListeners](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#removealllisteners)
- [removeListener](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#removelistener)
- [revokeAttribute](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokeattribute)
- [revokeAttributeSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokeattributesigned)
- [revokeDelegate](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokedelegate)
- [revokeDelegateSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokedelegatesigned)
- [setAttribute](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#setattribute)
- [setAttributeSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#setattributesigned)
- [validDelegate](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#validdelegate)

## Constructors

### constructor

• **new EthereumDIDRegistry**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |
| `contractInterface` | `ContractInterface` |
| `signerOrProvider?` | `Provider` \| `Signer` |

#### Inherited from

BaseContract.constructor

## Properties

### callStatic

• **callStatic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `addDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `changeOwner` | (`identity`: `string`, `newOwner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `changeOwnerSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `newOwner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `changed` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `delegates` | (`arg0`: `string`, `arg1`: `BytesLike`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `nonce` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `owners` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `revokeAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `revokeAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `revokeDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `revokeDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `validDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `addDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `changeOwner` | (`identity`: `string`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `changeOwnerSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `changed` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `delegates` | (`arg0`: `string`, `arg1`: `BytesLike`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `nonce` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `owners` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `revokeAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `revokeAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `revokeDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `revokeDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `validDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DIDAttributeChanged` | (`identity?`: `string`, `name?`: ``null``, `value?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], `Object`\> |
| `DIDAttributeChanged(address,bytes32,bytes,uint256,uint256)` | (`identity?`: `string`, `name?`: ``null``, `value?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], `Object`\> |
| `DIDDelegateChanged` | (`identity?`: `string`, `delegateType?`: ``null``, `delegate?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], `Object`\> |
| `DIDDelegateChanged(address,bytes32,address,uint256,uint256)` | (`identity?`: `string`, `delegateType?`: ``null``, `delegate?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], `Object`\> |
| `DIDOwnerChanged` | (`identity?`: `string`, `owner?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |
| `DIDOwnerChanged(address,address,uint256)` | (`identity?`: `string`, `owner?`: ``null``, `previousChange?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `addDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `changeOwner` | (`identity`: `string`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `changeOwnerSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `changed` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |
| `delegates` | (`arg0`: `string`, `arg1`: `BytesLike`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `nonce` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |
| `owners` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `revokeAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `revokeAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `revokeDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `revokeDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `validDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`EthereumDIDRegistryInterface`](../interfaces/ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `addDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `changeOwner` | (`identity`: `string`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `changeOwnerSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `changed` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `delegates` | (`arg0`: `string`, `arg1`: `BytesLike`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `nonce` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `owners` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `revokeAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `revokeAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `revokeDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `revokeDelegateSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setAttribute` | (`identity`: `string`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setAttributeSigned` | (`identity`: `string`, `sigV`: `BigNumberish`, `sigR`: `BytesLike`, `sigS`: `BytesLike`, `name`: `BytesLike`, `value`: `BytesLike`, `validity`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `validDelegate` | (`identity`: `string`, `delegateType`: `BytesLike`, `delegate`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### addDelegate

▸ **addDelegate**(`identity`, `delegateType`, `delegate`, `validity`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `delegateType` | `BytesLike` |
| `delegate` | `string` |
| `validity` | `BigNumberish` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### addDelegateSigned

▸ **addDelegateSigned**(`identity`, `sigV`, `sigR`, `sigS`, `delegateType`, `delegate`, `validity`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `sigV` | `BigNumberish` |
| `sigR` | `BytesLike` |
| `sigS` | `BytesLike` |
| `delegateType` | `BytesLike` |
| `delegate` | `string` |
| `validity` | `BigNumberish` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### attach

▸ **attach**(`addressOrName`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.attach

___

### changeOwner

▸ **changeOwner**(`identity`, `newOwner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `newOwner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### changeOwnerSigned

▸ **changeOwnerSigned**(`identity`, `sigV`, `sigR`, `sigS`, `newOwner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `sigV` | `BigNumberish` |
| `sigR` | `BytesLike` |
| `sigS` | `BytesLike` |
| `newOwner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### changed

▸ **changed**(`arg0`, `overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.connect

___

### delegates

▸ **delegates**(`arg0`, `arg1`, `arg2`, `overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `arg1` | `BytesLike` |
| `arg2` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### deployed

▸ **deployed**(): `Promise`<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Returns

`Promise`<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Overrides

BaseContract.deployed

___

### identityOwner

▸ **identityOwner**(`identity`, `overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

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

### nonce

▸ **nonce**(`arg0`, `overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### off

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

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

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

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

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

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

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.once

___

### owners

▸ **owners**(`arg0`, `overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

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

### removeAllListeners

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

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

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

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

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Overrides

BaseContract.removeListener

___

### revokeAttribute

▸ **revokeAttribute**(`identity`, `name`, `value`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `name` | `BytesLike` |
| `value` | `BytesLike` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### revokeAttributeSigned

▸ **revokeAttributeSigned**(`identity`, `sigV`, `sigR`, `sigS`, `name`, `value`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `sigV` | `BigNumberish` |
| `sigR` | `BytesLike` |
| `sigS` | `BytesLike` |
| `name` | `BytesLike` |
| `value` | `BytesLike` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### revokeDelegate

▸ **revokeDelegate**(`identity`, `delegateType`, `delegate`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `delegateType` | `BytesLike` |
| `delegate` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### revokeDelegateSigned

▸ **revokeDelegateSigned**(`identity`, `sigV`, `sigR`, `sigS`, `delegateType`, `delegate`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `sigV` | `BigNumberish` |
| `sigR` | `BytesLike` |
| `sigS` | `BytesLike` |
| `delegateType` | `BytesLike` |
| `delegate` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setAttribute

▸ **setAttribute**(`identity`, `name`, `value`, `validity`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `name` | `BytesLike` |
| `value` | `BytesLike` |
| `validity` | `BigNumberish` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setAttributeSigned

▸ **setAttributeSigned**(`identity`, `sigV`, `sigR`, `sigS`, `name`, `value`, `validity`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `sigV` | `BigNumberish` |
| `sigR` | `BytesLike` |
| `sigS` | `BytesLike` |
| `name` | `BytesLike` |
| `value` | `BytesLike` |
| `validity` | `BigNumberish` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### validDelegate

▸ **validDelegate**(`identity`, `delegateType`, `delegate`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `delegateType` | `BytesLike` |
| `delegate` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>
