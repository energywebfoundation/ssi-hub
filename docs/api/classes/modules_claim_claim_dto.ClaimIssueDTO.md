# Class: ClaimIssueDTO

[modules/claim/claim.dto](../modules/modules_claim_claim_dto.md).ClaimIssueDTO

## Hierarchy

- **`ClaimIssueDTO`**

  ↳ [`NewClaimIssueDTO`](modules_claim_claim_dto.NewClaimIssueDTO.md)

## Implements

- [`IClaimIssuance`](../interfaces/modules_claim_claim_types.IClaimIssuance.md)

## Table of contents

### Constructors

- [constructor](modules_claim_claim_dto.ClaimIssueDTO.md#constructor)

### Properties

- [acceptedBy](modules_claim_claim_dto.ClaimIssueDTO.md#acceptedby)
- [claimType](modules_claim_claim_dto.ClaimIssueDTO.md#claimtype)
- [claimTypeVersion](modules_claim_claim_dto.ClaimIssueDTO.md#claimtypeversion)
- [expirationTimestamp](modules_claim_claim_dto.ClaimIssueDTO.md#expirationtimestamp)
- [id](modules_claim_claim_dto.ClaimIssueDTO.md#id)
- [issuedToken](modules_claim_claim_dto.ClaimIssueDTO.md#issuedtoken)
- [onChainProof](modules_claim_claim_dto.ClaimIssueDTO.md#onchainproof)
- [requester](modules_claim_claim_dto.ClaimIssueDTO.md#requester)
- [vp](modules_claim_claim_dto.ClaimIssueDTO.md#vp)

### Methods

- [create](modules_claim_claim_dto.ClaimIssueDTO.md#create)

## Constructors

### constructor

• **new ClaimIssueDTO**()

## Properties

### acceptedBy

• **acceptedBy**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[acceptedBy](../interfaces/modules_claim_claim_types.IClaimIssuance.md#acceptedby)

___

### claimType

• `Optional` **claimType**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[claimType](../interfaces/modules_claim_claim_types.IClaimIssuance.md#claimtype)

___

### claimTypeVersion

• `Optional` **claimTypeVersion**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[claimTypeVersion](../interfaces/modules_claim_claim_types.IClaimIssuance.md#claimtypeversion)

___

### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[expirationTimestamp](../interfaces/modules_claim_claim_types.IClaimIssuance.md#expirationtimestamp)

___

### id

• **id**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[id](../interfaces/modules_claim_claim_types.IClaimIssuance.md#id)

___

### issuedToken

• `Optional` **issuedToken**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[issuedToken](../interfaces/modules_claim_claim_types.IClaimIssuance.md#issuedtoken)

___

### onChainProof

• `Optional` **onChainProof**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[onChainProof](../interfaces/modules_claim_claim_types.IClaimIssuance.md#onchainproof)

___

### requester

• **requester**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[requester](../interfaces/modules_claim_claim_types.IClaimIssuance.md#requester)

___

### vp

• `Optional` **vp**: `string`

#### Implementation of

[IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md).[vp](../interfaces/modules_claim_claim_types.IClaimIssuance.md#vp)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\> |

#### Returns

`Promise`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\>
