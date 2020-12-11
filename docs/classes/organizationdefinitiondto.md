**[nest-backend](../README.md)**

# Class: OrganizationDefinitionDTO

Organization's Definition DTO providing validation and API schema for swagger UI

## Hierarchy

* **OrganizationDefinitionDTO**

## Implements

* [OrgDefinition](../interfaces/orgdefinition.md)

## Index

### Constructors

* [constructor](organizationdefinitiondto.md#constructor)

### Properties

* [description](organizationdefinitiondto.md#description)
* [dgraph.type](organizationdefinitiondto.md#dgraph.type)
* [logoUrl](organizationdefinitiondto.md#logourl)
* [orgName](organizationdefinitiondto.md#orgname)
* [others](organizationdefinitiondto.md#others)
* [websiteUrl](organizationdefinitiondto.md#websiteurl)

## Constructors

### constructor

\+ **new OrganizationDefinitionDTO**(`data`: [CreateOrganizationDefinition](../interfaces/createorganizationdefinition.md)): [OrganizationDefinitionDTO](organizationdefinitiondto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CreateOrganizationDefinition](../interfaces/createorganizationdefinition.md) |

**Returns:** [OrganizationDefinitionDTO](organizationdefinitiondto.md)

## Properties

### description

• `Optional` **description**: string

*Implementation of [OrgDefinition](../interfaces/orgdefinition.md).[description](../interfaces/orgdefinition.md#description)*

___

### dgraph.type

• `Readonly` **dgraph.type**: \"OrgDefinition\" = "OrgDefinition"

___

### logoUrl

• `Optional` **logoUrl**: string

*Implementation of [OrgDefinition](../interfaces/orgdefinition.md).[logoUrl](../interfaces/orgdefinition.md#logourl)*

___

### orgName

•  **orgName**: string

*Implementation of [OrgDefinition](../interfaces/orgdefinition.md).[orgName](../interfaces/orgdefinition.md#orgname)*

___

### others

•  **others**: [KeyValue](../interfaces/keyvalue.md)[] = []

*Implementation of [OrgDefinition](../interfaces/orgdefinition.md).[others](../interfaces/orgdefinition.md#others)*

___

### websiteUrl

• `Optional` **websiteUrl**: string

*Implementation of [OrgDefinition](../interfaces/orgdefinition.md).[websiteUrl](../interfaces/orgdefinition.md#websiteurl)*
