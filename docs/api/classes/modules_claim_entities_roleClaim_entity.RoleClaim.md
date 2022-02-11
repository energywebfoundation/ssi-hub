# Class: RoleClaim

[modules/claim/entities/roleClaim.entity](../modules/modules_claim_entities_roleClaim_entity.md).RoleClaim

## Implements

- [`IRoleClaim`](../interfaces/modules_claim_claim_types.IRoleClaim.md)

## Table of contents

### Constructors

- [constructor](modules_claim_entities_roleClaim_entity.RoleClaim.md#constructor)

### Properties

- [acceptedBy](modules_claim_entities_roleClaim_entity.RoleClaim.md#acceptedby)
- [claimType](modules_claim_entities_roleClaim_entity.RoleClaim.md#claimtype)
- [claimTypeVersion](modules_claim_entities_roleClaim_entity.RoleClaim.md#claimtypeversion)
- [createdAt](modules_claim_entities_roleClaim_entity.RoleClaim.md#createdat)
- [id](modules_claim_entities_roleClaim_entity.RoleClaim.md#id)
- [isAccepted](modules_claim_entities_roleClaim_entity.RoleClaim.md#isaccepted)
- [isRejected](modules_claim_entities_roleClaim_entity.RoleClaim.md#isrejected)
- [issuedToken](modules_claim_entities_roleClaim_entity.RoleClaim.md#issuedtoken)
- [namespace](modules_claim_entities_roleClaim_entity.RoleClaim.md#namespace)
- [onChainProof](modules_claim_entities_roleClaim_entity.RoleClaim.md#onchainproof)
- [registrationTypes](modules_claim_entities_roleClaim_entity.RoleClaim.md#registrationtypes)
- [rejectionReason](modules_claim_entities_roleClaim_entity.RoleClaim.md#rejectionreason)
- [requester](modules_claim_entities_roleClaim_entity.RoleClaim.md#requester)
- [subject](modules_claim_entities_roleClaim_entity.RoleClaim.md#subject)
- [subjectAgreement](modules_claim_entities_roleClaim_entity.RoleClaim.md#subjectagreement)
- [token](modules_claim_entities_roleClaim_entity.RoleClaim.md#token)

### Methods

- [create](modules_claim_entities_roleClaim_entity.RoleClaim.md#create)

## Constructors

### constructor

• **new RoleClaim**()

## Properties

### acceptedBy

• `Optional` **acceptedBy**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[acceptedBy](../interfaces/modules_claim_claim_types.IRoleClaim.md#acceptedby)

___

### claimType

• **claimType**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[claimType](../interfaces/modules_claim_claim_types.IRoleClaim.md#claimtype)

___

### claimTypeVersion

• **claimTypeVersion**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[claimTypeVersion](../interfaces/modules_claim_claim_types.IRoleClaim.md#claimtypeversion)

___

### createdAt

• **createdAt**: `Date`

___

### id

• **id**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[id](../interfaces/modules_claim_claim_types.IRoleClaim.md#id)

___

### isAccepted

• **isAccepted**: `boolean`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[isAccepted](../interfaces/modules_claim_claim_types.IRoleClaim.md#isaccepted)

___

### isRejected

• `Optional` **isRejected**: `boolean`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[isRejected](../interfaces/modules_claim_claim_types.IRoleClaim.md#isrejected)

___

### issuedToken

• `Optional` **issuedToken**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[issuedToken](../interfaces/modules_claim_claim_types.IRoleClaim.md#issuedtoken)

___

### namespace

• **namespace**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[namespace](../interfaces/modules_claim_claim_types.IRoleClaim.md#namespace)

___

### onChainProof

• `Optional` **onChainProof**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[onChainProof](../interfaces/modules_claim_claim_types.IRoleClaim.md#onchainproof)

___

### registrationTypes

• **registrationTypes**: [`RegistrationTypes`](../enums/modules_claim_claim_types.RegistrationTypes.md)[]

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[registrationTypes](../interfaces/modules_claim_claim_types.IRoleClaim.md#registrationtypes)

___

### rejectionReason

• `Optional` **rejectionReason**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[rejectionReason](../interfaces/modules_claim_claim_types.IRoleClaim.md#rejectionreason)

___

### requester

• **requester**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[requester](../interfaces/modules_claim_claim_types.IRoleClaim.md#requester)

___

### subject

• **subject**: `string`

___

### subjectAgreement

• `Optional` **subjectAgreement**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[subjectAgreement](../interfaces/modules_claim_claim_types.IRoleClaim.md#subjectagreement)

___

### token

• `Optional` **token**: `string`

#### Implementation of

[IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md).[token](../interfaces/modules_claim_claim_types.IRoleClaim.md#token)

## Methods

### create

▸ `Static` **create**(`data`): [`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\> |

#### Returns

[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)
