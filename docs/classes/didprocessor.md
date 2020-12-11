**[nest-backend](../README.md)**

# Class: DIDProcessor

## Hierarchy

* **DIDProcessor**

## Index

### Constructors

* [constructor](didprocessor.md#constructor)

### Methods

* [processDIDDocumentRefresh](didprocessor.md#processdiddocumentrefresh)
* [processDIDDocumentUpsert](didprocessor.md#processdiddocumentupsert)

## Constructors

### constructor

\+ **new DIDProcessor**(`didService`: [DIDService](didservice.md)): [DIDProcessor](didprocessor.md)

#### Parameters:

Name | Type |
------ | ------ |
`didService` | [DIDService](didservice.md) |

**Returns:** [DIDProcessor](didprocessor.md)

## Methods

### processDIDDocumentRefresh

▸ **processDIDDocumentRefresh**(`job`: Job<string\>): Promise<void\>

#### Parameters:

Name | Type |
------ | ------ |
`job` | Job<string\> |

**Returns:** Promise<void\>

___

### processDIDDocumentUpsert

▸ **processDIDDocumentUpsert**(`job`: Job<string\>): Promise<void\>

#### Parameters:

Name | Type |
------ | ------ |
`job` | Job<string\> |

**Returns:** Promise<void\>
