# Class: OrganizationDTO

[modules/organization/organization.dto](../modules/modules_organization_organization_dto.md).OrganizationDTO

Organization DTO providing validation and API schema for swagger UI

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_organization_organization_dto.OrganizationDTO.md#constructor)

### Properties

- [definition](modules_organization_organization_dto.OrganizationDTO.md#definition)
- [name](modules_organization_organization_dto.OrganizationDTO.md#name)
- [namehash](modules_organization_organization_dto.OrganizationDTO.md#namehash)
- [namespace](modules_organization_organization_dto.OrganizationDTO.md#namespace)
- [owner](modules_organization_organization_dto.OrganizationDTO.md#owner)
- [parentOrg](modules_organization_organization_dto.OrganizationDTO.md#parentorg)

### Methods

- [create](modules_organization_organization_dto.OrganizationDTO.md#create)

## Constructors

### constructor

• **new OrganizationDTO**()

## Properties

### definition

• **definition**: [`OrganizationDefinitionDTO`](modules_organization_organization_dto.OrganizationDefinitionDTO.md)

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

▸ `Static` **create**(`data`): `Promise`<[`OrganizationDTO`](modules_organization_organization_dto.OrganizationDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`OrganizationDTO`](modules_organization_organization_dto.OrganizationDTO.md)\> |

#### Returns

`Promise`<[`OrganizationDTO`](modules_organization_organization_dto.OrganizationDTO.md)\>
