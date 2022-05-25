# Class: NamespaceRevocations

[modules/status-list/entities/namespace-revocations.entity](../modules/modules_status_list_entities_namespace_revocations_entity.md).NamespaceRevocations

## Table of contents

### Constructors

- [constructor](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#constructor)

### Properties

- [id](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#id)
- [namespace](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#namespace)
- [statusListCredentials](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#statuslistcredentials)

### Methods

- [createEntry](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#createentry)
- [create](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md#create)

## Constructors

### constructor

• **new NamespaceRevocations**()

## Properties

### id

• **id**: `string`

___

### namespace

• **namespace**: `string`

___

### statusListCredentials

• **statusListCredentials**: [`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)[]

## Methods

### createEntry

▸ **createEntry**(`statusListDomain`, `credentialId`): [`StatusList2021EntryDto`](modules_status_list_dtos_credential_status_dto.StatusList2021EntryDto.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusListDomain` | `string` |
| `credentialId` | `string` |

#### Returns

[`StatusList2021EntryDto`](modules_status_list_dtos_credential_status_dto.StatusList2021EntryDto.md)

___

### create

▸ `Static` **create**(`data`): [`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Pick`<[`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md), ``"namespace"``\> & { `id?`: `string`  } |

#### Returns

[`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md)
