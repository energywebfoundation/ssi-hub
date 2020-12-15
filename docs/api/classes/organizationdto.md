**[iam-cache-server](../README.md)**

# Class: OrganizationDTO

Organization DTO providing validation and API schema for swagger UI

## Hierarchy

* **OrganizationDTO**

## Implements

* [Organization](../interfaces/organization.md)

## Index

### Constructors

* [constructor](organizationdto.md#constructor)

### Properties

* [apps](organizationdto.md#apps)
* [definition](organizationdto.md#definition)
* [dgraph.type](organizationdto.md#dgraph.type)
* [name](organizationdto.md#name)
* [namespace](organizationdto.md#namespace)
* [owner](organizationdto.md#owner)
* [roles](organizationdto.md#roles)
* [uid](organizationdto.md#uid)

## Constructors

### constructor

\+ **new OrganizationDTO**(`data`: [OrganizationDTOParams](../interfaces/organizationdtoparams.md), `definition`: [OrganizationDefinitionDTO](organizationdefinitiondto.md)): [OrganizationDTO](organizationdto.md)

#### Parameters:

Name | Type |
------ | ------ |
`data` | [OrganizationDTOParams](../interfaces/organizationdtoparams.md) |
`definition` | [OrganizationDefinitionDTO](organizationdefinitiondto.md) |

**Returns:** [OrganizationDTO](organizationdto.md)

## Properties

### apps

•  **apps**: [ApplicationDTO](applicationdto.md)[] = []

*Implementation of [Organization](../interfaces/organization.md).[apps](../interfaces/organization.md#apps)*

___

### definition

•  **definition**: [OrganizationDefinitionDTO](organizationdefinitiondto.md)

*Implementation of [Organization](../interfaces/organization.md).[definition](../interfaces/organization.md#definition)*

___

### dgraph.type

• `Readonly` **dgraph.type**: \"Org\" = "Org"

*Implementation of [Organization](../interfaces/organization.md).[dgraph.type](../interfaces/organization.md#dgraph.type)*

___

### name

•  **name**: string

*Implementation of [Organization](../interfaces/organization.md).[name](../interfaces/organization.md#name)*

___

### namespace

•  **namespace**: string

*Implementation of [Organization](../interfaces/organization.md).[namespace](../interfaces/organization.md#namespace)*

___

### owner

•  **owner**: string

*Implementation of [Organization](../interfaces/organization.md).[owner](../interfaces/organization.md#owner)*

___

### roles

•  **roles**: [RoleDTO](roledto.md)[] = []

*Implementation of [Organization](../interfaces/organization.md).[roles](../interfaces/organization.md#roles)*

___

### uid

• `Optional` **uid**: string

*Implementation of [Organization](../interfaces/organization.md).[uid](../interfaces/organization.md#uid)*
