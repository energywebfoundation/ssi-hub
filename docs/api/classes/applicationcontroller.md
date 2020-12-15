**[iam-cache-server](../README.md)**

# Class: ApplicationController

## Hierarchy

* **ApplicationController**

## Index

### Constructors

* [constructor](applicationcontroller.md#constructor)

### Methods

* [exists](applicationcontroller.md#exists)
* [getAll](applicationcontroller.md#getall)
* [getById](applicationcontroller.md#getbyid)
* [getRolesByAppId](applicationcontroller.md#getrolesbyappid)

## Constructors

### constructor

\+ **new ApplicationController**(`applicationService`: [ApplicationService](applicationservice.md)): [ApplicationController](applicationcontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`applicationService` | [ApplicationService](applicationservice.md) |

**Returns:** [ApplicationController](applicationcontroller.md)

## Methods

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<boolean\>

___

### getAll

▸ **getAll**(): Promise<any\>

**Returns:** Promise<any\>

___

### getById

▸ **getById**(`namespace`: string): Promise<[Application](../interfaces/application.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<[Application](../interfaces/application.md)\>

___

### getRolesByAppId

▸ **getRolesByAppId**(`namespace`: string): Promise<{ Data: any = app.roles }\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<{ Data: any = app.roles }\>
