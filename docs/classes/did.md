**[iam-cache-server](../README.md)**

# Class: DID

A value object representing EIP-1056 DID

## Hierarchy

* **DID**

## Index

### Constructors

* [constructor](did.md#constructor)

### Properties

* [id](did.md#id)

### Methods

* [validate](did.md#validate)

## Constructors

### constructor

\+ **new DID**(`id`: string): [DID](did.md)

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** [DID](did.md)

## Properties

### id

• `Readonly` **id**: string

A DID in the format of did:ethr:{ethereumAddress}

## Methods

### validate

▸ **validate**(`id`: string): void

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** void
