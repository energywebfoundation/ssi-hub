# Interface: DomainNotifier

[ethers/DomainNotifier](../modules/ethers_DomainNotifier.md).DomainNotifier

## Hierarchy

- `BaseContract`

  ↳ **`DomainNotifier`**

## Table of contents

### Properties

- [callStatic](ethers_DomainNotifier.DomainNotifier.md#callstatic)
- [contractName](ethers_DomainNotifier.DomainNotifier.md#contractname)
- [estimateGas](ethers_DomainNotifier.DomainNotifier.md#estimategas)
- [filters](ethers_DomainNotifier.DomainNotifier.md#filters)
- [functions](ethers_DomainNotifier.DomainNotifier.md#functions)
- [interface](ethers_DomainNotifier.DomainNotifier.md#interface)
- [off](ethers_DomainNotifier.DomainNotifier.md#off)
- [on](ethers_DomainNotifier.DomainNotifier.md#on)
- [once](ethers_DomainNotifier.DomainNotifier.md#once)
- [populateTransaction](ethers_DomainNotifier.DomainNotifier.md#populatetransaction)
- [removeListener](ethers_DomainNotifier.DomainNotifier.md#removelistener)

### Methods

- [attach](ethers_DomainNotifier.DomainNotifier.md#attach)
- [connect](ethers_DomainNotifier.DomainNotifier.md#connect)
- [deployed](ethers_DomainNotifier.DomainNotifier.md#deployed)
- [domainUpdated](ethers_DomainNotifier.DomainNotifier.md#domainupdated)
- [listeners](ethers_DomainNotifier.DomainNotifier.md#listeners)
- [queryFilter](ethers_DomainNotifier.DomainNotifier.md#queryfilter)
- [removeAllListeners](ethers_DomainNotifier.DomainNotifier.md#removealllisteners)

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

### contractName

• **contractName**: ``"DomainNotifier"``

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
| `DomainUpdated` | (`node?`: `BytesLike`) => [`DomainUpdatedEventFilter`](../modules/ethers_DomainNotifier.md#domainupdatedeventfilter) |
| `DomainUpdated(bytes32)` | (`node?`: `BytesLike`) => [`DomainUpdatedEventFilter`](../modules/ethers_DomainNotifier.md#domainupdatedeventfilter) |

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

• **interface**: [`DomainNotifierInterface`](ethers_DomainNotifier.DomainNotifierInterface.md)

#### Overrides

BaseContract.interface

___

### off

• **off**: [`OnEvent`](ethers_common.OnEvent.md)<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

BaseContract.off

___

### on

• **on**: [`OnEvent`](ethers_common.OnEvent.md)<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

BaseContract.on

___

### once

• **once**: [`OnEvent`](ethers_common.OnEvent.md)<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

BaseContract.once

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domainUpdated` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

___

### removeListener

• **removeListener**: [`OnEvent`](ethers_common.OnEvent.md)<[`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

BaseContract.removeListener

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

▸ **removeAllListeners**<`TEvent`\>(`eventFilter`): [`DomainNotifier`](ethers_DomainNotifier.DomainNotifier.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

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
