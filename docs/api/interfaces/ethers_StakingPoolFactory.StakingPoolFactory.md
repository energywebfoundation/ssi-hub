# Interface: StakingPoolFactory

[ethers/StakingPoolFactory](../modules/ethers_StakingPoolFactory.md).StakingPoolFactory

## Hierarchy

- `BaseContract`

  ↳ **`StakingPoolFactory`**

## Table of contents

### Properties

- [callStatic](ethers_StakingPoolFactory.StakingPoolFactory.md#callstatic)
- [contractName](ethers_StakingPoolFactory.StakingPoolFactory.md#contractname)
- [estimateGas](ethers_StakingPoolFactory.StakingPoolFactory.md#estimategas)
- [filters](ethers_StakingPoolFactory.StakingPoolFactory.md#filters)
- [functions](ethers_StakingPoolFactory.StakingPoolFactory.md#functions)
- [interface](ethers_StakingPoolFactory.StakingPoolFactory.md#interface)
- [off](ethers_StakingPoolFactory.StakingPoolFactory.md#off)
- [on](ethers_StakingPoolFactory.StakingPoolFactory.md#on)
- [once](ethers_StakingPoolFactory.StakingPoolFactory.md#once)
- [populateTransaction](ethers_StakingPoolFactory.StakingPoolFactory.md#populatetransaction)
- [removeListener](ethers_StakingPoolFactory.StakingPoolFactory.md#removelistener)

### Methods

- [attach](ethers_StakingPoolFactory.StakingPoolFactory.md#attach)
- [connect](ethers_StakingPoolFactory.StakingPoolFactory.md#connect)
- [deployed](ethers_StakingPoolFactory.StakingPoolFactory.md#deployed)
- [isPool](ethers_StakingPoolFactory.StakingPoolFactory.md#ispool)
- [launchStakingPool](ethers_StakingPoolFactory.StakingPoolFactory.md#launchstakingpool)
- [listeners](ethers_StakingPoolFactory.StakingPoolFactory.md#listeners)
- [orgsList](ethers_StakingPoolFactory.StakingPoolFactory.md#orgslist)
- [queryFilter](ethers_StakingPoolFactory.StakingPoolFactory.md#queryfilter)
- [removeAllListeners](ethers_StakingPoolFactory.StakingPoolFactory.md#removealllisteners)
- [rewardPool](ethers_StakingPoolFactory.StakingPoolFactory.md#rewardpool)
- [services](ethers_StakingPoolFactory.StakingPoolFactory.md#services)

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

### contractName

• **contractName**: ``"StakingPoolFactory"``

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
| `StakingPoolLaunched` | (`org?`: `BytesLike`, `pool?`: `string`) => [`StakingPoolLaunchedEventFilter`](../modules/ethers_StakingPoolFactory.md#stakingpoollaunchedeventfilter) |
| `StakingPoolLaunched(bytes32,address)` | (`org?`: `BytesLike`, `pool?`: `string`) => [`StakingPoolLaunchedEventFilter`](../modules/ethers_StakingPoolFactory.md#stakingpoollaunchedeventfilter) |

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

• **interface**: [`StakingPoolFactoryInterface`](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md)

#### Overrides

BaseContract.interface

___

### off

• **off**: [`OnEvent`](ethers_common.OnEvent.md)<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Overrides

BaseContract.off

___

### on

• **on**: [`OnEvent`](ethers_common.OnEvent.md)<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Overrides

BaseContract.on

___

### once

• **once**: [`OnEvent`](ethers_common.OnEvent.md)<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Overrides

BaseContract.once

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

___

### removeListener

• **removeListener**: [`OnEvent`](ethers_common.OnEvent.md)<[`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)\>

#### Overrides

BaseContract.removeListener

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

▸ **removeAllListeners**<`TEvent`\>(`eventFilter`): [`StakingPoolFactory`](ethers_StakingPoolFactory.StakingPoolFactory.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

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
