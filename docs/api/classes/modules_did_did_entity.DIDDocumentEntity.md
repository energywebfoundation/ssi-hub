# Class: DIDDocumentEntity

[modules/did/did.entity](../modules/modules_did_did_entity.md).DIDDocumentEntity

## Implements

- `IDIDDocument`

## Table of contents

### Constructors

- [constructor](modules_did_did_entity.DIDDocumentEntity.md#constructor)

### Properties

- [@context](modules_did_did_entity.DIDDocumentEntity.md#@context)
- [authentication](modules_did_did_entity.DIDDocumentEntity.md#authentication)
- [created](modules_did_did_entity.DIDDocumentEntity.md#created)
- [delegates](modules_did_did_entity.DIDDocumentEntity.md#delegates)
- [id](modules_did_did_entity.DIDDocumentEntity.md#id)
- [logs](modules_did_did_entity.DIDDocumentEntity.md#logs)
- [proof](modules_did_did_entity.DIDDocumentEntity.md#proof)
- [publicKey](modules_did_did_entity.DIDDocumentEntity.md#publickey)
- [service](modules_did_did_entity.DIDDocumentEntity.md#service)
- [updated](modules_did_did_entity.DIDDocumentEntity.md#updated)

### Methods

- [create](modules_did_did_entity.DIDDocumentEntity.md#create)

## Constructors

### constructor

• **new DIDDocumentEntity**()

## Properties

### @context

• **@context**: `string`

#### Implementation of

IDIDDocument.@context

___

### authentication

• **authentication**: (`string` \| `IAuthentication`)[]

#### Implementation of

IDIDDocument.authentication

___

### created

• `Optional` **created**: `string`

#### Implementation of

IDIDDocument.created

___

### delegates

• `Optional` **delegates**: `string`[]

#### Implementation of

IDIDDocument.delegates

___

### id

• **id**: `string`

#### Implementation of

IDIDDocument.id

___

### logs

• **logs**: `string`

___

### proof

• `Optional` **proof**: `ILinkedDataProof`

#### Implementation of

IDIDDocument.proof

___

### publicKey

• **publicKey**: `IPublicKey`[]

#### Implementation of

IDIDDocument.publicKey

___

### service

• **service**: [`IClaim`](../interfaces/modules_did_did_entity.IClaim.md)[]

#### Implementation of

IDIDDocument.service

___

### updated

• `Optional` **updated**: `string`

#### Implementation of

IDIDDocument.updated

## Methods

### create

▸ `Static` **create**(`data`): [`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\> |

#### Returns

[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)
