# Class: OfferableIdentity

[ethers/OfferableIdentity](../modules/ethers_OfferableIdentity.md).OfferableIdentity

## Hierarchy

- `BaseContract`

  ↳ **`OfferableIdentity`**

## Table of contents

### Constructors

- [constructor](ethers_OfferableIdentity.OfferableIdentity.md#constructor)

### Properties

- [callStatic](ethers_OfferableIdentity.OfferableIdentity.md#callstatic)
- [estimateGas](ethers_OfferableIdentity.OfferableIdentity.md#estimategas)
- [filters](ethers_OfferableIdentity.OfferableIdentity.md#filters)
- [functions](ethers_OfferableIdentity.OfferableIdentity.md#functions)
- [interface](ethers_OfferableIdentity.OfferableIdentity.md#interface)
- [populateTransaction](ethers_OfferableIdentity.OfferableIdentity.md#populatetransaction)

### Methods

- [acceptOffer](ethers_OfferableIdentity.OfferableIdentity.md#acceptoffer)
- [attach](ethers_OfferableIdentity.OfferableIdentity.md#attach)
- [cancelOffer](ethers_OfferableIdentity.OfferableIdentity.md#canceloffer)
- [connect](ethers_OfferableIdentity.OfferableIdentity.md#connect)
- [deployed](ethers_OfferableIdentity.OfferableIdentity.md#deployed)
- [init](ethers_OfferableIdentity.OfferableIdentity.md#init)
- [listeners](ethers_OfferableIdentity.OfferableIdentity.md#listeners)
- [off](ethers_OfferableIdentity.OfferableIdentity.md#off)
- [offer](ethers_OfferableIdentity.OfferableIdentity.md#offer)
- [offeredTo](ethers_OfferableIdentity.OfferableIdentity.md#offeredto)
- [on](ethers_OfferableIdentity.OfferableIdentity.md#on)
- [once](ethers_OfferableIdentity.OfferableIdentity.md#once)
- [owner](ethers_OfferableIdentity.OfferableIdentity.md#owner)
- [queryFilter](ethers_OfferableIdentity.OfferableIdentity.md#queryfilter)
- [rejectOffer](ethers_OfferableIdentity.OfferableIdentity.md#rejectoffer)
- [removeAllListeners](ethers_OfferableIdentity.OfferableIdentity.md#removealllisteners)
- [removeListener](ethers_OfferableIdentity.OfferableIdentity.md#removelistener)
- [sendTransaction](ethers_OfferableIdentity.OfferableIdentity.md#sendtransaction)
- [supportsInterface](ethers_OfferableIdentity.OfferableIdentity.md#supportsinterface)

## Constructors

### constructor

• **new OfferableIdentity**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

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
| `acceptOffer` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `cancelOffer` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `init` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `offer` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `offeredTo` | (`overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `rejectOffer` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `sendTransaction` | (`to`: `string`, `data`: `BytesLike`, `value`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `supportsInterface` | (`interfaceId`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acceptOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `cancelOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `init` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `offer` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `offeredTo` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `rejectOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `sendTransaction` | (`to`: `string`, `data`: `BytesLike`, `value`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `supportsInterface` | (`interfaceId`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `TransactionSent` | (`data?`: `BytesLike`, `value?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], `Object`\> |
| `TransactionSent(bytes,uint256)` | (`data?`: `BytesLike`, `value?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], `Object`\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acceptOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `cancelOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `init` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `offer` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `offeredTo` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `rejectOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `sendTransaction` | (`to`: `string`, `data`: `BytesLike`, `value`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `supportsInterface` | (`interfaceId`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`OfferableIdentityInterface`](../interfaces/ethers_OfferableIdentity.OfferableIdentityInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acceptOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `cancelOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `init` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `offer` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `offeredTo` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `rejectOffer` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `sendTransaction` | (`to`: `string`, `data`: `BytesLike`, `value`: `BigNumberish`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `supportsInterface` | (`interfaceId`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### acceptOffer

▸ **acceptOffer**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### attach

▸ **attach**(`addressOrName`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.attach

___

### cancelOffer

▸ **cancelOffer**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.connect

___

### deployed

▸ **deployed**(): `Promise`<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Returns

`Promise`<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Overrides

BaseContract.deployed

___

### init

▸ **init**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

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

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

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

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.off

___

### offer

▸ **offer**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### offeredTo

▸ **offeredTo**(`overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

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

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

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

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.once

___

### owner

▸ **owner**(`overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
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

### rejectOffer

▸ **rejectOffer**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### removeAllListeners

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

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

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

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

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Overrides

BaseContract.removeListener

___

### sendTransaction

▸ **sendTransaction**(`to`, `data`, `value`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `string` |
| `data` | `BytesLike` |
| `value` | `BigNumberish` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### supportsInterface

▸ **supportsInterface**(`interfaceId`, `overrides?`): `Promise`<`boolean`\>

See {IERC165-supportsInterface}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `interfaceId` | `BytesLike` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>
