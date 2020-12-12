**[iam-cache-server](../README.md)**

# Interface: DIDDocumentDTO

DIDDocument as persisted to DGraph

## Hierarchy

* [DGraphObject](dgraphobject.md)

  ↳ **DIDDocumentDTO**

## Index

### Properties

* [claims](diddocumentdto.md#claims)
* [dgraph.type](diddocumentdto.md#dgraph.type)
* [id](diddocumentdto.md#id)
* [logs](diddocumentdto.md#logs)
* [uid](diddocumentdto.md#uid)

## Properties

### claims

•  **claims**: [IPFSClaimDTO](../classes/ipfsclaimdto.md)[]

___

### dgraph.type

• `Optional` **dgraph.type**: string

*Inherited from [DGraphObject](dgraphobject.md).[dgraph.type](dgraphobject.md#dgraph.type)*

___

### id

•  **id**: string

___

### logs

•  **logs**: string

JSON serialized IDIDLogData from did-resolver-interface
Deserialized logs could potentially be persisted but it would require a more complicated model structure

___

### uid

• `Optional` **uid**: string

*Inherited from [DGraphObject](dgraphobject.md).[uid](dgraphobject.md#uid)*
