# Class: RoleController

[modules/role/role.controller](../modules/modules_role_role_controller.md).RoleController

## Table of contents

### Constructors

- [constructor](modules_role_role_controller.RoleController.md#constructor)

### Methods

- [exists](modules_role_role_controller.RoleController.md#exists)
- [getById](modules_role_role_controller.RoleController.md#getbyid)
- [getByIds](modules_role_role_controller.RoleController.md#getbyids)
- [getByOwner](modules_role_role_controller.RoleController.md#getbyowner)

## Constructors

### constructor

• **new RoleController**(`roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

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

▸ **getById**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

___

### getByIds

▸ **getByIds**(`namespaces`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getByOwner

▸ **getByOwner**(`owner`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>
