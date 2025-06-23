# Class: ClaimVerificationService

[modules/claim/services/claim-verification.service](../modules/modules_claim_services_claim_verification_service.md).ClaimVerificationService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_verification_service.ClaimVerificationService.md#constructor)

### Properties

- [credentialResolver](modules_claim_services_claim_verification_service.ClaimVerificationService.md#credentialresolver)

### Methods

- [resolveCredentialAndVerify](modules_claim_services_claim_verification_service.ClaimVerificationService.md#resolvecredentialandverify)
- [verifyClaimPresentInDidDocument](modules_claim_services_claim_verification_service.ClaimVerificationService.md#verifyclaimpresentindiddocument)
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

▸ **resolveCredentialAndVerify**(`subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Resolve a credential from storage and verify its proof/signature and its issuer's authority

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjectDID` | `string` | The DID to try to resolve a credential for |
| `roleNamespace` | `string` | - |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Returns boolean indicating if credential is verified. Contains array of error messages if not verified.

___

### verifyClaimPresentInDidDocument

▸ **verifyClaimPresentInDidDocument**(`«destructured»`): `Promise`<`boolean`\>

Verifies that a user's Did Document contains all roles required for enrolment (enrolment preconditions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `conditions` | `string`[] |
| › `userDID` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### verifyEnrolmentPreconditions

▸ **verifyEnrolmentPreconditions**(`enrolmentPreconditions`, `requester`, `claimType`): `Promise`<`void`\>

Verifies that a user posesses the necessary roles for enrolment preconditions, and that each role credential is valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enrolmentPreconditions` | { `conditions`: `string`[] ; `type`: `Role`  }[] | the preconditions that must be met for enrolment to a role |
| `requester` | `string` | the Did that is requesting enrolment |
| `claimType` | `string` | the role that the user is requesting to enrol to |

#### Returns

`Promise`<`void`\>
