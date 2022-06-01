# Class: StakingPoolFactory

[ethers/StakingPoolFactory](../modules/ethers_StakingPoolFactory.md).StakingPoolFactory

## Hierarchy

- `BaseContract`

  ↳ **`StakingPoolFactory`**

## Table of contents

### Constructors

- [constructor](ethers_StakingPoolFactory.StakingPoolFactory.md#constructor)

### Properties

- [callStatic](ethers_StakingPoolFactory.StakingPoolFactory.md#callstatic)
- [estimateGas](ethers_StakingPoolFactory.StakingPoolFactory.md#estimategas)
- [filters](ethers_StakingPoolFactory.StakingPoolFactory.md#filters)
- [functions](ethers_StakingPoolFactory.StakingPoolFactory.md#functions)
- [interface](ethers_StakingPoolFactory.StakingPoolFactory.md#interface)
- [populateTransaction](ethers_StakingPoolFactory.StakingPoolFactory.md#populatetransaction)

### Methods

- [attach](ethers_StakingPoolFactory.StakingPoolFactory.md#attach)
- [connect](ethers_StakingPoolFactory.StakingPoolFactory.md#connect)
- [deployed](ethers_StakingPoolFactory.StakingPoolFactory.md#deployed)
- [isPool](ethers_StakingPoolFactory.StakingPoolFactory.md#ispool)
- [launchStakingPool](ethers_StakingPoolFactory.StakingPoolFactory.md#launchstakingpool)
- [listeners](ethers_StakingPoolFactory.StakingPoolFactory.md#listeners)
- [off](ethers_StakingPoolFactory.StakingPoolFactory.md#off)
- [on](ethers_StakingPoolFactory.StakingPoolFactory.md#on)
- [once](ethers_StakingPoolFactory.StakingPoolFactory.md#once)
- [orgsList](ethers_StakingPoolFactory.StakingPoolFactory.md#orgslist)
- [queryFilter](ethers_StakingPoolFactory.StakingPoolFactory.md#queryfilter)
- [removeAllListeners](ethers_StakingPoolFactory.StakingPoolFactory.md#removealllisteners)
- [removeListener](ethers_StakingPoolFactory.StakingPoolFactory.md#removelistener)
- [rewardPool](ethers_StakingPoolFactory.StakingPoolFactory.md#rewardpool)
- [services](ethers_StakingPoolFactory.StakingPoolFactory.md#services)

## Constructors

### constructor

• **new StakingPoolFactory**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

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
| `isPool` | (`pool`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `launchStakingPool` | (`org`: `BytesLike`, `minStakingPeriod`: `BigNumberish`, `patronRewardPortion`: `BigNumberish`, `patronRoles`: `BytesLike`[], `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `orgsList` | (`overrides?`: `CallOverrides`) => `Promise`<`string`[]\> |
| `rewardPool` | (`overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `services` | (`arg0`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`, `string`] & { `pool`: `string` ; `provider`: `string`  }\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isPool` | (`pool`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `launchStakingPool` | (`org`: `BytesLike`, `minStakingPeriod`: `BigNumberish`, `patronRewardPortion`: `BigNumberish`, `patronRoles`: `BytesLike`[], `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `orgsList` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `rewardPool` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `services` | (`arg0`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `StakingPoolLaunched` | (`org?`: `BytesLike`, `pool?`: `string`) => `any` |
| `StakingPoolLaunched(bytes32,address)` | (`org?`: `BytesLike`, `pool?`: `string`) => `any` |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isPool` | (`pool`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `launchStakingPool` | (`org`: `BytesLike`, `minStakingPeriod`: `BigNumberish`, `patronRewardPortion`: `BigNumberish`, `patronRoles`: `BytesLike`[], `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `orgsList` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`[]]\> |
| `rewardPool` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `services` | (`arg0`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`, `string`] & { `pool`: `string` ; `provider`: `string`  }\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`StakingPoolFactoryInterface`](../interfaces/ethers_StakingPoolFactory.StakingPoolFactoryInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isPool` | (`pool`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `launchStakingPool` | (`org`: `BytesLike`, `minStakingPeriod`: `BigNumberish`, `patronRewardPortion`: `BigNumberish`, `patronRoles`: `BytesLike`[], `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `orgsList` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `rewardPool` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `services` | (`arg0`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### attach

▸ **attach**(`addressOrName`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.attach

___

### connect

▸ **connect**(`signerOrProvider`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.connect

___

### deployed

▸ **deployed**(): `Promise`<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Returns

`Promise`<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Overrides

BaseContract.deployed

___

### isPool

▸ **isPool**(`pool`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### launchStakingPool

▸ **launchStakingPool**(`org`, `minStakingPeriod`, `patronRewardPortion`, `patronRoles`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `org` | `BytesLike` |
| `minStakingPeriod` | `BigNumberish` |
| `patronRewardPortion` | `BigNumberish` |
| `patronRoles` | `BytesLike`[] |
| `overrides?` | `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### listeners

▸ **listeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter?`): `any`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | `any` |

#### Returns

`any`[]

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

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | `any` |
| `listener` | `any` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | `any` |
| `listener` | `any` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | `any` |
| `listener` | `any` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.once

___

### orgsList

▸ **orgsList**(`overrides?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`[]\>

___

### queryFilter

▸ **queryFilter**<`EventArgsArray`, `EventArgsObject`\>(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`, `any`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |
| `fromBlockOrBlockhash?` | `string` \| `number` |
| `toBlock?` | `string` \| `number` |

#### Returns

`Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`, `any`\>[]\>

#### Overrides

BaseContract.queryFilter

___

### removeAllListeners

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | `any` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | `any` |
| `listener` | `any` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Overrides

BaseContract.removeListener

___

### rewardPool

▸ **rewardPool**(`overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

___

### services

▸ **services**(`arg0`, `overrides?`): `Promise`<[`string`, `string`] & { `pool`: `string` ; `provider`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `BytesLike` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<[`string`, `string`] & { `pool`: `string` ; `provider`: `string`  }\>
