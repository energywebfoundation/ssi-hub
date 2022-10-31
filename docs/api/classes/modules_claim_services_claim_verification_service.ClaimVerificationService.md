# Class: ClaimVerificationService

[modules/claim/services/claim-verification.service](../modules/modules_claim_services_claim_verification_service.md).ClaimVerificationService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_verification_service.ClaimVerificationService.md#constructor)

### Properties

- [credentialResolver](modules_claim_services_claim_verification_service.ClaimVerificationService.md#credentialresolver)

### Methods

- [resolveCredentialAndVerify](modules_claim_services_claim_verification_service.ClaimVerificationService.md#resolvecredentialandverify)
- [verifyEnrolmentPreconditions](modules_claim_services_claim_verification_service.ClaimVerificationService.md#verifyenrolmentpreconditions)

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

• **credentialResolver**: [`RoleCredentialResolver`](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md)

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

### verifyEnrolmentPreconditions

▸ **verifyEnrolmentPreconditions**(`enrolmentPreconditions`, `requester`, `claimType`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enrolmentPreconditions` | { `conditions`: `string`[] ; `type`: `Role`  }[] |
| `requester` | `string` |
| `claimType` | `string` |

#### Returns

`Promise`<`void`\>
