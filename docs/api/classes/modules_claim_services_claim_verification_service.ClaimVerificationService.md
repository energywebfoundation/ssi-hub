# Class: ClaimVerificationService

[modules/claim/services/claim-verification.service](../modules/modules_claim_services_claim_verification_service.md).ClaimVerificationService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_verification_service.ClaimVerificationService.md#constructor)

### Properties

- [credentialResolver](modules_claim_services_claim_verification_service.ClaimVerificationService.md#credentialresolver)

### Methods

- [resolveCredentialAndVerify](modules_claim_services_claim_verification_service.ClaimVerificationService.md#resolvecredentialandverify)
- [verifyPublicClaim](modules_claim_services_claim_verification_service.ClaimVerificationService.md#verifypublicclaim)
- [verifyRoleEIP191JWT](modules_claim_services_claim_verification_service.ClaimVerificationService.md#verifyroleeip191jwt)

## Constructors

### constructor

• **new ClaimVerificationService**(`logger`, `didService`, `issuerVerificationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `issuerVerificationService` | [`IssuerVerificationService`](modules_claim_services_issuer_verification_service.IssuerVerificationService.md) |

## Properties

### credentialResolver

• **credentialResolver**: `CredentialResolver`

## Methods

### resolveCredentialAndVerify

▸ **resolveCredentialAndVerify**(`subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean` = false }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjectDID` | `string` |
| `roleNamespace` | `string` |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean` = false }\>

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `did`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

___

### verifyRoleEIP191JWT

▸ **verifyRoleEIP191JWT**(`roleEIP191JWT`, `subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Verifies:
- That off-chain claim was issued by authorized issuer
- That claim is not expired
- That off-chain claim proof is valid

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleEIP191JWT` | `RoleEIP191JWT` |
| `subjectDID` | `string` |
| `roleNamespace` | `string` |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Boolean indicating if verified and array of error messages
