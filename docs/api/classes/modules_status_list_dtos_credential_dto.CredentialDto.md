# Class: CredentialDto

[modules/status-list/dtos/credential.dto](../modules/modules_status_list_dtos_credential_dto.md).CredentialDto

## Hierarchy

- **`CredentialDto`**

  ↳ [`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)

## Implements

- `Credential`<[`CredentialSubjectDto`](modules_status_list_dtos_credential_dto.CredentialSubjectDto.md)\>

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Constructors

- [constructor](modules_status_list_dtos_credential_dto.CredentialDto.md#constructor)

### Properties

- [@context](modules_status_list_dtos_credential_dto.CredentialDto.md#@context)
- [credentialSubject](modules_status_list_dtos_credential_dto.CredentialDto.md#credentialsubject)
- [expirationDate](modules_status_list_dtos_credential_dto.CredentialDto.md#expirationdate)
- [id](modules_status_list_dtos_credential_dto.CredentialDto.md#id)
- [issuanceDate](modules_status_list_dtos_credential_dto.CredentialDto.md#issuancedate)
- [issuer](modules_status_list_dtos_credential_dto.CredentialDto.md#issuer)
- [type](modules_status_list_dtos_credential_dto.CredentialDto.md#type)

## Constructors

### constructor

• **new CredentialDto**()

## Properties

### @context

• **@context**: `ICredentialContextType`[]

#### Implementation of

Credential.@context

___

### credentialSubject

• **credentialSubject**: [`CredentialSubjectDto`](modules_status_list_dtos_credential_dto.CredentialSubjectDto.md)

#### Implementation of

Credential.credentialSubject

___

### expirationDate

• `Optional` **expirationDate**: `string`

#### Implementation of

Credential.expirationDate

___

### id

• **id**: `string`

#### Implementation of

Credential.id

___

### issuanceDate

• **issuanceDate**: `string`

#### Implementation of

Credential.issuanceDate

___

### issuer

• **issuer**: `string`

#### Implementation of

Credential.issuer

___

### type

• **type**: `CredentialType`[]

#### Implementation of

Credential.type
