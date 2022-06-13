# Class: CredentialWithStatus

[modules/status-list/entities/credential-with-status.entity](../modules/modules_status_list_entities_credential_with_status_entity.md).CredentialWithStatus

## Table of contents

### Constructors

- [constructor](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#constructor)

### Properties

- [entry](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#entry)
- [id](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#id)
- [namespace](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#namespace)

### Methods

- [associateEntry](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#associateentry)
- [getCredentialStatus](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#getcredentialstatus)
- [create](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md#create)

## Constructors

### constructor

• **new CredentialWithStatus**()

## Properties

### entry

• **entry**: [`StatusListEntry`](modules_status_list_entities_status_list_entry_entity.StatusListEntry.md)

___

### id

• **id**: `string`

___

### namespace

• **namespace**: `string`

## Methods

### associateEntry

▸ **associateEntry**(`entry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | [`StatusListEntry`](modules_status_list_entities_status_list_entry_entity.StatusListEntry.md) |

#### Returns

`void`

___

### getCredentialStatus

▸ **getCredentialStatus**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `statusListCredential` | `string` |
| `statusListIndex` | `string` |
| `statusPurpose` | `string` |
| `type` | `string` |

___

### create

▸ `Static` **create**(`data`): [`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Pick`<[`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md), ``"namespace"`` \| ``"id"``\> |

#### Returns

[`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md)
