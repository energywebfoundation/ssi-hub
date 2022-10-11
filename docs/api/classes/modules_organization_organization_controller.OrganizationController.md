# Class: OrganizationController

[modules/organization/organization.controller](../modules/modules_organization_organization_controller.md).OrganizationController

## Table of contents

### Constructors

- [constructor](modules_organization_organization_controller.OrganizationController.md#constructor)

### Methods

- [exists](modules_organization_organization_controller.OrganizationController.md#exists)
- [getAppsByOrgId](modules_organization_organization_controller.OrganizationController.md#getappsbyorgid)
- [getById](modules_organization_organization_controller.OrganizationController.md#getbyid)
- [getByOwner](modules_organization_organization_controller.OrganizationController.md#getbyowner)
- [getRolesByOrgId](modules_organization_organization_controller.OrganizationController.md#getrolesbyorgid)
- [getSubOrgs](modules_organization_organization_controller.OrganizationController.md#getsuborgs)

## Constructors

### constructor

• **new OrganizationController**(`organizationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `organizationService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |

## Methods

### exists

▸ **exists**(`namespace`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### getAppsByOrgId

▸ **getAppsByOrgId**(`namespace`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### getById

▸ **getById**(`namespace`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

___

### getByOwner

▸ **getByOwner**(`owner`, `withRelations`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `withRelations` | `boolean` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

___

### getRolesByOrgId

▸ **getRolesByOrgId**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getSubOrgs

▸ **getSubOrgs**(`namespace`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>
