**[iam-cache-server](../README.md)**

# Class: OwnerService

## Hierarchy

* **OwnerService**

## Index

### Constructors

* [constructor](ownerservice.md#constructor)

### Methods

* [changeOwner](ownerservice.md#changeowner)
* [deleteNamespace](ownerservice.md#deletenamespace)
* [getAppsByOwner](ownerservice.md#getappsbyowner)
* [getOrgsByOwner](ownerservice.md#getorgsbyowner)
* [getRolesByOwner](ownerservice.md#getrolesbyowner)

## Constructors

### constructor

\+ **new OwnerService**(`dgraph`: [DgraphService](dgraphservice.md)): [OwnerService](ownerservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [OwnerService](ownerservice.md)

## Methods

### changeOwner

▸ **changeOwner**(`namespace`: string, `newOwner`: string): Promise<any\>

Changes owner of given namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | Target namespace |
`newOwner` | string | New Owner DID  |

**Returns:** Promise<any\>

___

### deleteNamespace

▸ **deleteNamespace**(`namespace`: string): Promise<void\>

Completely deletes namespace with all sub namespaces

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<void\>

___

### getAppsByOwner

▸ **getAppsByOwner**(`owner`: string): Promise<any\>

returns Apps owned by given user

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Owner DID  |

**Returns:** Promise<any\>

___

### getOrgsByOwner

▸ **getOrgsByOwner**(`owner`: string): Promise<any\>

returns Orgs owned by given user

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Owner DID  |

**Returns:** Promise<any\>

___

### getRolesByOwner

▸ **getRolesByOwner**(`owner`: string): Promise<any\>

returns Roles owned by given user

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`owner` | string | Owner DID  |

**Returns:** Promise<any\>
