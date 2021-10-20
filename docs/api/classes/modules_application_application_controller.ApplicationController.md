# Class: ApplicationController

[modules/application/application.controller](../modules/modules_application_application_controller.md).ApplicationController

## Table of contents

### Constructors

- [constructor](modules_application_application_controller.ApplicationController.md#constructor)

### Methods

- [exists](modules_application_application_controller.ApplicationController.md#exists)
- [getById](modules_application_application_controller.ApplicationController.md#getbyid)
- [getByOwner](modules_application_application_controller.ApplicationController.md#getbyowner)
- [getRolesByAppId](modules_application_application_controller.ApplicationController.md#getrolesbyappid)

## Constructors

### constructor

• **new ApplicationController**(`applicationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationService` | [`ApplicationService`](modules_application_application_service.ApplicationService.md) |

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

### getById

▸ **getById**(`namespace`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>

___

### getByOwner

▸ **getByOwner**(`owner`, `withRelations`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `withRelations` | `boolean` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### getRolesByAppId

▸ **getRolesByAppId**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>
