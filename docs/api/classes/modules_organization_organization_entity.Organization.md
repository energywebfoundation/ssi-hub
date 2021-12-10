# Class: Organization

[modules/organization/organization.entity](../modules/modules_organization_organization_entity.md).Organization

## Implements

- [`BaseEnsEntity`](../interfaces/common_ENSBaseEntity.BaseEnsEntity.md)

## Table of contents

### Constructors

- [constructor](modules_organization_organization_entity.Organization.md#constructor)

### Properties

- [apps](modules_organization_organization_entity.Organization.md#apps)
- [definition](modules_organization_organization_entity.Organization.md#definition)
- [id](modules_organization_organization_entity.Organization.md#id)
- [name](modules_organization_organization_entity.Organization.md#name)
- [namehash](modules_organization_organization_entity.Organization.md#namehash)
- [namespace](modules_organization_organization_entity.Organization.md#namespace)
- [owner](modules_organization_organization_entity.Organization.md#owner)
- [parentOrg](modules_organization_organization_entity.Organization.md#parentorg)
- [roles](modules_organization_organization_entity.Organization.md#roles)
- [subOrgs](modules_organization_organization_entity.Organization.md#suborgs)

### Methods

- [create](modules_organization_organization_entity.Organization.md#create)

## Constructors

### constructor

• **new Organization**()

## Properties

### apps

• **apps**: [`Application`](modules_application_application_entity.Application.md)[]

___

### definition

• **definition**: `OrganizationDefinition`

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

___

### subOrgs

• **subOrgs**: [`Organization`](modules_organization_organization_entity.Organization.md)[]

## Methods

### create

▸ `Static` **create**(`data`): [`Organization`](modules_organization_organization_entity.Organization.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`Organization`](modules_organization_organization_entity.Organization.md)\> |

#### Returns

[`Organization`](modules_organization_organization_entity.Organization.md)
