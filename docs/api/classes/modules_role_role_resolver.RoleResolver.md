# Class: RoleResolver

[modules/role/role.resolver](../modules/modules_role_role_resolver.md).RoleResolver

## Table of contents

### Constructors

- [constructor](modules_role_role_resolver.RoleResolver.md#constructor)

### Methods

- [role](modules_role_role_resolver.RoleResolver.md#role)
- [roles](modules_role_role_resolver.RoleResolver.md#roles)

## Constructors

### constructor

• **new RoleResolver**(`roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Methods

### role

▸ **role**(`namespace`): `Promise`<[`Role`](modules_role_role_entity.Role.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)\>

___

### roles

▸ **roles**(`owner`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>
