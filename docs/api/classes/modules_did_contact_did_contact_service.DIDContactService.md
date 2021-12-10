# Class: DIDContactService

[modules/did-contact/did.contact.service](../modules/modules_did_contact_did_contact_service.md).DIDContactService

## Table of contents

### Constructors

- [constructor](modules_did_contact_did_contact_service.DIDContactService.md#constructor)

### Methods

- [createDIDContact](modules_did_contact_did_contact_service.DIDContactService.md#createdidcontact)
- [deleteDIDContact](modules_did_contact_did_contact_service.DIDContactService.md#deletedidcontact)
- [getDIDContacts](modules_did_contact_did_contact_service.DIDContactService.md#getdidcontacts)

## Constructors

### constructor

• **new DIDContactService**(`didContactRepository`, `didDocumentRepository`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didContactRepository` | `Repository`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\> |
| `didDocumentRepository` | `Repository`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### createDIDContact

▸ **createDIDContact**(`didContact`, `userDID`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `didContact` | [`DIDContactDTO`](modules_did_contact_did_contact_dto.DIDContactDTO.md) |
| `userDID` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

___

### deleteDIDContact

▸ **deleteDIDContact**(`id`, `userDID`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `userDID` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

___

### getDIDContacts

▸ **getDIDContacts**(`userDID`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userDID` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)[]\>
