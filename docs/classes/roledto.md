**[iam-cache-server](../README.md)**

# Class: RoleDTO

Role DTO providing validation and API schema for swagger UI

## Hierarchy

* **RoleDTO**

## Implements

* [Role](../interfaces/role.md)

## Index

### Constructors

* [constructor](roledto.md#constructor)

### Properties

* [definition](roledto.md#definition)
* [dgraph.type](roledto.md#dgraph.type)
* [name](roledto.md#name)
* [namespace](roledto.md#namespace)
* [owner](roledto.md#owner)
* [uid](roledto.md#uid)

## Constructors

### constructor

\+ **new RoleDTO**(`data`: [RoleDTOData](../interfaces/roledtodata.md), `definition`: [RoleDefinitionDTO](roledefinitiondto.md)): [RoleDTO](roledto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [RoleDTOData](../interfaces/roledtodata.md) |
`definition` | [RoleDefinitionDTO](roledefinitiondto.md) |

**Returns:** [RoleDTO](roledto.md)

## Properties

### definition

•  **definition**: [RoleDefinitionDTO](roledefinitiondto.md)

*Implementation of [Role](../interfaces/role.md).[definition](../interfaces/role.md#definition)*

___

### dgraph.type

• `Readonly` **dgraph.type**: \"Role\" = "Role"

*Implementation of [Role](../interfaces/role.md).[dgraph.type](../interfaces/role.md#dgraph.type)*

___

### name

•  **name**: string

*Implementation of [Role](../interfaces/role.md).[name](../interfaces/role.md#name)*

___

### namespace

•  **namespace**: string

*Implementation of [Role](../interfaces/role.md).[namespace](../interfaces/role.md#namespace)*

___

### owner

•  **owner**: string

*Implementation of [Role](../interfaces/role.md).[owner](../interfaces/role.md#owner)*

___

### uid

• `Optional` **uid**: string

*Implementation of [Role](../interfaces/role.md).[uid](../interfaces/role.md#uid)*
