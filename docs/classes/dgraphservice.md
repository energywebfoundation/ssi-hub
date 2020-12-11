**[nest-backend](../README.md)**

# Class: DgraphService

## Hierarchy

* **DgraphService**

## Index

### Constructors

* [constructor](dgraphservice.md#constructor)

### Methods

* [close](dgraphservice.md#close)
* [delete](dgraphservice.md#delete)
* [migrate](dgraphservice.md#migrate)
* [mutate](dgraphservice.md#mutate)
* [query](dgraphservice.md#query)

## Constructors

### constructor

\+ **new DgraphService**(`configService`: ConfigService): [DgraphService](dgraphservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`configService` | ConfigService |

**Returns:** [DgraphService](dgraphservice.md)

## Methods

### close

▸ **close**(): void

Closes/Ends connection to Dgraph

**Returns:** void

___

### delete

▸ **delete**(`ids`: string \| string[]): Promise<Response\>

Removes nodes with matching ids from database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ids` | string \| string[] | ID or array of IDs  |

**Returns:** Promise<Response\>

___

### migrate

▸ **migrate**(): Promise<void\>

Method for updating dgraph schemas, triggers every time after initial server startup

**Returns:** Promise<void\>

___

### mutate

▸ **mutate**(`data`: unknown): Promise<Response\>

performs update on dgraph database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | unknown | Mutation data  |

**Returns:** Promise<Response\>

___

### query

▸ **query**(`query`: string, `params?`: Record<string, any\>): Promise<Response\>

Query data

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`query` | string | Query string |
`params?` | Record<string, any\> | Params  |

**Returns:** Promise<Response\>
