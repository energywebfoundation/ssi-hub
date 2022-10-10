# Class: RoleIssuerResolver

[modules/claim/resolvers/issuer.resolver](../modules/modules_claim_resolvers_issuer_resolver.md).RoleIssuerResolver

## Implements

- `IssuerResolver`

## Table of contents

### Constructors

- [constructor](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md#constructor)

### Properties

- [roleDefinitionCache](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md#roledefinitioncache)

### Methods

- [getIssuerDefinition](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md#getissuerdefinition)
- [setRoleDefinitionCache](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md#setroledefinitioncache)

## Constructors

### constructor

• **new RoleIssuerResolver**(`roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Properties

### roleDefinitionCache

• **roleDefinitionCache**: `IRoleDefinitionCache`

## Methods

### getIssuerDefinition

▸ **getIssuerDefinition**(`namespace`): `Promise`<`IIssuerDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IIssuerDefinition`\>

#### Implementation of

IssuerResolver.getIssuerDefinition

___

### setRoleDefinitionCache

▸ **setRoleDefinitionCache**(`roleDefCache`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleDefCache` | `IRoleDefinitionCache` |

#### Returns

`void`
