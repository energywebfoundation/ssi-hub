# Class: StakingPool

[ethers/StakingPool](../modules/ethers_StakingPool.md).StakingPool

## Hierarchy

- `BaseContract`

  ↳ **`StakingPool`**

## Table of contents

### Constructors

- [constructor](ethers_StakingPool.StakingPool.md#constructor)

### Properties

- [callStatic](ethers_StakingPool.StakingPool.md#callstatic)
- [estimateGas](ethers_StakingPool.StakingPool.md#estimategas)
- [filters](ethers_StakingPool.StakingPool.md#filters)
- [functions](ethers_StakingPool.StakingPool.md#functions)
- [interface](ethers_StakingPool.StakingPool.md#interface)
- [populateTransaction](ethers_StakingPool.StakingPool.md#populatetransaction)

### Methods

- [attach](ethers_StakingPool.StakingPool.md#attach)
- [checkReward](ethers_StakingPool.StakingPool.md#checkreward)
- [connect](ethers_StakingPool.StakingPool.md#connect)
- [deployed](ethers_StakingPool.StakingPool.md#deployed)
- [listeners](ethers_StakingPool.StakingPool.md#listeners)
- [minStakingPeriod](ethers_StakingPool.StakingPool.md#minstakingperiod)
- [off](ethers_StakingPool.StakingPool.md#off)
- [on](ethers_StakingPool.StakingPool.md#on)
- [once](ethers_StakingPool.StakingPool.md#once)
- [putStake](ethers_StakingPool.StakingPool.md#putstake)
- [queryFilter](ethers_StakingPool.StakingPool.md#queryfilter)
- [removeAllListeners](ethers_StakingPool.StakingPool.md#removealllisteners)
- [removeListener](ethers_StakingPool.StakingPool.md#removelistener)
- [requestWithdraw](ethers_StakingPool.StakingPool.md#requestwithdraw)
- [stakes](ethers_StakingPool.StakingPool.md#stakes)
- [totalStake](ethers_StakingPool.StakingPool.md#totalstake)
- [withdraw](ethers_StakingPool.StakingPool.md#withdraw)
- [withdrawDelay](ethers_StakingPool.StakingPool.md#withdrawdelay)

## Constructors

### constructor

• **new StakingPool**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

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
| `checkReward` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `minStakingPeriod` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `putStake` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `requestWithdraw` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `stakes` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`, `BigNumber`, `BigNumber`, `number`] & { `amount`: `BigNumber` ; `depositEnd`: `BigNumber` ; `depositStart`: `BigNumber` ; `status`: `number`  }\> |
| `totalStake` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `withdraw` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `withdrawDelay` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkReward` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `minStakingPeriod` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `putStake` | (`overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `requestWithdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `stakes` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `totalStake` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `withdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `withdrawDelay` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `StakePut` | (`patron?`: `string`, `amount?`: `BigNumberish`, `timestamp?`: `BigNumberish`) => `any` |
| `StakePut(address,uint256,uint256)` | (`patron?`: `string`, `amount?`: `BigNumberish`, `timestamp?`: `BigNumberish`) => `any` |
| `StakeWithdrawalRequested` | (`patron?`: `string`, `timestamp?`: `BigNumberish`) => `any` |
| `StakeWithdrawalRequested(address,uint256)` | (`patron?`: `string`, `timestamp?`: `BigNumberish`) => `any` |
| `StakeWithdrawn` | (`patron?`: `string`, `timestamp?`: `BigNumberish`) => `any` |
| `StakeWithdrawn(address,uint256)` | (`patron?`: `string`, `timestamp?`: `BigNumberish`) => `any` |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkReward` | (`overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`] & { `reward`: `BigNumber`  }\> |
| `minStakingPeriod` | (`overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |
| `putStake` | (`overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `requestWithdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `stakes` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`, `BigNumber`, `BigNumber`, `number`] & { `amount`: `BigNumber` ; `depositEnd`: `BigNumber` ; `depositStart`: `BigNumber` ; `status`: `number`  }\> |
| `totalStake` | (`overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |
| `withdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `withdrawDelay` | (`overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`StakingPoolInterface`](../interfaces/ethers_StakingPool.StakingPoolInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkReward` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `minStakingPeriod` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `putStake` | (`overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `requestWithdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `stakes` | (`arg0`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `totalStake` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `withdraw` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `withdrawDelay` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### attach

▸ **attach**(`addressOrName`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.attach

___

### checkReward

▸ **checkReward**(`overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.connect

___

### deployed

▸ **deployed**(): `Promise`<[`StakingPool`](ethers_StakingPool.StakingPool.md)\>

#### Returns

`Promise`<[`StakingPool`](ethers_StakingPool.StakingPool.md)\>

#### Overrides

BaseContract.deployed

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

### minStakingPeriod

▸ **minStakingPeriod**(`overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### off

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

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

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

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

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

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

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.once

___

### putStake

▸ **putStake**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

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

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

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

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

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

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`StakingPool`](ethers_StakingPool.StakingPool.md)

#### Overrides

BaseContract.removeListener

___

### requestWithdraw

▸ **requestWithdraw**(`overrides?`): `Promise`<`ContractTransaction`\>

stops staking and notifies reward pool

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### stakes

▸ **stakes**(`arg0`, `overrides?`): `Promise`<[`BigNumber`, `BigNumber`, `BigNumber`, `number`] & { `amount`: `BigNumber` ; `depositEnd`: `BigNumber` ; `depositStart`: `BigNumber` ; `status`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<[`BigNumber`, `BigNumber`, `BigNumber`, `number`] & { `amount`: `BigNumber` ; `depositEnd`: `BigNumber` ; `depositStart`: `BigNumber` ; `status`: `number`  }\>

___

### totalStake

▸ **totalStake**(`overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>

___

### withdraw

▸ **withdraw**(`overrides?`): `Promise`<`ContractTransaction`\>

invoked after expiring of withdraw delay

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### withdrawDelay

▸ **withdrawDelay**(`overrides?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`BigNumber`\>
