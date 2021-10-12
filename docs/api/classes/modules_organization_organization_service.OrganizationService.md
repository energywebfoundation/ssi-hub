# Class: OrganizationService

[modules/organization/organization.service](../modules/modules_organization_organization_service.md).OrganizationService

## Table of contents

### Constructors

- [constructor](modules_organization_organization_service.OrganizationService.md#constructor)

### Methods

- [create](modules_organization_organization_service.OrganizationService.md#create)
- [exists](modules_organization_organization_service.OrganizationService.md#exists)
- [getApps](modules_organization_organization_service.OrganizationService.md#getapps)
- [getByNamehash](modules_organization_organization_service.OrganizationService.md#getbynamehash)
- [getByNamespace](modules_organization_organization_service.OrganizationService.md#getbynamespace)
- [getByOwner](modules_organization_organization_service.OrganizationService.md#getbyowner)
- [getRoles](modules_organization_organization_service.OrganizationService.md#getroles)
- [getSubOrgs](modules_organization_organization_service.OrganizationService.md#getsuborgs)
- [handleOrgSyncWithEns](modules_organization_organization_service.OrganizationService.md#handleorgsyncwithens)
- [remove](modules_organization_organization_service.OrganizationService.md#remove)
- [removeByNameHash](modules_organization_organization_service.OrganizationService.md#removebynamehash)
- [update](modules_organization_organization_service.OrganizationService.md#update)

## Constructors

### constructor

• **new OrganizationService**(`orgRepository`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orgRepository` | `Repository`<[`Organization`](modules_organization_organization_entity.Organization.md)\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### create

▸ **create**(`__namedParameters`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

Method for adding new Org to database

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`OrganizationDTO`](modules_organization_organization_dto.OrganizationDTO.md) |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

id of newly added Org

___

### exists

▸ **exists**(`namespace`): `Promise`<`boolean`\>

return true if Org with given namespace exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### getApps

▸ **getApps**(`namespace`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

Returns all Apps belonging to Organization with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### getByNamehash

▸ **getByNamehash**(`namehash`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

returns single Org with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

returns single Org with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

___

### getByOwner

▸ **getByOwner**(`owner`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

returns single Org with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

___

### getRoles

▸ **getRoles**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

Returns all Role belonging to Organization with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getSubOrgs

▸ **getSubOrgs**(`namespace`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

Returns all SubOrgs belonging to Organization with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

___

### handleOrgSyncWithEns

▸ **handleOrgSyncWithEns**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.metadata` | `IOrganizationDefinition` |
| `__namedParameters.name` | `string` |
| `__namedParameters.namehash` | `string` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.owner` | `string` |
| `__namedParameters.parentOrgNamespace` | `string` |

#### Returns

`Promise`<`void`\>

___

### remove

▸ **remove**(`namespace`): `Promise`<`DeleteResult`\>

removes Organization with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### removeByNameHash

▸ **removeByNameHash**(`namehash`): `Promise`<`DeleteResult`\>

removes Organization with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### update

▸ **update**(`__namedParameters`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

Update existing Org with given namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`OrganizationDTO`](modules_organization_organization_dto.OrganizationDTO.md) |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>
