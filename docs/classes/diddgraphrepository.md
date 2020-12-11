**[nest-backend](../README.md)**

# Class: DIDDGraphRepository

## Hierarchy

* **DIDDGraphRepository**

## Index

### Constructors

* [constructor](diddgraphrepository.md#constructor)

### Methods

* [queryAllDIDs](diddgraphrepository.md#queryalldids)
* [queryById](diddgraphrepository.md#querybyid)
* [saveDocument](diddgraphrepository.md#savedocument)

## Constructors

### constructor

\+ **new DIDDGraphRepository**(`dgraph`: [DgraphService](dgraphservice.md)): [DIDDGraphRepository](diddgraphrepository.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [DIDDGraphRepository](diddgraphrepository.md)

## Methods

### queryAllDIDs

▸ **queryAllDIDs**(): Promise<{ id: string  }[]\>

**Returns:** Promise<{ id: string  }[]\>

___

### queryById

▸ **queryById**(`did`: [DID](did.md)): Promise<[DIDDocumentEntity](diddocumententity.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | [DID](did.md) |

**Returns:** Promise<[DIDDocumentEntity](diddocumententity.md)\>

___

### saveDocument

▸ **saveDocument**(`documentDTO`: [DIDDocumentDTO](../interfaces/diddocumentdto.md)): Promise<string\>

#### Parameters:

Name | Type |
------ | ------ |
`documentDTO` | [DIDDocumentDTO](../interfaces/diddocumentdto.md) |

**Returns:** Promise<string\>
