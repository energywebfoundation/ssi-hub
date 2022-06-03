# Class: RoleCredentialResolver

[modules/claim/resolvers/credential.resolver](../modules/modules_claim_resolvers_credential_resolver.md).RoleCredentialResolver

## Implements

- `CredentialResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#constructor)

### Methods

- [getClaimIssuedToken](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getclaimissuedtoken)
- [getCredential](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getcredential)

## Constructors

### constructor

• **new RoleCredentialResolver**(`claimService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_services_claim_service.ClaimService.md) |

## Methods

### getClaimIssuedToken

▸ **getClaimIssuedToken**(`subject`, `claimType`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `claimType` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

CredentialResolver.getClaimIssuedToken

___

### getCredential

▸ **getCredential**(`subject`, `claimType`): `Promise`<`IVerifiableCredential`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `claimType` | `string` |

#### Returns

`Promise`<`IVerifiableCredential`\>

#### Implementation of

CredentialResolver.getCredential
