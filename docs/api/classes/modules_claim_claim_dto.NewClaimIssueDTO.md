# Class: NewClaimIssueDTO

[modules/claim/claim.dto](../modules/modules_claim_claim_dto.md).NewClaimIssueDTO

## Hierarchy

- [`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)

  ↳ **`NewClaimIssueDTO`**

## Table of contents

### Constructors

- [constructor](modules_claim_claim_dto.NewClaimIssueDTO.md#constructor)

### Properties

- [acceptedBy](modules_claim_claim_dto.NewClaimIssueDTO.md#acceptedby)
- [claimIssuer](modules_claim_claim_dto.NewClaimIssueDTO.md#claimissuer)
- [claimType](modules_claim_claim_dto.NewClaimIssueDTO.md#claimtype)
- [claimTypeVersion](modules_claim_claim_dto.NewClaimIssueDTO.md#claimtypeversion)
- [id](modules_claim_claim_dto.NewClaimIssueDTO.md#id)
- [issuedToken](modules_claim_claim_dto.NewClaimIssueDTO.md#issuedtoken)
- [onChainProof](modules_claim_claim_dto.NewClaimIssueDTO.md#onchainproof)
- [registrationTypes](modules_claim_claim_dto.NewClaimIssueDTO.md#registrationtypes)
- [requester](modules_claim_claim_dto.NewClaimIssueDTO.md#requester)
- [vp](modules_claim_claim_dto.NewClaimIssueDTO.md#vp)

### Methods

- [create](modules_claim_claim_dto.NewClaimIssueDTO.md#create)

## Constructors

### constructor

• **new NewClaimIssueDTO**()

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[constructor](modules_claim_claim_dto.ClaimIssueDTO.md#constructor)

## Properties

### acceptedBy

• **acceptedBy**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[acceptedBy](modules_claim_claim_dto.ClaimIssueDTO.md#acceptedby)

___

### claimIssuer

• `Optional` **claimIssuer**: `string`

___

### claimType

• **claimType**: `string`

#### Overrides

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[claimType](modules_claim_claim_dto.ClaimIssueDTO.md#claimtype)

___

### claimTypeVersion

• **claimTypeVersion**: `string`

#### Overrides

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[claimTypeVersion](modules_claim_claim_dto.ClaimIssueDTO.md#claimtypeversion)

___

### id

• **id**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[id](modules_claim_claim_dto.ClaimIssueDTO.md#id)

___

### issuedToken

• `Optional` **issuedToken**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[issuedToken](modules_claim_claim_dto.ClaimIssueDTO.md#issuedtoken)

___

### onChainProof

• `Optional` **onChainProof**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[onChainProof](modules_claim_claim_dto.ClaimIssueDTO.md#onchainproof)

___

### registrationTypes

• **registrationTypes**: [[`RegistrationTypes`](../enums/modules_claim_claim_types.RegistrationTypes.md), RegistrationTypes?]

___

### requester

• **requester**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[requester](modules_claim_claim_dto.ClaimIssueDTO.md#requester)

___

### vp

• `Optional` **vp**: `string`

#### Inherited from

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[vp](modules_claim_claim_dto.ClaimIssueDTO.md#vp)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`NewClaimIssueDTO`](modules_claim_claim_dto.NewClaimIssueDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`NewClaimIssueDTO`](modules_claim_claim_dto.NewClaimIssueDTO.md)\> |

#### Returns

`Promise`<[`NewClaimIssueDTO`](modules_claim_claim_dto.NewClaimIssueDTO.md)\>

#### Overrides

[ClaimIssueDTO](modules_claim_claim_dto.ClaimIssueDTO.md).[create](modules_claim_claim_dto.ClaimIssueDTO.md#create)
