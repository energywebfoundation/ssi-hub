**[iam-cache-server](../README.md)**

# Class: DIDDocumentEntity

## Hierarchy

* **DIDDocumentEntity**

## Index

### Constructors

* [constructor](diddocumententity.md#constructor)

### Properties

* [dgraph.type](diddocumententity.md#dgraph.type)
* [id](diddocumententity.md#id)
* [uid](diddocumententity.md#uid)

### Methods

* [cacheIPFSClaims](diddocumententity.md#cacheipfsclaims)
* [getCachedClaimsMap](diddocumententity.md#getcachedclaimsmap)
* [getDTO](diddocumententity.md#getdto)
* [getLogData](diddocumententity.md#getlogdata)
* [getResolvedDIDDocument](diddocumententity.md#getresolveddiddocument)
* [setLogData](diddocumententity.md#setlogdata)
* [updateLogData](diddocumententity.md#updatelogdata)

## Constructors

### constructor

\+ **new DIDDocumentEntity**(`did`: [DID](did.md), `didDocument?`: [DIDDocumentDTO](../interfaces/diddocumentdto.md)): [DIDDocumentEntity](diddocumententity.md)

#### Parameters:

Name | Type |
------ | ------ |
`did` | [DID](did.md) |
`didDocument?` | [DIDDocumentDTO](../interfaces/diddocumentdto.md) |

**Returns:** [DIDDocumentEntity](diddocumententity.md)

## Properties

### dgraph.type

• `Readonly` **dgraph.type**: \"DIDDocument\" = DID\_DgraphType

___

### id

• `Readonly` **id**: string

DID value, i.e. 'did:ethr:{address}'

___

### uid

• `Readonly` **uid**: string

## Methods

### cacheIPFSClaims

▸ **cacheIPFSClaims**(`ipfsStore`: IDidStore): Promise<void\>

Caches all claims from IPFS which aren't yet cached

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ipfsStore` | IDidStore |   |

**Returns:** Promise<void\>

___

### getCachedClaimsMap

▸ **getCachedClaimsMap**(): Map<string, string\>

Gets claims in Map format

**Returns:** Map<string, string\>

A map of serviceEnpoints to jwt

___

### getDTO

▸ **getDTO**(): [DIDDocumentDTO](../interfaces/diddocumentdto.md)

**Returns:** [DIDDocumentDTO](../interfaces/diddocumentdto.md)

___

### getLogData

▸ **getLogData**(): IDIDLogData

**Returns:** IDIDLogData

___

### getResolvedDIDDocument

▸ **getResolvedDIDDocument**(): Promise<IDIDDocument\>

Resolves a DIDDocument from the entity's logs

**Returns:** Promise<IDIDDocument\>

Resolved DID Document

___

### setLogData

▸ **setLogData**(`newLogData`: IDIDLogData): void

Sets logData to new data
Note: cached claims are maintained

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`newLogData` | IDIDLogData | Log data to set  |

**Returns:** void

___

### updateLogData

▸ **updateLogData**(`newLogData`: IDIDLogData): void

Add new log data to existing logs

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`newLogData` | IDIDLogData | Log data to merge in  |

**Returns:** void
