# Class: StakingService

[modules/staking/staking.service](../modules/modules_staking_staking_service.md).StakingService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_staking_staking_service.StakingService.md#constructor)

### Methods

- [getTerms](modules_staking_staking_service.StakingService.md#getterms)
- [onModuleDestroy](modules_staking_staking_service.StakingService.md#onmoduledestroy)
- [saveStakingPool](modules_staking_staking_service.StakingService.md#savestakingpool)
- [saveTerms](modules_staking_staking_service.StakingService.md#saveterms)

## Constructors

### constructor

• **new StakingService**(`stakingTermsRepository`, `stakingPoolRepository`, `logger`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakingTermsRepository` | `Repository`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\> |
| `stakingPoolRepository` | `Repository`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `provider` | [`Provider`](common_provider.Provider.md) |

## Methods

### getTerms

▸ **getTerms**(): `Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

#### Returns

`Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

___

### onModuleDestroy

▸ **onModuleDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnModuleDestroy.onModuleDestroy

___

### saveStakingPool

▸ **saveStakingPool**(`address`): `Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

___

### saveTerms

▸ **saveTerms**(`stakeTerms`): `Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakeTerms` | `Partial`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\> |

#### Returns

`Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>
