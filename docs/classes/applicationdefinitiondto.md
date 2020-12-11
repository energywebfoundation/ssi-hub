**[nest-backend](../README.md)**

# Class: ApplicationDefinitionDTO

Application's Definition DTO providing validation and API schema for swagger UI

## Hierarchy

* **ApplicationDefinitionDTO**

## Implements

* [AppDefinition](../interfaces/appdefinition.md)

## Index

### Constructors

* [constructor](applicationdefinitiondto.md#constructor)

### Properties

* [appName](applicationdefinitiondto.md#appname)
* [description](applicationdefinitiondto.md#description)
* [dgraph.type](applicationdefinitiondto.md#dgraph.type)
* [logoUrl](applicationdefinitiondto.md#logourl)
* [others](applicationdefinitiondto.md#others)
* [websiteUrl](applicationdefinitiondto.md#websiteurl)

## Constructors

### constructor

\+ **new ApplicationDefinitionDTO**(`data`: [CreateApplicationDefinition](../interfaces/createapplicationdefinition.md)): [ApplicationDefinitionDTO](applicationdefinitiondto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CreateApplicationDefinition](../interfaces/createapplicationdefinition.md) |

**Returns:** [ApplicationDefinitionDTO](applicationdefinitiondto.md)

## Properties

### appName

•  **appName**: string

*Implementation of [AppDefinition](../interfaces/appdefinition.md).[appName](../interfaces/appdefinition.md#appname)*

___

### description

• `Optional` **description**: string

*Implementation of [AppDefinition](../interfaces/appdefinition.md).[description](../interfaces/appdefinition.md#description)*

___

### dgraph.type

• `Readonly` **dgraph.type**: \"AppDefinition\" = "AppDefinition"

___

### logoUrl

• `Optional` **logoUrl**: string

*Implementation of [AppDefinition](../interfaces/appdefinition.md).[logoUrl](../interfaces/appdefinition.md#logourl)*

___

### others

• `Optional` **others**: [KeyValue](../interfaces/keyvalue.md)[] = []

*Implementation of [AppDefinition](../interfaces/appdefinition.md).[others](../interfaces/appdefinition.md#others)*

___

### websiteUrl

• `Optional` **websiteUrl**: string

*Implementation of [AppDefinition](../interfaces/appdefinition.md).[websiteUrl](../interfaces/appdefinition.md#websiteurl)*
