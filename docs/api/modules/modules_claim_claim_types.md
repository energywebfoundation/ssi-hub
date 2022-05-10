# Module: modules/claim/claim.types

## Table of contents

### Enumerations

- [ClaimEventType](../enums/modules_claim_claim_types.ClaimEventType.md)
- [RegistrationTypes](../enums/modules_claim_claim_types.RegistrationTypes.md)

### Interfaces

- [IClaim](../interfaces/modules_claim_claim_types.IClaim.md)
- [IClaimIssuance](../interfaces/modules_claim_claim_types.IClaimIssuance.md)
- [IClaimRejection](../interfaces/modules_claim_claim_types.IClaimRejection.md)
- [IClaimRequest](../interfaces/modules_claim_claim_types.IClaimRequest.md)
- [IMessage](../interfaces/modules_claim_claim_types.IMessage.md)
- [IRoleClaim](../interfaces/modules_claim_claim_types.IRoleClaim.md)

### Type aliases

- [DecodedClaimToken](modules_claim_claim_types.md#decodedclaimtoken)

### Variables

- [NATS\_EXCHANGE\_TOPIC](modules_claim_claim_types.md#nats_exchange_topic)

## Type aliases

### DecodedClaimToken

Ƭ **DecodedClaimToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claimData` | { `claimType`: `string` ; `claimTypeVersion`: `string`  } |
| `claimData.claimType` | `string` |
| `claimData.claimTypeVersion` | `string` |
| `sub` | `string` |

## Variables

### NATS\_EXCHANGE\_TOPIC

• `Const` **NATS\_EXCHANGE\_TOPIC**: ``"claim-exchange"``
