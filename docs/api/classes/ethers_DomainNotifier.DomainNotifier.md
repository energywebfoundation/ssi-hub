# Class: DomainNotifier

[ethers/DomainNotifier](../modules/ethers_DomainNotifier.md).DomainNotifier

## Hierarchy

- `BaseContract`

  ↳ **`DomainNotifier`**

## Table of contents

### Constructors

- [constructor](ethers_DomainNotifier.DomainNotifier.md#constructor)

### Properties

- [callStatic](ethers_DomainNotifier.DomainNotifier.md#callstatic)
- [estimateGas](ethers_DomainNotifier.DomainNotifier.md#estimategas)
- [filters](ethers_DomainNotifier.DomainNotifier.md#filters)
- [functions](ethers_DomainNotifier.DomainNotifier.md#functions)
- [interface](ethers_DomainNotifier.DomainNotifier.md#interface)
- [populateTransaction](ethers_DomainNotifier.DomainNotifier.md#populatetransaction)

### Methods

- [attach](ethers_DomainNotifier.DomainNotifier.md#attach)
- [connect](ethers_DomainNotifier.DomainNotifier.md#connect)
- [deployed](ethers_DomainNotifier.DomainNotifier.md#deployed)
- [domainUpdated](ethers_DomainNotifier.DomainNotifier.md#domainupdated)
- [listeners](ethers_DomainNotifier.DomainNotifier.md#listeners)
- [off](ethers_DomainNotifier.DomainNotifier.md#off)
- [on](ethers_DomainNotifier.DomainNotifier.md#on)
- [once](ethers_DomainNotifier.DomainNotifier.md#once)
- [queryFilter](ethers_DomainNotifier.DomainNotifier.md#queryfilter)
- [removeAllListeners](ethers_DomainNotifier.DomainNotifier.md#removealllisteners)
- [removeListener](ethers_DomainNotifier.DomainNotifier.md#removelistener)

## Constructors

### constructor

• **new DomainNotifier**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

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
| `domainUpdated` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DomainUpdated` | (`node?`: `BytesLike`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`], `Object`\> |
| `DomainUpdated(bytes32)` | (`node?`: `BytesLike`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`], `Object`\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`DomainNotifierInterface`](../interfaces/ethers_DomainNotifier.DomainNotifierInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### attach

▸ **attach**(`addressOrName`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.attach

___

### connect

▸ **connect**(`signerOrProvider`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.connect

___

### deployed

▸ **deployed**(): `Promise`<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Returns

`Promise`<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

BaseContract.deployed

___

### domainUpdated

▸ **domainUpdated**(`node`, `overrides?`): `Promise`<`ContractTransaction`\>

Notifies of a domain/namespace's resolver data update. Only the resolver that is set for a given node should be able to trigger the notification

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `BytesLike` |
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

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

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

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

BaseContract.removeListener
