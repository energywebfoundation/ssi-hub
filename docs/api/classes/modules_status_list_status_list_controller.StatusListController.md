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

• **new StatusListController**(`configService`, `statusListService`, `roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `statusListService` | [`StatusListService`](modules_status_list_status_list_service.StatusListService.md) |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Methods

### createEntry

▸ **createEntry**(`currentUser`, `«destructured»`): `Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUser` | `string` |
| `«destructured»` | [`CreateEntryInputDto`](modules_status_list_dtos_create_entry_input_dto.CreateEntryInputDto.md) |

#### Returns

`Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

___

### getStatusListCredential

▸ **getStatusListCredential**(`url`, `response`): `Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `response` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

___

### initiateStatusUpdate

▸ **initiateStatusUpdate**(`currentUser`, `«destructured»`): `Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentUser` | `string` |
| `«destructured»` | [`RegisterRevokeInputDto`](modules_status_list_dtos_register_revoke_input_dto.RegisterRevokeInputDto.md) |

#### Returns

`Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

___

### persistUpdate

▸ **persistUpdate**(`«destructured»`): `Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FinalizeUpdateInputDto`](modules_status_list_dtos_sign_revoke_input_dto.FinalizeUpdateInputDto.md) |

#### Returns

`Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>
