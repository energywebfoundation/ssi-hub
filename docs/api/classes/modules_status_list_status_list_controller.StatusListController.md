# Class: StatusListController

[modules/status-list/status-list.controller](../modules/modules_status_list_status_list_controller.md).StatusListController

## Table of contents

### Constructors

- [constructor](modules_status_list_status_list_controller.StatusListController.md#constructor)

### Methods

- [createEntry](modules_status_list_status_list_controller.StatusListController.md#createentry)
- [getStatusListCredential](modules_status_list_status_list_controller.StatusListController.md#getstatuslistcredential)
- [initiateStatusUpdate](modules_status_list_status_list_controller.StatusListController.md#initiatestatusupdate)
- [persistUpdate](modules_status_list_status_list_controller.StatusListController.md#persistupdate)

## Constructors

### constructor

• **new StatusListController**(`statusListService`, `roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusListService` | [`StatusListService`](modules_status_list_status_list_service.StatusListService.md) |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Methods

### createEntry

▸ **createEntry**(`currentUser`, `__namedParameters`): `Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUser` | `string` |
| `__namedParameters` | [`CreateEntryInputDto`](modules_status_list_dtos_create_entry_input_dto.CreateEntryInputDto.md) |

#### Returns

`Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

___

### getStatusListCredential

▸ **getStatusListCredential**(`credentialId`, `response`): `Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentialId` | `string` |
| `response` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

___

### initiateStatusUpdate

▸ **initiateStatusUpdate**(`currentUser`, `__namedParameters`): `Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUser` | `string` |
| `__namedParameters` | [`RegisterRevokeInputDto`](modules_status_list_dtos_register_revoke_input_dto.RegisterRevokeInputDto.md) |

#### Returns

`Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

___

### persistUpdate

▸ **persistUpdate**(`__namedParameters`): `Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SignRevokeInputDto`](modules_status_list_dtos_sign_revoke_input_dto.SignRevokeInputDto.md) |

#### Returns

`Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>
