# Class: ClaimVerificationService

[modules/claim/services/claim-verification.service](../modules/modules_claim_services_claim_verification_service.md).ClaimVerificationService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_verification_service.ClaimVerificationService.md#constructor)

### Properties

- [credentialResolver](modules_claim_services_claim_verification_service.ClaimVerificationService.md#credentialresolver)

### Methods

- [resolveCredentialAndVerify](modules_claim_services_claim_verification_service.ClaimVerificationService.md#resolvecredentialandverify)
- [verifyDidDocumentContainsEnrolmentPreconditions](modules_claim_services_claim_verification_service.ClaimVerificationService.md#verifydiddocumentcontainsenrolmentpreconditions)
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

Resolve a credential from storage and verify its proof/signature and its issuer's authority

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjectDID` | `string` | The DID to try to resolve a credential for |
| `roleNamespace` | `string` | - |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean` = false }\>

void. Returns boolean indicating if credential is verified. Contains array of error messages if not verified.

___

### verifyDidDocumentContainsEnrolmentPreconditions

▸ **verifyDidDocumentContainsEnrolmentPreconditions**(`__namedParameters`): `Promise`<`void`\>

Verifies that a user's Did Document contains all roles required for enrolment (enrolment preconditions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimType` | `string` |
| `__namedParameters.conditions` | `string`[] |
| `__namedParameters.userDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `did`): `Promise`<`string`\>

Verifies issued token of the public claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | JWT token of the public claim |
| `did` | `string` | - |

#### Returns

`Promise`<`string`\>

DID of the authenticated identity on successful verification or null otherwise

___

### verifyRoleEIP191JWT

▸ **verifyRoleEIP191JWT**(`roleEIP191JWT`, `subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Verifies:
- That off-chain claim was issued by authorized issuer
- That claim is not expired
- That off-chain claim proof is valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleEIP191JWT` | `RoleEIP191JWT` | off chain claim to verify |
| `subjectDID` | `string` | The credential subject |
| `roleNamespace` | `string` | - |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Boolean indicating if verified and array of error messages
