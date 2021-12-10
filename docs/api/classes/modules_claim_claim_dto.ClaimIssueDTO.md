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
- [id](modules_claim_claim_dto.ClaimIssueDTO.md#id)
- [issuedToken](modules_claim_claim_dto.ClaimIssueDTO.md#issuedtoken)
- [onChainProof](modules_claim_claim_dto.ClaimIssueDTO.md#onchainproof)
- [requester](modules_claim_claim_dto.ClaimIssueDTO.md#requester)

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

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\> |

#### Returns

`Promise`<[`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md)\>
