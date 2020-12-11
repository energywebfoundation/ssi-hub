**[nest-backend](../README.md)**

# Class: RoleController

## Hierarchy

* **RoleController**

## Index

### Constructors

* [constructor](rolecontroller.md#constructor)

### Methods

* [exists](rolecontroller.md#exists)
* [getAll](rolecontroller.md#getall)
* [getById](rolecontroller.md#getbyid)

## Constructors

### constructor

\+ **new RoleController**(`roleService`: [RoleService](roleservice.md)): [RoleController](rolecontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`roleService` | [RoleService](roleservice.md) |

**Returns:** [RoleController](rolecontroller.md)

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

▸ **getAll**(): Promise<{ roles: [RoleDTO](roledto.md)[]  }\>

**Returns:** Promise<{ roles: [RoleDTO](roledto.md)[]  }\>

___

### getById

▸ **getById**(`namespace`: string): Promise<[Role](../interfaces/role.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<[Role](../interfaces/role.md)\>
