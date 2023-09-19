# Class: RoleDTO

[modules/role/role.dto](../modules/modules_role_role_dto.md).RoleDTO

Role DTO providing validation and API schema for swagger UI

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_role_role_dto.RoleDTO.md#constructor)

### Properties

- [appNamespace](modules_role_role_dto.RoleDTO.md#appnamespace)
- [definition](modules_role_role_dto.RoleDTO.md#definition)
- [name](modules_role_role_dto.RoleDTO.md#name)
- [namehash](modules_role_role_dto.RoleDTO.md#namehash)
- [namespace](modules_role_role_dto.RoleDTO.md#namespace)
- [orgNamespace](modules_role_role_dto.RoleDTO.md#orgnamespace)
- [owner](modules_role_role_dto.RoleDTO.md#owner)

### Methods

- [create](modules_role_role_dto.RoleDTO.md#create)

## Constructors

### constructor

• **new RoleDTO**()

## Properties

### appNamespace

• `Optional` **appNamespace**: `string`

___

### definition

• **definition**: [`RoleDefinitionDTO`](modules_role_role_dto.RoleDefinitionDTO.md)

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[definition](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#definition)

___

### name

• **name**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[name](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#name)

___

### namehash

• **namehash**: `string`

___

### namespace

• **namespace**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[namespace](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#namespace)

___

### orgNamespace

• `Optional` **orgNamespace**: `string`

___

### owner

• **owner**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[owner](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#owner)

## Methods

### create

▸ `Static` **create**(`«destructured»`): `Promise`<[`RoleDTO`](modules_role_role_dto.RoleDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Partial`<[`RoleDTO`](modules_role_role_dto.RoleDTO.md)\> |

#### Returns

`Promise`<[`RoleDTO`](modules_role_role_dto.RoleDTO.md)\>
