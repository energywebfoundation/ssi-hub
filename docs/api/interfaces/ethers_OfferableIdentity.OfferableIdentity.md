# Interface: OfferableIdentity

[ethers/OfferableIdentity](../modules/ethers_OfferableIdentity.md).OfferableIdentity

## Hierarchy

- `BaseContract`

  ↳ **`OfferableIdentity`**

## Table of contents

### Properties

- [callStatic](ethers_OfferableIdentity.OfferableIdentity.md#callstatic)
- [contractName](ethers_OfferableIdentity.OfferableIdentity.md#contractname)
- [estimateGas](ethers_OfferableIdentity.OfferableIdentity.md#estimategas)
- [filters](ethers_OfferableIdentity.OfferableIdentity.md#filters)
- [functions](ethers_OfferableIdentity.OfferableIdentity.md#functions)
- [interface](ethers_OfferableIdentity.OfferableIdentity.md#interface)
- [off](ethers_OfferableIdentity.OfferableIdentity.md#off)
- [on](ethers_OfferableIdentity.OfferableIdentity.md#on)
- [once](ethers_OfferableIdentity.OfferableIdentity.md#once)
- [populateTransaction](ethers_OfferableIdentity.OfferableIdentity.md#populatetransaction)
- [removeListener](ethers_OfferableIdentity.OfferableIdentity.md#removelistener)

### Methods

- [acceptOffer](ethers_OfferableIdentity.OfferableIdentity.md#acceptoffer)
- [attach](ethers_OfferableIdentity.OfferableIdentity.md#attach)
- [cancelOffer](ethers_OfferableIdentity.OfferableIdentity.md#canceloffer)
- [connect](ethers_OfferableIdentity.OfferableIdentity.md#connect)
- [deployed](ethers_OfferableIdentity.OfferableIdentity.md#deployed)
- [init](ethers_OfferableIdentity.OfferableIdentity.md#init)
- [listeners](ethers_OfferableIdentity.OfferableIdentity.md#listeners)
- [offer](ethers_OfferableIdentity.OfferableIdentity.md#offer)
- [offeredTo](ethers_OfferableIdentity.OfferableIdentity.md#offeredto)
- [owner](ethers_OfferableIdentity.OfferableIdentity.md#owner)
- [queryFilter](ethers_OfferableIdentity.OfferableIdentity.md#queryfilter)
- [rejectOffer](ethers_OfferableIdentity.OfferableIdentity.md#rejectoffer)
- [removeAllListeners](ethers_OfferableIdentity.OfferableIdentity.md#removealllisteners)
- [sendTransaction](ethers_OfferableIdentity.OfferableIdentity.md#sendtransaction)
- [supportsInterface](ethers_OfferableIdentity.OfferableIdentity.md#supportsinterface)

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

### contractName

• **contractName**: ``"OfferableIdentity"``

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
| `TransactionSent` | (`data?`: `BytesLike`, `value?`: `BigNumberish`) => [`TransactionSentEventFilter`](../modules/ethers_OfferableIdentity.md#transactionsenteventfilter) |
| `TransactionSent(bytes,uint256)` | (`data?`: `BytesLike`, `value?`: `BigNumberish`) => [`TransactionSentEventFilter`](../modules/ethers_OfferableIdentity.md#transactionsenteventfilter) |

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

• **interface**: [`OfferableIdentityInterface`](ethers_OfferableIdentity.OfferableIdentityInterface.md)

#### Overrides

BaseContract.interface

___

### off

• **off**: [`OnEvent`](ethers_common.OnEvent.md)<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Overrides

BaseContract.off

___

### on

• **on**: [`OnEvent`](ethers_common.OnEvent.md)<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Overrides

BaseContract.on

___

### once

• **once**: [`OnEvent`](ethers_common.OnEvent.md)<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Overrides

BaseContract.once

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

___

### removeListener

• **removeListener**: [`OnEvent`](ethers_common.OnEvent.md)<[`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)\>

#### Overrides

BaseContract.removeListener

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

▸ **removeAllListeners**<`TEvent`\>(`eventFilter`): [`OfferableIdentity`](ethers_OfferableIdentity.OfferableIdentity.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

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
