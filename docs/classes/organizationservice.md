**[nest-backend](../README.md)**

# Class: OrganizationService

## Hierarchy

* **OrganizationService**

## Index

### Constructors

* [constructor](organizationservice.md#constructor)

### Methods

* [addApp](organizationservice.md#addapp)
* [addRole](organizationservice.md#addrole)
* [create](organizationservice.md#create)
* [exists](organizationservice.md#exists)
* [getAll](organizationservice.md#getall)
* [getApps](organizationservice.md#getapps)
* [getByNamespace](organizationservice.md#getbynamespace)
* [getRoles](organizationservice.md#getroles)
* [remove](organizationservice.md#remove)
* [updateNamespace](organizationservice.md#updatenamespace)

## Constructors

### constructor

\+ **new OrganizationService**(`dgraph`: [DgraphService](dgraphservice.md)): [OrganizationService](organizationservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [OrganizationService](organizationservice.md)

## Methods

### addApp

▸ **addApp**(`id`: string, `appId`: string): Promise<string\>

Creates connection between Organization and Application

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | Id of target organization |
`appId` | string | App Id  |

**Returns:** Promise<string\>

___

### addRole

▸ **addRole**(`id`: string, `roleId`: string): Promise<string\>

Creates connection between Organization and Role

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | Id of target organization |
`roleId` | string |   |

**Returns:** Promise<string\>

___

### create

▸ **create**(`data`: [CreateOrganizationData](../interfaces/createorganizationdata.md)): Promise<string\>

Method for adding new Org to database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [CreateOrganizationData](../interfaces/createorganizationdata.md) | object containing all needed Org properties |

**Returns:** Promise<string\>

id of newly added Org

___

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

return true if Org with given namespace exists

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<boolean\>

___

### getAll

▸ **getAll**(): Promise<any\>

retrieves all existing organizations

**Returns:** Promise<any\>

___

### getApps

▸ **getApps**(`namespace`: string): Promise<{ Data: any = org.apps }\>

Returns all Apps belonging to Organization with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<{ Data: any = org.apps }\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`: string): Promise<[OrganizationDTO](organizationdto.md)\>

returns single Org with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<[OrganizationDTO](organizationdto.md)\>

___

### getRoles

▸ **getRoles**(`namespace`: string): Promise<{ Data: any = org.roles }\>

Returns all Role belonging to Organization with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<{ Data: any = org.roles }\>

___

### remove

▸ **remove**(`namespace`: string): Promise<void\>

removes Organization with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<void\>

___

### updateNamespace

▸ **updateNamespace**(`namespace`: string, `patch`: [CreateOrganizationData](../interfaces/createorganizationdata.md)): Promise<string\>

Update existing Org with given namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | target Org's namespace |
`patch` | [CreateOrganizationData](../interfaces/createorganizationdata.md) |   |

**Returns:** Promise<string\>
