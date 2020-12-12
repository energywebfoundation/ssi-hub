**[iam-cache-server](../README.md)**

# Class: NamespaceController

## Hierarchy

* **NamespaceController**

## Index

### Constructors

* [constructor](namespacecontroller.md#constructor)

### Methods

* [exists](namespacecontroller.md#exists)
* [get](namespacecontroller.md#get)
* [search](namespacecontroller.md#search)

## Constructors

### constructor

\+ **new NamespaceController**(`namespaceService`: [NamespaceService](namespaceservice.md)): [NamespaceController](namespacecontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`namespaceService` | [NamespaceService](namespaceservice.md) |

**Returns:** [NamespaceController](namespacecontroller.md)

## Methods

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<boolean\>

___

### get

▸ **get**(`namespace`: string, `types`: string[]): Promise<[Role](../interfaces/role.md) \| [Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |
`types` | string[] |

**Returns:** Promise<[Role](../interfaces/role.md) \| [Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md)\>

___

### search

▸ **search**(`search`: string): Promise<([Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md))[]\>

#### Parameters:

Name | Type |
------ | ------ |
`search` | string |

**Returns:** Promise<([Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md))[]\>
