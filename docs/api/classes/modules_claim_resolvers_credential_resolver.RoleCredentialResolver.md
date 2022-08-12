# Class: RoleCredentialResolver

[modules/claim/resolvers/credential.resolver](../modules/modules_claim_resolvers_credential_resolver.md).RoleCredentialResolver

## Implements

- `CredentialResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#constructor)

### Methods

- [getCredential](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getcredential)
- [getEIP191JWT](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#geteip191jwt)
- [getVerifiableCredential](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getverifiablecredential)

## Constructors

### constructor

• **new RoleCredentialResolver**(`claimService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_services_claim_service.ClaimService.md) |

## Methods

### getCredential

▸ **getCredential**(`did`, `namespace`): `Promise`<`VerifiableCredential`<`RoleCredentialSubject`\> \| `RoleEIP191JWT`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `namespace` | `string` |

#### Returns

`Promise`<`VerifiableCredential`<`RoleCredentialSubject`\> \| `RoleEIP191JWT`\>

#### Implementation of

CredentialResolver.getCredential

___

### getEIP191JWT

▸ **getEIP191JWT**(`subject`, `claimType`): `Promise`<`RoleEIP191JWT`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `claimType` | `string` |

#### Returns

`Promise`<`RoleEIP191JWT`\>

#### Implementation of

CredentialResolver.getEIP191JWT

___

### getVerifiableCredential

▸ **getVerifiableCredential**(`subject`, `claimType`): `Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `claimType` | `string` |

#### Returns

`Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>\>

#### Implementation of

CredentialResolver.getVerifiableCredential
