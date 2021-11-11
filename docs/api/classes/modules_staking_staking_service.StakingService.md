# Class: StakingService

[modules/staking/staking.service](../modules/modules_staking_staking_service.md).StakingService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_staking_staking_service.StakingService.md#constructor)

### Methods

- [getPool](modules_staking_staking_service.StakingService.md#getpool)
- [getTerms](modules_staking_staking_service.StakingService.md#getterms)
- [onModuleDestroy](modules_staking_staking_service.StakingService.md#onmoduledestroy)
- [saveTerms](modules_staking_staking_service.StakingService.md#saveterms)
- [syncPool](modules_staking_staking_service.StakingService.md#syncpool)

## Constructors

### constructor

• **new StakingService**(`stakingTermsRepository`, `stakingPoolRepository`, `roleService`, `orgService`, `logger`, `provider`, `config`, `schedulerRegistry`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakingTermsRepository` | `Repository`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\> |
| `stakingPoolRepository` | `Repository`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\> |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `orgService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>\> |
| `schedulerRegistry` | `SchedulerRegistry` |

## Methods

### getPool

▸ **getPool**(`id`): `Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

___

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

### saveTerms

▸ **saveTerms**(`stakeTerms`): `Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakeTerms` | `Partial`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\> |

#### Returns

`Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

___

### syncPool

▸ **syncPool**(`address`): `Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>
