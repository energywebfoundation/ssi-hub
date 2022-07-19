# Class: DID

[modules/did/did.types](../modules/modules_did_did_types.md).DID

A value object representing EIP-1056 DID

## Table of contents

### Constructors

- [constructor](modules_did_did_types.DID.md#constructor)

### Properties

- [chain](modules_did_did_types.DID.md#chain)
- [did](modules_did_did_types.DID.md#did)
- [id](modules_did_did_types.DID.md#id)
- [method](modules_did_did_types.DID.md#method)

### Methods

- [withHexChain](modules_did_did_types.DID.md#withhexchain)
- [from](modules_did_did_types.DID.md#from)

## Constructors

### constructor

• **new DID**(`did`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

## Properties

### chain

• `Readonly` **chain**: `Chain`

___

### did

• `Readonly` **did**: `string`

A DID in the format of "did:" method-name ":" method-specific-id

___

### id

• `Readonly` **id**: `string`

___

### method

• `Readonly` **method**: `Methods`

## Methods

### withHexChain

▸ **withHexChain**(): `string`

#### Returns

`string`

___

### from

▸ `Static` **from**(`did`): [`DID`](modules_did_did_types.DID.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

[`DID`](modules_did_did_types.DID.md)
