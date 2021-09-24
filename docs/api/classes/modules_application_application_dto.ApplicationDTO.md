# Class: ApplicationDTO

[modules/application/application.dto](../modules/modules_application_application_dto.md).ApplicationDTO

Application DTO providing validation and API schema for swagger UI

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_application_application_dto.ApplicationDTO.md#constructor)

### Properties

- [definition](modules_application_application_dto.ApplicationDTO.md#definition)
- [name](modules_application_application_dto.ApplicationDTO.md#name)
- [namehash](modules_application_application_dto.ApplicationDTO.md#namehash)
- [namespace](modules_application_application_dto.ApplicationDTO.md#namespace)
- [owner](modules_application_application_dto.ApplicationDTO.md#owner)
- [parentOrg](modules_application_application_dto.ApplicationDTO.md#parentorg)

### Methods

- [create](modules_application_application_dto.ApplicationDTO.md#create)

## Constructors

### constructor

• **new ApplicationDTO**()

## Properties

### definition

• **definition**: [`ApplicationDefinitionDTO`](modules_application_application_dto.ApplicationDefinitionDTO.md)

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

### owner

• **owner**: `string`

#### Implementation of

[BaseEnsEntity](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md).[owner](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md#owner)

___

### parentOrg

• **parentOrg**: `string`

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ApplicationDTO`](modules_application_application_dto.ApplicationDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ApplicationDTO`](modules_application_application_dto.ApplicationDTO.md)\> |

#### Returns

`Promise`<[`ApplicationDTO`](modules_application_application_dto.ApplicationDTO.md)\>
