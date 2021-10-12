# Interface: StakingPoolFactoryInterface

[ethers/StakingPoolFactory](../modules/ethers_StakingPoolFactory.md).StakingPoolFactoryInterface

## Hierarchy

- `Interface`

  ↳ **`StakingPoolFactoryInterface`**

## Table of contents

### Properties

- [events](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md#events)
- [functions](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md#encodefunctiondata)
- [getEvent](ethers_StakingPoolFactory.StakingPoolFactoryInterface.md#getevent)

## Properties

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `StakingPoolLaunched(bytes32,address)` | `any` |

#### Overrides

ethers.utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isPool(address)` | `any` |
| `launchStakingPool(bytes32,uint256,uint256,bytes32[])` | `any` |
| `orgsList()` | `any` |
| `rewardPool()` | `any` |
| `services(bytes32)` | `any` |

#### Overrides

ethers.utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"rewardPool"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"services"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"launchStakingPool"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"orgsList"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isPool"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"rewardPool"`` |
| `values?` | `undefined` |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"services"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"launchStakingPool"`` |
| `values` | [`BytesLike`, `BigNumberish`, `BigNumberish`, `BytesLike`[]] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"orgsList"`` |
| `values?` | `undefined` |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"isPool"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"StakingPoolLaunched"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent
