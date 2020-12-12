**[iam-cache-server](../README.md)**

# Class: DIDService

## Hierarchy

* **DIDService**

## Index

### Constructors

* [constructor](didservice.md#constructor)

### Methods

* [getById](didservice.md#getbyid)
* [refreshCachedDocument](didservice.md#refreshcacheddocument)
* [upsertCachedDocument](didservice.md#upsertcacheddocument)

## Constructors

### constructor

\+ **new DIDService**(`config`: ConfigService, `schedulerRegistry`: SchedulerRegistry, `resolverFactory`: [ResolverFactory](resolverfactory.md), `didRepository`: [DIDDGraphRepository](diddgraphrepository.md), `didQueue`: Queue<string\>): [DIDService](didservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`config` | ConfigService |
`schedulerRegistry` | SchedulerRegistry |
`resolverFactory` | [ResolverFactory](resolverfactory.md) |
`didRepository` | [DIDDGraphRepository](diddgraphrepository.md) |
`didQueue` | Queue<string\> |

**Returns:** [DIDService](didservice.md)

## Methods

### getById

▸ **getById**(`did`: [DID](did.md), `enhanceWithClaims?`: boolean): Promise<IDIDDocument\>

Retrieves a DID Document for a given DID

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`did` | [DID](did.md) | - | DID whose document should be retrieved |
`enhanceWithClaims` | boolean | false |  |

**Returns:** Promise<IDIDDocument\>

Resolved DID Document. Null if no Document is not cached.

___

### refreshCachedDocument

▸ **refreshCachedDocument**(`did`: [DID](did.md)): Promise<void\>

Refresh the DID Document cache for a given DID.
Also retrieves all claims from IPFS for the document.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`did` | [DID](did.md) |   |

**Returns:** Promise<void\>

___

### upsertCachedDocument

▸ **upsertCachedDocument**(`did`: [DID](did.md)): Promise<void\>

Insert or update the DID Document cache for a given DID.
Also retrieves all claims from IPFS for the document.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`did` | [DID](did.md) |   |

**Returns:** Promise<void\>
