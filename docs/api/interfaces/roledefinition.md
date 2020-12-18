**[iam-cache-server](../README.md)**

# Interface: RoleDefinition

Interface describing generic Role's Definition model

## Hierarchy

* [Definition](definition.md)

  ↳ **RoleDefinition**

## Implemented by

* [RoleDefinitionDTO](../classes/roledefinitiondto.md)

## Index

### Properties

* [appName](roledefinition.md#appname)
* [fields](roledefinition.md#fields)
* [issuer](roledefinition.md#issuer)
* [metadata](roledefinition.md#metadata)
* [orgName](roledefinition.md#orgname)
* [roleName](roledefinition.md#rolename)
* [roleType](roledefinition.md#roletype)
* [uid](roledefinition.md#uid)

## Properties

### appName

• `Optional` **appName**: string

*Inherited from [OrgDefinition](orgdefinition.md).[appName](orgdefinition.md#appname)*

___

### fields

•  **fields**: { fieldType: string ; label: string ; uid?: string ; validation: string  }[]

___

### issuer

•  **issuer**: { did: string[] ; issuerType: string ; uid?: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`did` | string[] |
`issuerType` | string |
`uid?` | string |

___

### metadata

•  **metadata**: [KeyValue](keyvalue.md)[]

___

### orgName

• `Optional` **orgName**: string

*Inherited from [AppDefinition](appdefinition.md).[orgName](appdefinition.md#orgname)*

___

### roleName

•  **roleName**: string

*Overrides [AppDefinition](appdefinition.md).[roleName](appdefinition.md#rolename)*

___

### roleType

•  **roleType**: string

___

### uid

• `Optional` **uid**: string
