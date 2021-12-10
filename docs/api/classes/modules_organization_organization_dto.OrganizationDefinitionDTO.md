# Class: OrganizationDefinitionDTO

[modules/organization/organization.dto](../modules/modules_organization_organization_dto.md).OrganizationDefinitionDTO

## Implements

- [`BaseEnsDefinition`](../interfaces/common_ENSBaseEntity.BaseEnsDefinition.md)

## Table of contents

### Constructors

- [constructor](modules_organization_organization_dto.OrganizationDefinitionDTO.md#constructor)

### Properties

- [description](modules_organization_organization_dto.OrganizationDefinitionDTO.md#description)
- [logoUrl](modules_organization_organization_dto.OrganizationDefinitionDTO.md#logourl)
- [orgName](modules_organization_organization_dto.OrganizationDefinitionDTO.md#orgname)
- [others](modules_organization_organization_dto.OrganizationDefinitionDTO.md#others)
- [websiteUrl](modules_organization_organization_dto.OrganizationDefinitionDTO.md#websiteurl)

### Methods

- [create](modules_organization_organization_dto.OrganizationDefinitionDTO.md#create)

## Constructors

### constructor

• **new OrganizationDefinitionDTO**()

## Properties

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

### orgName

• **orgName**: `string`

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

▸ `Static` **create**(`data`): `Promise`<[`OrganizationDefinitionDTO`](modules_organization_organization_dto.OrganizationDefinitionDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`OrganizationDefinitionDTO`](modules_organization_organization_dto.OrganizationDefinitionDTO.md)\> |

#### Returns

`Promise`<[`OrganizationDefinitionDTO`](modules_organization_organization_dto.OrganizationDefinitionDTO.md)\>
