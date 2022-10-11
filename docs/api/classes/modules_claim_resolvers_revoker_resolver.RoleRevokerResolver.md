# Class: RoleRevokerResolver

[modules/claim/resolvers/revoker.resolver](../modules/modules_claim_resolvers_revoker_resolver.md).RoleRevokerResolver

## Implements

- `RevokerResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#constructor)

### Methods

- [getRevokerDefinition](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md#getrevokerdefinition)

## Constructors

### constructor

• **new RoleRevokerResolver**(`roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Methods

### getRevokerDefinition

▸ **getRevokerDefinition**(`namespace`, `roleDefCache`): `Promise`<`IRevokerDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |
| `roleDefCache` | `IRoleDefinitionCache` |

#### Returns

`Promise`<`IRevokerDefinition`\>

#### Implementation of

RevokerResolver.getRevokerDefinition
