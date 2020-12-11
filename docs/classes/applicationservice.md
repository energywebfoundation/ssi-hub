**[nest-backend](../README.md)**

# Class: ApplicationService

## Hierarchy

* **ApplicationService**

## Index

### Constructors

* [constructor](applicationservice.md#constructor)

### Methods

* [addRole](applicationservice.md#addrole)
* [create](applicationservice.md#create)
* [exists](applicationservice.md#exists)
* [getAll](applicationservice.md#getall)
* [getByNamespace](applicationservice.md#getbynamespace)
* [getRoles](applicationservice.md#getroles)
* [updateNamespace](applicationservice.md#updatenamespace)

## Constructors

### constructor

\+ **new ApplicationService**(`dgraph`: [DgraphService](dgraphservice.md)): [ApplicationService](applicationservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [ApplicationService](applicationservice.md)

## Methods

### addRole

▸ **addRole**(`id`: string, `roleId`: string): Promise<string\>

Creates connection between Application and Role

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | Id of target organization |
`roleId` | string |   |

**Returns:** Promise<string\>

___

### create

▸ **create**(`data`: [CreateApplicationData](../interfaces/createapplicationdata.md)): Promise<any\>

Method for adding new App to database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [CreateApplicationData](../interfaces/createapplicationdata.md) | object containing all needed App properties |

**Returns:** Promise<any\>

id of newly added App

___

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

return true if App with given namespace exists

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<boolean\>

___

### getAll

▸ **getAll**(): Promise<any\>

retrieves all existing applications

**Returns:** Promise<any\>

___

### getByNamespace

▸ **getByNamespace**(`namespace`: string): Promise<[Application](../interfaces/application.md)\>

returns single App with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<[Application](../interfaces/application.md)\>

___

### getRoles

▸ **getRoles**(`namespace`: string): Promise<{ Data: any = app.roles }\>

Returns all Roles belonging to Application with matching namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string |   |

**Returns:** Promise<{ Data: any = app.roles }\>

___

### updateNamespace

▸ **updateNamespace**(`namespace`: string, `patch`: [CreateApplicationData](../interfaces/createapplicationdata.md)): Promise<string\>

Update existing App with given namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | target App's namespace |
`patch` | [CreateApplicationData](../interfaces/createapplicationdata.md) |   |

**Returns:** Promise<string\>
