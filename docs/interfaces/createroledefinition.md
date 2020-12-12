**[iam-cache-server](../README.md)**

# Interface: CreateRoleDefinition

Interface describing raw data required for creation of Role's Definition DTO

## Hierarchy

* **CreateRoleDefinition**

## Index

### Properties

* [fields](createroledefinition.md#fields)
* [issuer](createroledefinition.md#issuer)
* [metadata](createroledefinition.md#metadata)
* [roleName](createroledefinition.md#rolename)
* [roleType](createroledefinition.md#roletype)
* [version](createroledefinition.md#version)

## Properties

### fields

•  **fields**: { fieldType: string ; label: string ; validation: string  }[]

___

### issuer

•  **issuer**: { did: string[] ; issuerType: string ; roleName: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`did` | string[] |
`issuerType` | string |
`roleName` | string |

___

### metadata

•  **metadata**: Record<string, string\>

___

### roleName

•  **roleName**: string

___

### roleType

•  **roleType**: \"custom\"

___

### version

•  **version**: string
