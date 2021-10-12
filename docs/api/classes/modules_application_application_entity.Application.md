# Class: Application

[modules/application/application.entity](../modules/modules_application_application_entity.md).Application

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_application_application_entity.Application.md#constructor)

### Properties

- [definition](modules_application_application_entity.Application.md#definition)
- [id](modules_application_application_entity.Application.md#id)
- [name](modules_application_application_entity.Application.md#name)
- [namehash](modules_application_application_entity.Application.md#namehash)
- [namespace](modules_application_application_entity.Application.md#namespace)
- [owner](modules_application_application_entity.Application.md#owner)
- [parentOrg](modules_application_application_entity.Application.md#parentorg)
- [roles](modules_application_application_entity.Application.md#roles)

### Methods

- [create](modules_application_application_entity.Application.md#create)

## Constructors

### constructor

• **new Application**()

## Properties

### definition

• **definition**: `ApplicationDefinition`

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

### parentOrg

• **parentOrg**: [`Organization`](modules_organization_organization_entity.Organization.md)

___

### roles

• **roles**: [`Role`](modules_role_role_entity.Role.md)[]

## Methods

### create

▸ `Static` **create**(`data`): [`Application`](modules_application_application_entity.Application.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`Application`](modules_application_application_entity.Application.md)\> |

#### Returns

[`Application`](modules_application_application_entity.Application.md)
