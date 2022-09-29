# Class: RoleCredentialResolver

[modules/claim/resolvers/credential.resolver](../modules/modules_claim_resolvers_credential_resolver.md).RoleCredentialResolver

## Implements

- `CredentialResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#constructor)

### Methods

- [credentialsOf](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#credentialsof)
- [eip191JwtsOf](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#eip191jwtsof)
- [getCredential](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getcredential)
- [getEIP191JWT](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#geteip191jwt)
- [getVerifiableCredential](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#getverifiablecredential)
- [serviceEndpointsToCredentials](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#serviceendpointstocredentials)
- [serviceEndpointsToEIP191](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md#serviceendpointstoeip191)

## Constructors

### constructor

• **new RoleCredentialResolver**(`didService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### credentialsOf

▸ **credentialsOf**(`subject`): `Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |

#### Returns

`Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>[]\>

#### Implementation of

CredentialResolver.credentialsOf

___

### eip191JwtsOf

▸ **eip191JwtsOf**(`subject`): `Promise`<`RoleEIP191JWT`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |

#### Returns

`Promise`<`RoleEIP191JWT`[]\>

#### Implementation of

CredentialResolver.eip191JwtsOf

___

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

▸ **getVerifiableCredential**(`subject`, `namespace`): `Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `namespace` | `string` |

#### Returns

`Promise`<`VerifiableCredential`<`RoleCredentialSubject`\>\>

#### Implementation of

CredentialResolver.getVerifiableCredential

___

### serviceEndpointsToCredentials

▸ **serviceEndpointsToCredentials**(`tokens`): `VerifiableCredential`<`RoleCredentialSubject`\>[]

Finds verifiable credentials among service ednpoints

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `string`[] | resolved service endpoints of DID document services |

#### Returns

`VerifiableCredential`<`RoleCredentialSubject`\>[]

verifiable credentials

___

### serviceEndpointsToEIP191

▸ **serviceEndpointsToEIP191**(`tokens`): `RoleEIP191JWT`[]

Finds EIP191 role tokens among service endpoints

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `string`[] | resolved service endpoints of DID document services |

#### Returns

`RoleEIP191JWT`[]

EIP191 role tokens
