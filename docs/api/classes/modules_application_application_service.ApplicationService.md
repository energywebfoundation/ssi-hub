# Class: ApplicationService

[modules/application/application.service](../modules/modules_application_application_service.md).ApplicationService

## Table of contents

### Constructors

- [constructor](modules_application_application_service.ApplicationService.md#constructor)

### Methods

- [create](modules_application_application_service.ApplicationService.md#create)
- [exists](modules_application_application_service.ApplicationService.md#exists)
- [getByNamehash](modules_application_application_service.ApplicationService.md#getbynamehash)
- [getByNamespace](modules_application_application_service.ApplicationService.md#getbynamespace)
- [getByOwner](modules_application_application_service.ApplicationService.md#getbyowner)
- [getRoles](modules_application_application_service.ApplicationService.md#getroles)
- [handleAppSyncWithEns](modules_application_application_service.ApplicationService.md#handleappsyncwithens)
- [remove](modules_application_application_service.ApplicationService.md#remove)
- [removeByNameHash](modules_application_application_service.ApplicationService.md#removebynamehash)
- [update](modules_application_application_service.ApplicationService.md#update)

## Constructors

### constructor

• **new ApplicationService**(`applicationRepository`, `organizationService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationRepository` | `Repository`<[`Application`](modules_application_application_entity.Application.md)\> |
| `organizationService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### create

▸ **create**(`data`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

Method for adding new App to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ApplicationDTO`](modules_application_application_dto.ApplicationDTO.md) | object containing all needed App properties |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>

id of newly added App

___

### exists

▸ **exists**(`namespace`): `Promise`<`boolean`\>

return true if App with given namespace exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### getByNamehash

▸ **getByNamehash**(`namehash`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

returns single App with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

returns single App with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>

___

### getByOwner

▸ **getByOwner**(`owner`, `__namedParameters?`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

Returns applications owned by `owner`

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `__namedParameters?` | `Object` |
| `__namedParameters.withRelations?` | `boolean` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### getRoles

▸ **getRoles**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

Returns all Roles belonging to Application with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### handleAppSyncWithEns

▸ **handleAppSyncWithEns**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.metadata` | `IAppDefinition` |
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

removes App with matching namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### removeByNameHash

▸ **removeByNameHash**(`namehash`): `Promise`<`DeleteResult`\>

removes App with matching namehash

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<`DeleteResult`\>

___

### update

▸ **update**(`__namedParameters`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

Update existing App with given namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ApplicationDTO`](modules_application_application_dto.ApplicationDTO.md) |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>
