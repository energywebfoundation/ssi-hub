# Class: DIDContactController

[modules/did-contact/did.contact.controller](../modules/modules_did_contact_did_contact_controller.md).DIDContactController

## Table of contents

### Constructors

- [constructor](modules_did_contact_did_contact_controller.DIDContactController.md#constructor)

### Methods

- [createDIDContact](modules_did_contact_did_contact_controller.DIDContactController.md#createdidcontact)
- [deleteDIDContact](modules_did_contact_did_contact_controller.DIDContactController.md#deletedidcontact)
- [getDIDContacts](modules_did_contact_did_contact_controller.DIDContactController.md#getdidcontacts)

## Constructors

### constructor

• **new DIDContactController**(`didContactService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didContactService` | [`DIDContactService`](modules_did_contact_did_contact_service.DIDContactService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### createDIDContact

▸ **createDIDContact**(`data`, `did?`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DIDContactDTO`](modules_did_contact_did_contact_dto.DIDContactDTO.md) |
| `did?` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

___

### deleteDIDContact

▸ **deleteDIDContact**(`id`, `did?`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `did?` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)\>

___

### getDIDContacts

▸ **getDIDContacts**(`did?`): `Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did?` | `string` |

#### Returns

`Promise`<[`DIDContact`](modules_did_contact_did_contact_entity.DIDContact.md)[]\>
