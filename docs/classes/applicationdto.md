**[nest-backend](../README.md)**

# Class: ApplicationDTO

Application DTO providing validation and API schema for swagger UI

## Hierarchy

* **ApplicationDTO**

## Implements

* [Application](../interfaces/application.md)

## Index

### Constructors

* [constructor](applicationdto.md#constructor)

### Properties

* [definition](applicationdto.md#definition)
* [dgraph.type](applicationdto.md#dgraph.type)
* [name](applicationdto.md#name)
* [namespace](applicationdto.md#namespace)
* [owner](applicationdto.md#owner)
* [roles](applicationdto.md#roles)
* [uid](applicationdto.md#uid)

## Constructors

### constructor

\+ **new ApplicationDTO**(`data`: [ApplicationDTOParams](../interfaces/applicationdtoparams.md), `definition`: [ApplicationDefinitionDTO](applicationdefinitiondto.md)): [ApplicationDTO](applicationdto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ApplicationDTOParams](../interfaces/applicationdtoparams.md) |
`definition` | [ApplicationDefinitionDTO](applicationdefinitiondto.md) |

**Returns:** [ApplicationDTO](applicationdto.md)

## Properties

### definition

•  **definition**: [ApplicationDefinitionDTO](applicationdefinitiondto.md)

*Implementation of [Application](../interfaces/application.md).[definition](../interfaces/application.md#definition)*

___

### dgraph.type

• `Readonly` **dgraph.type**: \"App\" = "App"

*Implementation of [Application](../interfaces/application.md).[dgraph.type](../interfaces/application.md#dgraph.type)*

___

### name

•  **name**: string

*Implementation of [Application](../interfaces/application.md).[name](../interfaces/application.md#name)*

___

### namespace

•  **namespace**: string

*Implementation of [Application](../interfaces/application.md).[namespace](../interfaces/application.md#namespace)*

___

### owner

•  **owner**: string

*Implementation of [Application](../interfaces/application.md).[owner](../interfaces/application.md#owner)*

___

### roles

•  **roles**: [RoleDTO](roledto.md)[] = []

*Implementation of [Application](../interfaces/application.md).[roles](../interfaces/application.md#roles)*

___

### uid

• `Optional` **uid**: string

*Implementation of [Application](../interfaces/application.md).[uid](../interfaces/application.md#uid)*
