# Class: RoleRevokerResolver

[modules/claim/resolvers/revoker.resolver](../modules/modules_claim_resolvers_revoker_resolver.md).RoleRevokerResolver

## Implements

- `RevokerResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#constructor)

### Properties

- [roleDefinitionCache](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#roledefinitioncache)

### Methods

- [getRevokerDefinition](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#getrevokerdefinition)
- [setRoleDefinitionCache](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#setroledefinitioncache)

## Constructors

### constructor

• **new RoleRevokerResolver**(`roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Properties

### roleDefinitionCache

• **roleDefinitionCache**: `IRoleDefinitionCache`

## Methods

### getRevokerDefinition

▸ **getRevokerDefinition**(`namespace`): `Promise`<`IRevokerDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRevokerDefinition`\>

#### Implementation of

RevokerResolver.getRevokerDefinition

___

### setRoleDefinitionCache

▸ **setRoleDefinitionCache**(`roleDefCache`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleDefCache` | `IRoleDefinitionCache` |

#### Returns

`void`
