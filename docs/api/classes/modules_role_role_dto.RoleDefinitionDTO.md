# Class: RoleDefinitionDTO

[modules/role/role.dto](../modules/modules_role_role_dto.md).RoleDefinitionDTO

Role's Definition DTO providing validation and API schema for swagger UI

## Implements

- `IRoleDefinitionV2`

## Table of contents

### Constructors

- [constructor](modules_role_role_dto.RoleDefinitionDTO.md#constructor)

### Properties

- [enrolmentPreconditions](modules_role_role_dto.RoleDefinitionDTO.md#enrolmentpreconditions)
- [issuer](modules_role_role_dto.RoleDefinitionDTO.md#issuer)
- [issuerFields](modules_role_role_dto.RoleDefinitionDTO.md#issuerfields)
- [metadata](modules_role_role_dto.RoleDefinitionDTO.md#metadata)
- [requestorFields](modules_role_role_dto.RoleDefinitionDTO.md#requestorfields)
- [revoker](modules_role_role_dto.RoleDefinitionDTO.md#revoker)
- [roleName](modules_role_role_dto.RoleDefinitionDTO.md#rolename)
- [roleType](modules_role_role_dto.RoleDefinitionDTO.md#roletype)
- [version](modules_role_role_dto.RoleDefinitionDTO.md#version)

## Constructors

### constructor

• **new RoleDefinitionDTO**()

## Properties

### enrolmentPreconditions

• **enrolmentPreconditions**: [`PreconditionsDTO`](modules_role_role_dto.PreconditionsDTO.md)[]

#### Implementation of

IRoleDefinitionV2.enrolmentPreconditions

___

### issuer

• **issuer**: [`IssuerDTO`](modules_role_role_dto.IssuerDTO.md)

#### Implementation of

IRoleDefinitionV2.issuer

___

### issuerFields

• `Optional` **issuerFields**: [`FieldsDTO`](modules_role_role_dto.FieldsDTO.md)[]

#### Implementation of

IRoleDefinitionV2.issuerFields

___

### metadata

• **metadata**: `Record`<`string`, `unknown`\>

#### Implementation of

IRoleDefinitionV2.metadata

___

### requestorFields

• `Optional` **requestorFields**: [`FieldsDTO`](modules_role_role_dto.FieldsDTO.md)[]

#### Implementation of

IRoleDefinitionV2.requestorFields

___

### revoker

• **revoker**: [`RevokerDTO`](modules_role_role_dto.RevokerDTO.md)

#### Implementation of

IRoleDefinitionV2.revoker

___

### roleName

• **roleName**: `string`

#### Implementation of

IRoleDefinitionV2.roleName

___

### roleType

• **roleType**: `string`

#### Implementation of

IRoleDefinitionV2.roleType

___

### version

• **version**: `number`

#### Implementation of

IRoleDefinitionV2.version
