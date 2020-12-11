**[nest-backend](../README.md)**

# Class: IPFSClaimDTO

An IPFS claim as persisted to DGraph

## Hierarchy

* **IPFSClaimDTO**

## Implements

* [DGraphObject](../interfaces/dgraphobject.md)

## Index

### Constructors

* [constructor](ipfsclaimdto.md#constructor)

### Properties

* [dgraph.type](ipfsclaimdto.md#dgraph.type)
* [jwt](ipfsclaimdto.md#jwt)
* [serviceEndpoint](ipfsclaimdto.md#serviceendpoint)
* [uid](ipfsclaimdto.md#uid)

## Constructors

### constructor

\+ **new IPFSClaimDTO**(`jwt`: string, `serviceEndpoint`: string, `uid?`: string): [IPFSClaimDTO](ipfsclaimdto.md)

#### Parameters:

Name | Type |
------ | ------ |
`jwt` | string |
`serviceEndpoint` | string |
`uid?` | string |

**Returns:** [IPFSClaimDTO](ipfsclaimdto.md)

## Properties

### dgraph.type

• `Readonly` **dgraph.type**: \"IPFSClaim\" = DIDDocumentClaim\_DgraphType

*Implementation of [DGraphObject](../interfaces/dgraphobject.md).[dgraph.type](../interfaces/dgraphobject.md#dgraph.type)*

___

### jwt

•  **jwt**: string

___

### serviceEndpoint

•  **serviceEndpoint**: string

___

### uid

• `Readonly` **uid**: string

*Implementation of [DGraphObject](../interfaces/dgraphobject.md).[uid](../interfaces/dgraphobject.md#uid)*
