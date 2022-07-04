# Module: modules/did/did.types

## Table of contents

### Classes

- [DID](../classes/modules_did_did_types.DID.md)

### Variables

- [ADD\_DID\_DOC\_QUEUE\_NAME](modules_did_did_types.md#add_did_doc_queue_name)
- [UPDATE\_DID\_DOC\_QUEUE\_NAME](modules_did_did_types.md#update_did_doc_queue_name)
- [didPattern](modules_did_did_types.md#didpattern)

### Functions

- [getDIDFromAddress](modules_did_did_types.md#getdidfromaddress)

## Variables

### ADD\_DID\_DOC\_QUEUE\_NAME

• `Const` **ADD\_DID\_DOC\_QUEUE\_NAME**: ``"addDIDDocument"``

___

### UPDATE\_DID\_DOC\_QUEUE\_NAME

• `Const` **UPDATE\_DID\_DOC\_QUEUE\_NAME**: ``"refreshDIDDocument"``

___

### didPattern

• `Const` **didPattern**: ``"^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$"``

**`Todo`**

 >> ew-did-registry/did
matches did:ethr:volta:address, did:ethr:vOLTa:address and did:ethr:address

## Functions

### getDIDFromAddress

▸ **getDIDFromAddress**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`
