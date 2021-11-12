# Class: StakingService

[modules/staking/staking.service](../modules/modules_staking_staking_service.md).StakingService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_staking_staking_service.StakingService.md#constructor)

### Methods

- [getPoolByAddress](modules_staking_staking_service.StakingService.md#getpoolbyaddress)
- [getPoolByOrg](modules_staking_staking_service.StakingService.md#getpoolbyorg)
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

### getPoolByAddress

▸ **getPoolByAddress**(`address`): `Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

___

### getPoolByOrg

▸ **getPoolByOrg**(`namespace`): `Promise`<[`StakingPool`](modules_staking_entities_staking_pool_entity.StakingPool.md)\>

**`description`** returns organization for which pool was launched

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

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

▸ **syncPool**(`address`): `Promise`<`void`\>

**`description`** pesists pool deployed on `address`. If pool wasn't deployed by registered staking pool factory
or organization for which pool launched not yet been synchronized pool synchronization will be skipped

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | address of deployed pool |

#### Returns

`Promise`<`void`\>
