# Class: ClaimRequestDTO

[modules/claim/claim.dto](../modules/modules_claim_claim_dto.md).ClaimRequestDTO

## Implements

- [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md)

## Table of contents

### Constructors

- [constructor](modules_claim_claim_dto.ClaimRequestDTO.md#constructor)

### Properties

- [claimType](modules_claim_claim_dto.ClaimRequestDTO.md#claimtype)
- [claimTypeVersion](modules_claim_claim_dto.ClaimRequestDTO.md#claimtypeversion)
- [id](modules_claim_claim_dto.ClaimRequestDTO.md#id)
- [registrationTypes](modules_claim_claim_dto.ClaimRequestDTO.md#registrationtypes)
- [requester](modules_claim_claim_dto.ClaimRequestDTO.md#requester)
- [subjectAgreement](modules_claim_claim_dto.ClaimRequestDTO.md#subjectagreement)
- [token](modules_claim_claim_dto.ClaimRequestDTO.md#token)

### Methods

- [create](modules_claim_claim_dto.ClaimRequestDTO.md#create)

## Constructors

### constructor

• **new ClaimRequestDTO**()

## Properties

### claimType

• **claimType**: `string`

#### Implementation of

[IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md).[claimType](../interfaces/modules_claim_claim_types.IClaimRequest.md#claimtype)

___

### claimTypeVersion

• **claimTypeVersion**: `string`

#### Implementation of

[IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md).[claimTypeVersion](../interfaces/modules_claim_claim_types.IClaimRequest.md#claimtypeversion)

___

### id

• **id**: `string`

#### Implementation of

[IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md).[id](../interfaces/modules_claim_claim_types.IClaimRequest.md#id)

___

### registrationTypes

• **registrationTypes**: [`RegistrationTypes`](../enums/modules_claim_claim_types.RegistrationTypes.md)[]

___

### requester

• **requester**: `string`

#### Implementation of

[IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md).[requester](../interfaces/modules_claim_claim_types.IClaimRequest.md#requester)

___

### subjectAgreement

• **subjectAgreement**: `string`

___

### token

• **token**: `string`

#### Implementation of

[IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md).[token](../interfaces/modules_claim_claim_types.IClaimRequest.md#token)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md)\> |

#### Returns

`Promise`<[`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md)\>
