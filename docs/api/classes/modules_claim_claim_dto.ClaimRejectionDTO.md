# Class: ClaimRejectionDTO

[modules/claim/claim.dto](../modules/modules_claim_claim_dto.md).ClaimRejectionDTO

## Implements

- [`IClaimRejection`](../interfaces/modules_claim_claim_types.IClaimRejection.md)

## Table of contents

### Constructors

- [constructor](modules_claim_claim_dto.ClaimRejectionDTO.md#constructor)

### Properties

- [claimIssuer](modules_claim_claim_dto.ClaimRejectionDTO.md#claimissuer)
- [id](modules_claim_claim_dto.ClaimRejectionDTO.md#id)
- [isRejected](modules_claim_claim_dto.ClaimRejectionDTO.md#isrejected)
- [rejectionReason](modules_claim_claim_dto.ClaimRejectionDTO.md#rejectionreason)
- [requester](modules_claim_claim_dto.ClaimRejectionDTO.md#requester)

### Methods

- [create](modules_claim_claim_dto.ClaimRejectionDTO.md#create)

## Constructors

### constructor

• **new ClaimRejectionDTO**()

## Properties

### claimIssuer

• **claimIssuer**: `string`[]

#### Implementation of

[IClaimRejection](../interfaces/modules_claim_claim_types.IClaimRejection.md).[claimIssuer](../interfaces/modules_claim_claim_types.IClaimRejection.md#claimissuer)

___

### id

• **id**: `string`

#### Implementation of

[IClaimRejection](../interfaces/modules_claim_claim_types.IClaimRejection.md).[id](../interfaces/modules_claim_claim_types.IClaimRejection.md#id)

___

### isRejected

• **isRejected**: `boolean`

#### Implementation of

[IClaimRejection](../interfaces/modules_claim_claim_types.IClaimRejection.md).[isRejected](../interfaces/modules_claim_claim_types.IClaimRejection.md#isrejected)

___

### rejectionReason

• `Optional` **rejectionReason**: `string`

___

### requester

• **requester**: `string`

#### Implementation of

[IClaimRejection](../interfaces/modules_claim_claim_types.IClaimRejection.md).[requester](../interfaces/modules_claim_claim_types.IClaimRejection.md#requester)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ClaimRejectionDTO`](modules_claim_claim_dto.ClaimRejectionDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ClaimRejectionDTO`](modules_claim_claim_dto.ClaimRejectionDTO.md)\> |

#### Returns

`Promise`<[`ClaimRejectionDTO`](modules_claim_claim_dto.ClaimRejectionDTO.md)\>
