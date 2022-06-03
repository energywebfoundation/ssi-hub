# Class: StatusListCredential

[modules/status-list/entities/status-list-credential.entity](../modules/modules_status_list_entities_status_list_credential_entity.md).StatusListCredential

## Table of contents

### Constructors

- [constructor](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md#constructor)

### Properties

- [statusListId](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md#statuslistid)
- [vc](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md#vc)

### Methods

- [getStatusListCredential](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md#getstatuslistcredential)
- [create](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md#create)

## Constructors

### constructor

• **new StatusListCredential**()

## Properties

### statusListId

• **statusListId**: `string`

___

### vc

• `Optional` **vc**: [`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)

## Methods

### getStatusListCredential

▸ **getStatusListCredential**(`issuerDid`): [`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuerDid` | `string` |

#### Returns

[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)

___

### create

▸ `Static` **create**(`data`): [`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Pick`<[`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md), ``"statusListId"`` \| ``"vc"``\> |

#### Returns

[`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)
