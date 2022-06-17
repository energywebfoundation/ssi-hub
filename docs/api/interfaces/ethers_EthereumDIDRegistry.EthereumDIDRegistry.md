# Interface: EthereumDIDRegistry

[ethers/EthereumDIDRegistry](../modules/ethers_EthereumDIDRegistry.md).EthereumDIDRegistry

## Hierarchy

- `BaseContract`

  ↳ **`EthereumDIDRegistry`**

## Table of contents

### Properties

- [callStatic](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#callstatic)
- [contractName](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#contractname)
- [estimateGas](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#estimategas)
- [filters](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#filters)
- [functions](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#functions)
- [interface](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#interface)
- [off](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#off)
- [on](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#on)
- [once](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#once)
- [populateTransaction](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#populatetransaction)
- [removeListener](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#removelistener)

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
- [owners](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#owners)
- [queryFilter](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#queryfilter)
- [removeAllListeners](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#removealllisteners)
- [revokeAttribute](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokeattribute)
- [revokeAttributeSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokeattributesigned)
- [revokeDelegate](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokedelegate)
- [revokeDelegateSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#revokedelegatesigned)
- [setAttribute](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#setattribute)
- [setAttributeSigned](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#setattributesigned)
- [validDelegate](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md#validdelegate)

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

### contractName

• **contractName**: ``"EthereumDIDRegistry"``

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
| `DIDAttributeChanged` | (`identity?`: `string`, `name?`: ``null``, `value?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`DIDAttributeChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#didattributechangedeventfilter) |
| `DIDAttributeChanged(address,bytes32,bytes,uint256,uint256)` | (`identity?`: `string`, `name?`: ``null``, `value?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`DIDAttributeChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#didattributechangedeventfilter) |
| `DIDDelegateChanged` | (`identity?`: `string`, `delegateType?`: ``null``, `delegate?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`DIDDelegateChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#diddelegatechangedeventfilter) |
| `DIDDelegateChanged(address,bytes32,address,uint256,uint256)` | (`identity?`: `string`, `delegateType?`: ``null``, `delegate?`: ``null``, `validTo?`: ``null``, `previousChange?`: ``null``) => [`DIDDelegateChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#diddelegatechangedeventfilter) |
| `DIDOwnerChanged` | (`identity?`: `string`, `owner?`: ``null``, `previousChange?`: ``null``) => [`DIDOwnerChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#didownerchangedeventfilter) |
| `DIDOwnerChanged(address,address,uint256)` | (`identity?`: `string`, `owner?`: ``null``, `previousChange?`: ``null``) => [`DIDOwnerChangedEventFilter`](../modules/ethers_EthereumDIDRegistry.md#didownerchangedeventfilter) |

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

• **interface**: [`EthereumDIDRegistryInterface`](ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md)

#### Overrides

BaseContract.interface

___

### off

• **off**: [`OnEvent`](ethers_common.OnEvent.md)<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Overrides

BaseContract.off

___

### on

• **on**: [`OnEvent`](ethers_common.OnEvent.md)<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Overrides

BaseContract.on

___

### once

• **once**: [`OnEvent`](ethers_common.OnEvent.md)<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Overrides

BaseContract.once

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

___

### removeListener

• **removeListener**: [`OnEvent`](ethers_common.OnEvent.md)<[`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)\>

#### Overrides

BaseContract.removeListener

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
| `signerOrProvider` | `string` \| `Signer` \| `Provider` |

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

▸ **listeners**<`TEvent`\>(`eventFilter?`): [`TypedListener`](ethers_common.TypedListener.md)<`TEvent`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

#### Returns

[`TypedListener`](ethers_common.TypedListener.md)<`TEvent`\>[]

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

▸ **queryFilter**<`TEvent`\>(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<`TEvent`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |
| `fromBlockOrBlockhash?` | `string` \| `number` |
| `toBlock?` | `string` \| `number` |

#### Returns

`Promise`<`TEvent`[]\>

#### Overrides

BaseContract.queryFilter

___

### removeAllListeners

▸ **removeAllListeners**<`TEvent`\>(`eventFilter`): [`EthereumDIDRegistry`](ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

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
