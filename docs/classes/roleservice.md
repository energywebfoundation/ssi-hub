**[iam-cache-server](../README.md)**

# Class: RoleService

## Hierarchy

* **RoleService**

## Index

### Constructors

* [constructor](roleservice.md#constructor)

### Methods

* [create](roleservice.md#create)
* [exists](roleservice.md#exists)
* [getAll](roleservice.md#getall)
* [getByNamespace](roleservice.md#getbynamespace)
* [getNamespaceOf](roleservice.md#getnamespaceof)
* [splitNamespace](roleservice.md#splitnamespace)
* [updateNamespace](roleservice.md#updatenamespace)

## Constructors

### constructor

\+ **new RoleService**(`dgraph`: [DgraphService](dgraphservice.md)): [RoleService](roleservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [RoleService](roleservice.md)

## Methods

### create

▸ **create**(`data`: [CreateRoleData](../interfaces/createroledata.md)): Promise<string\>

Method for adding new Role to database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [CreateRoleData](../interfaces/createroledata.md) | object containing all needed role properties |

**Returns:** Promise<string\>

id of newly added Role

___

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

return true if role with given namespace exists

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<boolean\>

___

### getAll

▸ **getAll**(): Promise<{ roles: [RoleDTO](roledto.md)[]  }\>

retrieves all existing roles

**Returns:** Promise<{ roles: [RoleDTO](roledto.md)[]  }\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`: string): Promise<[Role](../interfaces/role.md)\>

returns single Role with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<[Role](../interfaces/role.md)\>

___

### getNamespaceOf

▸ **getNamespaceOf**(`fragment?`: \"org\" \| \"app\" \| \"role\", `fragments`: [NamespaceFragments](../interfaces/namespacefragments.md)): string

returns namespace of Org/App/Role based on given namespace fragment and requested namespace type

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`fragment` | \"org\" \| \"app\" \| \"role\" | "org" | type of requested namespace |
`fragments` | [NamespaceFragments](../interfaces/namespacefragments.md) | - | namespace fragments object  |

**Returns:** string

___

### splitNamespace

▸ **splitNamespace**(`namespace`: string): [NamespaceFragments](../interfaces/namespacefragments.md)

extracts names of Organization, Application* and Role* from namespace
* - fragment optional

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | Object with namespace fragments  |

**Returns:** [NamespaceFragments](../interfaces/namespacefragments.md)

___

### updateNamespace

▸ **updateNamespace**(`namespace`: string, `patch`: [CreateRoleData](../interfaces/createroledata.md)): Promise<string\>

Update existing role with given namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | target role's namespace |
`patch` | [CreateRoleData](../interfaces/createroledata.md) |   |

**Returns:** Promise<string\>
