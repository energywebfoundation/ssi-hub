# Class: RevocationVerificationService

[modules/claim/services/revocation-verification.service](../modules/modules_claim_services_revocation_verification_service.md).RevocationVerificationService

## Hierarchy

- `RevocationVerification`

  ↳ **`RevocationVerificationService`**

## Table of contents

### Constructors

- [constructor](modules_claim_services_revocation_verification_service.RevocationVerificationService.md#constructor)

## Constructors

### constructor

• **new RevocationVerificationService**(`provider`, `registrySettings`, `issuerResolver`, `revokerResolver`, `credentialResolver`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `registrySettings` | `RegistrySettings` |
| `issuerResolver` | [`RoleIssuerResolver`](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md) |
| `revokerResolver` | [`RoleRevokerResolver`](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md) |
| `credentialResolver` | [`RoleCredentialResolver`](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md) |

#### Overrides

RevocationVerification.constructor
