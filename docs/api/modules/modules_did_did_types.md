# Module: modules/did/did.types

## Table of contents

### Classes

- [DID](../classes/modules_did_did_types.DID.md)

### Variables

- [ADD\_DID\_DOC\_JOB\_NAME](modules_did_did_types.md#add_did_doc_job_name)
- [EVENT\_UPDATE\_DID\_DOC\_JOB\_NAME](modules_did_did_types.md#event_update_did_doc_job_name)
- [EVENT\_UPDATE\_DOCUMENT\_QUEUE\_NAME](modules_did_did_types.md#event_update_document_queue_name)
- [UPDATE\_DID\_DOC\_JOB\_NAME](modules_did_did_types.md#update_did_doc_job_name)
- [UPDATE\_DOCUMENT\_QUEUE\_NAME](modules_did_did_types.md#update_document_queue_name)
- [didPattern](modules_did_did_types.md#didpattern)

### Functions

- [getDIDFromAddress](modules_did_did_types.md#getdidfromaddress)

## Variables

### ADD\_DID\_DOC\_JOB\_NAME

• `Const` **ADD\_DID\_DOC\_JOB\_NAME**: ``"adding"``

___

### EVENT\_UPDATE\_DID\_DOC\_JOB\_NAME

• `Const` **EVENT\_UPDATE\_DID\_DOC\_JOB\_NAME**: ``"eventRefreshing"``

___

### EVENT\_UPDATE\_DOCUMENT\_QUEUE\_NAME

• `Const` **EVENT\_UPDATE\_DOCUMENT\_QUEUE\_NAME**: ``"eventUpdateDocumentQueue"``

___

### UPDATE\_DID\_DOC\_JOB\_NAME

• `Const` **UPDATE\_DID\_DOC\_JOB\_NAME**: ``"refreshing"``

___

### UPDATE\_DOCUMENT\_QUEUE\_NAME

• `Const` **UPDATE\_DOCUMENT\_QUEUE\_NAME**: ``"updateDocumentQueue"``

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
