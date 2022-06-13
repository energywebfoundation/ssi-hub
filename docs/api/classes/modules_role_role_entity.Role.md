# Class: Role

[modules/role/role.entity](../modules/modules_role_role_entity.md).Role

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_role_role_entity.Role.md#constructor)

### Properties

- [definition](modules_role_role_entity.Role.md#definition)
- [id](modules_role_role_entity.Role.md#id)
- [name](modules_role_role_entity.Role.md#name)
- [namehash](modules_role_role_entity.Role.md#namehash)
- [namespace](modules_role_role_entity.Role.md#namespace)
- [owner](modules_role_role_entity.Role.md#owner)
- [parentApp](modules_role_role_entity.Role.md#parentapp)
- [parentOrg](modules_role_role_entity.Role.md#parentorg)

### Methods

- [create](modules_role_role_entity.Role.md#create)

## Constructors

### constructor

• **new Role**()

## Properties

### definition

• **definition**: `IRoleDefinitionV2`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[definition](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#definition)

___

### id

• **id**: `number`

___

### name

• **name**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[name](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#name)

___

### namehash

• `Optional` **namehash**: `string`

___

### namespace

• **namespace**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[namespace](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#namespace)

___

### owner

• **owner**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[owner](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#owner)

___

### parentApp

• **parentApp**: [`Application`](modules_application_application_entity.Application.md)

___

### parentOrg

• **parentOrg**: [`Organization`](modules_organization_organization_entity.Organization.md)

## Methods

### create

▸ `Static` **create**(`data`): [`Role`](modules_role_role_entity.Role.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`Role`](modules_role_role_entity.Role.md)\> |

#### Returns

[`Role`](modules_role_role_entity.Role.md)
