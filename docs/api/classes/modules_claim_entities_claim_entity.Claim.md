# Class: Claim

[modules/claim/entities/claim.entity](../modules/modules_claim_entities_claim_entity.md).Claim

## Implements

- [`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md)

## Table of contents

### Constructors

- [constructor](modules_claim_entities_claim_entity.Claim.md#constructor)

### Properties

- [id](modules_claim_entities_claim_entity.Claim.md#id)
- [issuedAt](modules_claim_entities_claim_entity.Claim.md#issuedat)
- [issuedToken](modules_claim_entities_claim_entity.Claim.md#issuedtoken)
- [subject](modules_claim_entities_claim_entity.Claim.md#subject)

### Methods

- [create](modules_claim_entities_claim_entity.Claim.md#create)

## Constructors

### constructor

• **new Claim**()

## Properties

### id

• **id**: `number`

___

### issuedAt

• **issuedAt**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[issuedAt](../interfaces/modules_claim_claim_types.IClaim.md#issuedat)

___

### issuedToken

• **issuedToken**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[issuedToken](../interfaces/modules_claim_claim_types.IClaim.md#issuedtoken)

___

### subject

• **subject**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[subject](../interfaces/modules_claim_claim_types.IClaim.md#subject)

## Methods

### create

▸ `Static` **create**(`data`): [`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md)\> |

#### Returns

[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md)
