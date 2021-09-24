# Class: Claim

[modules/claim/claim.entity](../modules/modules_claim_claim_entity.md).Claim

## Implements

- [`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md)

## Table of contents

### Constructors

- [constructor](modules_claim_claim_entity.Claim.md#constructor)

### Properties

- [acceptedBy](modules_claim_claim_entity.Claim.md#acceptedby)
- [claimType](modules_claim_claim_entity.Claim.md#claimtype)
- [claimTypeVersion](modules_claim_claim_entity.Claim.md#claimtypeversion)
- [createdAt](modules_claim_claim_entity.Claim.md#createdat)
- [id](modules_claim_claim_entity.Claim.md#id)
- [isAccepted](modules_claim_claim_entity.Claim.md#isaccepted)
- [isRejected](modules_claim_claim_entity.Claim.md#isrejected)
- [issuedToken](modules_claim_claim_entity.Claim.md#issuedtoken)
- [namespace](modules_claim_claim_entity.Claim.md#namespace)
- [onChainProof](modules_claim_claim_entity.Claim.md#onchainproof)
- [registrationTypes](modules_claim_claim_entity.Claim.md#registrationtypes)
- [requester](modules_claim_claim_entity.Claim.md#requester)
- [subject](modules_claim_claim_entity.Claim.md#subject)
- [subjectAgreement](modules_claim_claim_entity.Claim.md#subjectagreement)
- [token](modules_claim_claim_entity.Claim.md#token)

### Methods

- [create](modules_claim_claim_entity.Claim.md#create)

## Constructors

### constructor

• **new Claim**()

## Properties

### acceptedBy

• `Optional` **acceptedBy**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[acceptedBy](../interfaces/modules_claim_claim_types.IClaim.md#acceptedby)

___

### claimType

• **claimType**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[claimType](../interfaces/modules_claim_claim_types.IClaim.md#claimtype)

___

### claimTypeVersion

• **claimTypeVersion**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[claimTypeVersion](../interfaces/modules_claim_claim_types.IClaim.md#claimtypeversion)

___

### createdAt

• **createdAt**: `Date`

___

### id

• **id**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[id](../interfaces/modules_claim_claim_types.IClaim.md#id)

___

### isAccepted

• **isAccepted**: `boolean`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[isAccepted](../interfaces/modules_claim_claim_types.IClaim.md#isaccepted)

___

### isRejected

• `Optional` **isRejected**: `boolean`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[isRejected](../interfaces/modules_claim_claim_types.IClaim.md#isrejected)

___

### issuedToken

• `Optional` **issuedToken**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[issuedToken](../interfaces/modules_claim_claim_types.IClaim.md#issuedtoken)

___

### namespace

• **namespace**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[namespace](../interfaces/modules_claim_claim_types.IClaim.md#namespace)

___

### onChainProof

• `Optional` **onChainProof**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[onChainProof](../interfaces/modules_claim_claim_types.IClaim.md#onchainproof)

___

### registrationTypes

• **registrationTypes**: [`RegistrationTypes`](../enums/modules_claim_claim_types.RegistrationTypes.md)[]

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[registrationTypes](../interfaces/modules_claim_claim_types.IClaim.md#registrationtypes)

___

### requester

• **requester**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[requester](../interfaces/modules_claim_claim_types.IClaim.md#requester)

___

### subject

• **subject**: `string`

___

### subjectAgreement

• `Optional` **subjectAgreement**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[subjectAgreement](../interfaces/modules_claim_claim_types.IClaim.md#subjectagreement)

___

### token

• **token**: `string`

#### Implementation of

[IClaim](../interfaces/modules_claim_claim_types.IClaim.md).[token](../interfaces/modules_claim_claim_types.IClaim.md#token)

## Methods

### create

▸ `Static` **create**(`data`): [`Claim`](modules_claim_claim_entity.Claim.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`Claim`](modules_claim_claim_entity.Claim.md)\> |

#### Returns

[`Claim`](modules_claim_claim_entity.Claim.md)
