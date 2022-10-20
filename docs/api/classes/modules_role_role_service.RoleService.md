# Class: RoleService

[modules/role/role.service](../modules/modules_role_role_service.md).RoleService

## Table of contents

### Constructors

- [constructor](modules_role_role_service.RoleService.md#constructor)

### Properties

- [credentialResolver](modules_role_role_service.RoleService.md#credentialresolver)

### Methods

- [create](modules_role_role_service.RoleService.md#create)
- [exists](modules_role_role_service.RoleService.md#exists)
- [getAll](modules_role_role_service.RoleService.md#getall)
- [getByNamehash](modules_role_role_service.RoleService.md#getbynamehash)
- [getByNamespace](modules_role_role_service.RoleService.md#getbynamespace)
- [getByNamespaces](modules_role_role_service.RoleService.md#getbynamespaces)
- [getByOwner](modules_role_role_service.RoleService.md#getbyowner)
- [handleRoleSyncWithEns](modules_role_role_service.RoleService.md#handlerolesyncwithens)
- [remove](modules_role_role_service.RoleService.md#remove)
- [removeByNameHash](modules_role_role_service.RoleService.md#removebynamehash)
- [resolveCredentialAndVerify](modules_role_role_service.RoleService.md#resolvecredentialandverify)
- [update](modules_role_role_service.RoleService.md#update)
- [verifyEnrolmentIssuer](modules_role_role_service.RoleService.md#verifyenrolmentissuer)
- [verifyEnrolmentPrecondition](modules_role_role_service.RoleService.md#verifyenrolmentprecondition)
- [verifyPublicClaim](modules_role_role_service.RoleService.md#verifypublicclaim)
- [verifyRoleEIP191JWT](modules_role_role_service.RoleService.md#verifyroleeip191jwt)
- [verifyUserRoles](modules_role_role_service.RoleService.md#verifyuserroles)

## Constructors

### constructor

• **new RoleService**(`roleRepository`, `didService`, `appService`, `orgService`, `issuerVerificationService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleRepository` | `Repository`<[`Role`](modules_role_role_entity.Role.md)\> |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `appService` | [`ApplicationService`](modules_application_application_service.ApplicationService.md) |
| `orgService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |
| `issuerVerificationService` | [`IssuerVerificationService`](modules_role_issuer_verification_service.IssuerVerificationService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Properties

### credentialResolver

• **credentialResolver**: `CredentialResolver`

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

▸ **handleRoleSyncWithEns**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.appNamespace?` | `string` |
| `__namedParameters.metadata` | `IRoleDefinition` \| `IRoleDefinitionV2` |
| `__namedParameters.name` | `string` |
| `__namedParameters.namehash` | `string` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.orgNamespace?` | `string` |
| `__namedParameters.owner` | `string` |

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

### resolveCredentialAndVerify

▸ **resolveCredentialAndVerify**(`subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean` = false }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjectDID` | `string` |
| `roleNamespace` | `string` |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean` = false }\>

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

▸ **verifyEnrolmentIssuer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimType` | `string` |
| `__namedParameters.issuerDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### verifyEnrolmentPrecondition

▸ **verifyEnrolmentPrecondition**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimType` | `string` |
| `__namedParameters.userDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `did`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

___

### verifyRoleEIP191JWT

▸ **verifyRoleEIP191JWT**(`roleEIP191JWT`, `subjectDID`, `roleNamespace`): `Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Verifies:
- That off-chain claim was issued by authorized issuer
- That claim is not expired
- That off-chain claim proof is valid

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleEIP191JWT` | `RoleEIP191JWT` |
| `subjectDID` | `string` |
| `roleNamespace` | `string` |

#### Returns

`Promise`<{ `errors`: `string`[] ; `isVerified`: `boolean`  }\>

Boolean indicating if verified and array of error messages

___

### verifyUserRoles

▸ **verifyUserRoles**(`did`): `Promise`<{ `name`: `string` = role.roleName; `namespace`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<{ `name`: `string` = role.roleName; `namespace`: `string`  }[]\>
