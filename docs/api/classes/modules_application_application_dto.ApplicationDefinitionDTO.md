# Class: ApplicationDefinitionDTO

[modules/application/application.dto](../modules/modules_application_application_dto.md).ApplicationDefinitionDTO

Application's Definition DTO providing validation and API schema for swagger UI

## Implements

- [`BaseEnsDefinition`](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md)

## Table of contents

### Constructors

- [constructor](modules_application_application_dto.ApplicationDefinitionDTO.md#constructor)

### Properties

- [appName](modules_application_application_dto.ApplicationDefinitionDTO.md#appname)
- [description](modules_application_application_dto.ApplicationDefinitionDTO.md#description)
- [logoUrl](modules_application_application_dto.ApplicationDefinitionDTO.md#logourl)
- [others](modules_application_application_dto.ApplicationDefinitionDTO.md#others)
- [websiteUrl](modules_application_application_dto.ApplicationDefinitionDTO.md#websiteurl)

### Methods

- [create](modules_application_application_dto.ApplicationDefinitionDTO.md#create)

## Constructors

### constructor

• **new ApplicationDefinitionDTO**()

## Properties

### appName

• **appName**: `string`

___

### description

• `Optional` **description**: `string`

#### Implementation of

[BaseEnsDefinition](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md).[description](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md#description)

___

### logoUrl

• `Optional` **logoUrl**: `string`

#### Implementation of

[BaseEnsDefinition](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md).[logoUrl](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md#logourl)

___

### others

• `Optional` **others**: `Record`<`string`, `unknown`\>

#### Implementation of

[BaseEnsDefinition](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md).[others](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md#others)

___

### websiteUrl

• `Optional` **websiteUrl**: `string`

#### Implementation of

[BaseEnsDefinition](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md).[websiteUrl](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md#websiteurl)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`ApplicationDefinitionDTO`](modules_application_application_dto.ApplicationDefinitionDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`ApplicationDefinitionDTO`](modules_application_application_dto.ApplicationDefinitionDTO.md)\> |

#### Returns

`Promise`<[`ApplicationDefinitionDTO`](modules_application_application_dto.ApplicationDefinitionDTO.md)\>
