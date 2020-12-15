**[iam-cache-server](../README.md)**

# Class: NamespaceService

## Hierarchy

* **NamespaceService**

## Index

### Constructors

* [constructor](namespaceservice.md#constructor)

### Methods

* [getByNamespace](namespaceservice.md#getbynamespace)
* [namespaceExists](namespaceservice.md#namespaceexists)
* [searchByText](namespaceservice.md#searchbytext)

## Constructors

### constructor

\+ **new NamespaceService**(`dgraph`: [DgraphService](dgraphservice.md)): [NamespaceService](namespaceservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [NamespaceService](namespaceservice.md)

## Methods

### getByNamespace

▸ **getByNamespace**(`namespace`: string, `full?`: boolean, `types?`: string[]): Promise<[Organization](../interfaces/organization.md) \| [Application](../interfaces/application.md) \| [Role](../interfaces/role.md)\>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`namespace` | string | - |
`full` | boolean | false |
`types?` | string[] | - |

**Returns:** Promise<[Organization](../interfaces/organization.md) \| [Application](../interfaces/application.md) \| [Role](../interfaces/role.md)\>

___

### namespaceExists

▸ **namespaceExists**(`namespace`: string): Promise<boolean\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<boolean\>

___

### searchByText

▸ **searchByText**(`text`: string): Promise<([Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md))[]\>

returns App/Org with namespace matching or similar to provided text

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | string | fragment of namespace string |

**Returns:** Promise<([Application](../interfaces/application.md) \| [Organization](../interfaces/organization.md))[]\>

Array of Apps and Orgs
