**[iam-cache-server](../README.md)**

# Class: DIDController

## Hierarchy

* **DIDController**

## Index

### Constructors

* [constructor](didcontroller.md#constructor)

### Methods

* [getById](didcontroller.md#getbyid)
* [upsertById](didcontroller.md#upsertbyid)

## Constructors

### constructor

\+ **new DIDController**(`didService`: [DIDService](didservice.md), `didQueue`: Queue<string\>): [DIDController](didcontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`didService` | [DIDService](didservice.md) |
`didQueue` | Queue<string\> |

**Returns:** [DIDController](didcontroller.md)

## Methods

### getById

▸ **getById**(`id`: string, `includeClaimsString`: string): Promise<IDIDDocument\>

Retrieves a cached DID Document

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The DID to retrieve |
`includeClaimsString` | string | true/false string as to whether or not to return full claim data |

**Returns:** Promise<IDIDDocument\>

A DID Document representation which optionally includes full claims. Returns 404 if not in cache.

___

### upsertById

▸ **upsertById**(`id`: string): Promise<void\>

Queues a DID to have its DID Document cached.
Remark: Once a DID Document has been cached, it will be periodically refreshed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The DID to cache  |

**Returns:** Promise<void\>
