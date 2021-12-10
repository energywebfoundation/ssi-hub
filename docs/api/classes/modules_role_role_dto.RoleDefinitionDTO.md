# Class: RoleDefinitionDTO

[modules/role/role.dto](../modules/modules_role_role_dto.md).RoleDefinitionDTO

Role's Definition DTO providing validation and API schema for swagger UI

## Implements

- `IRoleDefinition`

## Table of contents

### Constructors

- [constructor](modules_role_role_dto.RoleDefinitionDTO.md#constructor)

### Properties

- [enrolmentPreconditions](modules_role_role_dto.RoleDefinitionDTO.md#enrolmentpreconditions)
- [fields](modules_role_role_dto.RoleDefinitionDTO.md#fields)
- [issuer](modules_role_role_dto.RoleDefinitionDTO.md#issuer)
- [metadata](modules_role_role_dto.RoleDefinitionDTO.md#metadata)
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

IRoleDefinition.enrolmentPreconditions

___

### fields

• **fields**: [`FieldsDTO`](modules_role_role_dto.FieldsDTO.md)[]

#### Implementation of

IRoleDefinition.fields

___

### issuer

• **issuer**: [`IssuerDTO`](modules_role_role_dto.IssuerDTO.md)

#### Implementation of

IRoleDefinition.issuer

___

### metadata

• **metadata**: `Record`<`string`, `unknown`\>

#### Implementation of

IRoleDefinition.metadata

___

### roleName

• **roleName**: `string`

#### Implementation of

IRoleDefinition.roleName

___

### roleType

• **roleType**: `string`

#### Implementation of

IRoleDefinition.roleType

___

### version

• **version**: `number`

#### Implementation of

IRoleDefinition.version
