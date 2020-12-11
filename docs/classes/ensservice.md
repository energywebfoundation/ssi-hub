**[nest-backend](../README.md)**

# Class: EnsService

## Hierarchy

* **EnsService**

## Index

### Constructors

* [constructor](ensservice.md#constructor)

### Methods

* [createRole](ensservice.md#createrole)
* [eventHandler](ensservice.md#eventhandler)
* [syncENS](ensservice.md#syncens)

## Constructors

### constructor

\+ **new EnsService**(`ownerService`: [OwnerService](ownerservice.md), `roleService`: [RoleService](roleservice.md), `applicationService`: [ApplicationService](applicationservice.md), `organizationService`: [OrganizationService](organizationservice.md), `schedulerRegistry`: SchedulerRegistry, `config`: ConfigService): [EnsService](ensservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`ownerService` | [OwnerService](ownerservice.md) |
`roleService` | [RoleService](roleservice.md) |
`applicationService` | [ApplicationService](applicationservice.md) |
`organizationService` | [OrganizationService](organizationservice.md) |
`schedulerRegistry` | SchedulerRegistry |
`config` | ConfigService |

**Returns:** [EnsService](ensservice.md)

## Methods

### createRole

▸ **createRole**(`__namedParameters`: { data: string ; namespace: string ; owner: string  }): Promise<void\>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: string ; namespace: string ; owner: string  } |

**Returns:** Promise<void\>

___

### eventHandler

▸ **eventHandler**(`hash`: string, `name?`: string): Promise<void\>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |
`name?` | string |

**Returns:** Promise<void\>

___

### syncENS

▸ **syncENS**(): Promise<void\>

**Returns:** Promise<void\>
