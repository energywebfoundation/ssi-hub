# Class: RoleService

[modules/role/role.service](../modules/modules_role_role_service.md).RoleService

## Table of contents

### Constructors

- [constructor](modules_role_role_service.RoleService.md#constructor)

### Methods

- [create](modules_role_role_service.RoleService.md#create)
- [exists](modules_role_role_service.RoleService.md#exists)
- [fetchEnrolmentPreconditions](modules_role_role_service.RoleService.md#fetchenrolmentpreconditions)
- [getAll](modules_role_role_service.RoleService.md#getall)
- [getByNamehash](modules_role_role_service.RoleService.md#getbynamehash)
- [getByNamespace](modules_role_role_service.RoleService.md#getbynamespace)
- [getByNamespaces](modules_role_role_service.RoleService.md#getbynamespaces)
- [getByOwner](modules_role_role_service.RoleService.md#getbyowner)
- [handleRoleSyncWithEns](modules_role_role_service.RoleService.md#handlerolesyncwithens)
- [remove](modules_role_role_service.RoleService.md#remove)
- [removeByNameHash](modules_role_role_service.RoleService.md#removebynamehash)
- [update](modules_role_role_service.RoleService.md#update)
- [verifyEnrolmentIssuer](modules_role_role_service.RoleService.md#verifyenrolmentissuer)
- [verifyUserRoles](modules_role_role_service.RoleService.md#verifyuserroles)

## Constructors

### constructor

• **new RoleService**(`roleRepository`, `didService`, `appService`, `orgService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleRepository` | `Repository`<[`Role`](modules_role_role_entity.Role.md)\> |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `appService` | [`ApplicationService`](modules_application_application_service.ApplicationService.md) |
| `orgService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### create

▸ **create**(`data`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

Method for adding new Role to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`RoleDTO`](modules_role_role_dto.RoleDTO.md) | object containing all needed role properties |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

id of newly added Role

___

### exists

▸ **exists**(`namespace`): `Promise`<`boolean`\>

return true if role with given namespace exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### fetchEnrolmentPreconditions

▸ **fetchEnrolmentPreconditions**(`claimType`): `Promise`<{}[]\>

Fetches enrolment preconditions for a given role (claim type)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claimType` | `Object` | the role to fetch enrolment preconditions for |
| `claimType.claimType` | `string` | - |

#### Returns

`Promise`<{}[]\>

enrolment preconditions for a given role (claim type)

___

### getAll

▸ **getAll**(): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getByNamehash

▸ **getByNamehash**(`namehash`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

returns single Role with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

returns single Role with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

___

### getByNamespaces

▸ **getByNamespaces**(`namespaces`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

returns multiple Role with matching namespaces

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getByOwner

▸ **getByOwner**(`owner`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

returns single Role with matching owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### handleRoleSyncWithEns

▸ **handleRoleSyncWithEns**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appNamespace?` | `string` |
| › `metadata` | `IRoleDefinitionV2` \| `IRoleDefinition` |
| › `name` | `string` |
| › `namehash` | `string` |
| › `namespace` | `string` |
| › `orgNamespace?` | `string` |
| › `owner` | `string` |

#### Returns

`Promise`<`void`\>

___

### remove

▸ **remove**(`namespace`): `Promise`<`DeleteResult`\>

removes Role with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### removeByNameHash

▸ **removeByNameHash**(`namehash`): `Promise`<`DeleteResult`\>

removes Role with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### update

▸ **update**(`data`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

Update existing role with given namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RoleDTO`](modules_role_role_dto.RoleDTO.md) |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

___

### verifyEnrolmentIssuer

▸ **verifyEnrolmentIssuer**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `claimType` | `string` |
| › `issuerDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### verifyUserRoles

▸ **verifyUserRoles**(`did`): `Promise`<{ `name`: `string` = role.roleName; `namespace`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<{ `name`: `string` = role.roleName; `namespace`: `string`  }[]\>
