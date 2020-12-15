**[iam-cache-server](../README.md)**

# Class: RoleDefinitionDTO

Role's Definition DTO providing validation and API schema for swagger UI

## Hierarchy

* **RoleDefinitionDTO**

## Implements

* [RoleDefinition](../interfaces/roledefinition.md)

## Index

### Constructors

* [constructor](roledefinitiondto.md#constructor)

### Properties

* [dgraph.type](roledefinitiondto.md#dgraph.type)
* [fields](roledefinitiondto.md#fields)
* [issuer](roledefinitiondto.md#issuer)
* [metadata](roledefinitiondto.md#metadata)
* [roleName](roledefinitiondto.md#rolename)
* [roleType](roledefinitiondto.md#roletype)
* [version](roledefinitiondto.md#version)

## Constructors

### constructor

\+ **new RoleDefinitionDTO**(`data`: [RoleDTODefinitionData](../interfaces/roledtodefinitiondata.md)): [RoleDefinitionDTO](roledefinitiondto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [RoleDTODefinitionData](../interfaces/roledtodefinitiondata.md) |

**Returns:** [RoleDefinitionDTO](roledefinitiondto.md)

## Properties

### dgraph.type

• `Readonly` **dgraph.type**: \"RoleDefinition\" = "RoleDefinition"

___

### fields

•  **fields**: { fieldType: string ; label: string ; validation: string  }[]

*Implementation of [RoleDefinition](../interfaces/roledefinition.md).[fields](../interfaces/roledefinition.md#fields)*

___

### issuer

•  **issuer**: { did: string[] ; issuerType: string ; roleName: string  }

*Implementation of [RoleDefinition](../interfaces/roledefinition.md).[issuer](../interfaces/roledefinition.md#issuer)*

#### Type declaration:

Name | Type |
------ | ------ |
`did` | string[] |
`issuerType` | string |
`roleName` | string |

___

### metadata

•  **metadata**: [KeyValue](../interfaces/keyvalue.md)[]

*Implementation of [RoleDefinition](../interfaces/roledefinition.md).[metadata](../interfaces/roledefinition.md#metadata)*

___

### roleName

•  **roleName**: string

*Implementation of [RoleDefinition](../interfaces/roledefinition.md).[roleName](../interfaces/roledefinition.md#rolename)*

___

### roleType

•  **roleType**: string

*Implementation of [RoleDefinition](../interfaces/roledefinition.md).[roleType](../interfaces/roledefinition.md#roletype)*

___

### version

•  **version**: string
