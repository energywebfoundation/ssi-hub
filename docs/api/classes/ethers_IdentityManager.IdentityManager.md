# Class: IdentityManager

[ethers/IdentityManager](../modules/ethers_IdentityManager.md).IdentityManager

## Hierarchy

- `BaseContract`

  ↳ **`IdentityManager`**

## Table of contents

### Constructors

- [constructor](ethers_IdentityManager.IdentityManager.md#constructor)

### Properties

- [callStatic](ethers_IdentityManager.IdentityManager.md#callstatic)
- [estimateGas](ethers_IdentityManager.IdentityManager.md#estimategas)
- [filters](ethers_IdentityManager.IdentityManager.md#filters)
- [functions](ethers_IdentityManager.IdentityManager.md#functions)
- [interface](ethers_IdentityManager.IdentityManager.md#interface)
- [populateTransaction](ethers_IdentityManager.IdentityManager.md#populatetransaction)

### Methods

- [attach](ethers_IdentityManager.IdentityManager.md#attach)
- [compliant](ethers_IdentityManager.IdentityManager.md#compliant)
- [connect](ethers_IdentityManager.IdentityManager.md#connect)
- [createIdentity](ethers_IdentityManager.IdentityManager.md#createidentity)
- [deployed](ethers_IdentityManager.IdentityManager.md#deployed)
- [identityAccepted](ethers_IdentityManager.IdentityManager.md#identityaccepted)
- [identityCreated](ethers_IdentityManager.IdentityManager.md#identitycreated)
- [identityOfferCanceled](ethers_IdentityManager.IdentityManager.md#identityoffercanceled)
- [identityOffered](ethers_IdentityManager.IdentityManager.md#identityoffered)
- [identityOwner](ethers_IdentityManager.IdentityManager.md#identityowner)
- [identityRejected](ethers_IdentityManager.IdentityManager.md#identityrejected)
- [listeners](ethers_IdentityManager.IdentityManager.md#listeners)
- [off](ethers_IdentityManager.IdentityManager.md#off)
- [on](ethers_IdentityManager.IdentityManager.md#on)
- [once](ethers_IdentityManager.IdentityManager.md#once)
- [queryFilter](ethers_IdentityManager.IdentityManager.md#queryfilter)
- [removeAllListeners](ethers_IdentityManager.IdentityManager.md#removealllisteners)
- [removeListener](ethers_IdentityManager.IdentityManager.md#removelistener)
- [verified](ethers_IdentityManager.IdentityManager.md#verified)

## Constructors

### constructor

• **new IdentityManager**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

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
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `IdentityCreated` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |
| `IdentityCreated(address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOfferCanceled` | (`identity?`: `string`, `owner?`: `string`, `oferedto?`: ``null``, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOfferCanceled(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `oferedto?`: ``null``, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOfferRejected` | (`identity?`: `string`, `owner?`: ``null``, `offeredTo?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOfferRejected(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: ``null``, `offeredTo?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOffered` | (`identity?`: `string`, `owner?`: `string`, `offeredTo?`: ``null``, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityOffered(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `offeredTo?`: ``null``, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `BigNumber`], `Object`\> |
| `IdentityTransferred` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |
| `IdentityTransferred(address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `BigNumber`], `Object`\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`IdentityManagerInterface`](../interfaces/ethers_IdentityManager.IdentityManagerInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### attach

▸ **attach**(`addressOrName`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.attach

___

### compliant

▸ **compliant**(`identity`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.connect

___

### createIdentity

▸ **createIdentity**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### deployed

▸ **deployed**(): `Promise`<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Returns

`Promise`<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.deployed

___

### identityAccepted

▸ **identityAccepted**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityCreated

▸ **identityCreated**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityOfferCanceled

▸ **identityOfferCanceled**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityOffered

▸ **identityOffered**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

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

### identityRejected

▸ **identityRejected**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
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

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

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

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

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

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

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

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.once

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

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

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

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

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

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeListener

___

### verified

▸ **verified**(`identity`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>
