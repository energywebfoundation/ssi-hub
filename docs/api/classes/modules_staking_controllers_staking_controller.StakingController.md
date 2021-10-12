# Class: StakingController

[modules/staking/controllers/staking.controller](../modules/modules_staking_controllers_staking_controller.md).StakingController

## Table of contents

### Constructors

- [constructor](modules_staking_controllers_staking_controller.StakingController.md#constructor)

### Methods

- [createTerms](modules_staking_controllers_staking_controller.StakingController.md#createterms)
- [getTerms](modules_staking_controllers_staking_controller.StakingController.md#getterms)

## Constructors

### constructor

• **new StakingController**(`stakingService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakingService` | [`StakingService`](modules_staking_staking_service.StakingService.md) |

## Methods

### createTerms

▸ **createTerms**(`data`): `Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`StakingTermsDTO`](modules_staking_dtos_staking_terms_dto.StakingTermsDTO.md) |

#### Returns

`Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

___

### getTerms

▸ **getTerms**(): `Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>

#### Returns

`Promise`<[`StakingTerms`](modules_staking_entities_staking_terms_entity.StakingTerms.md)\>
