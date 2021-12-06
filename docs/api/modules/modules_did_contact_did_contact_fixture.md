# Module: modules/did-contact/did.contact.fixture

## Table of contents

### Functions

- [didContactFixture](modules_did_contact_did_contact_fixture.md#didcontactfixture)
- [didDocumentFixture](modules_did_contact_did_contact_fixture.md#diddocumentfixture)

## Functions

### didContactFixture

▸ `Const` **didContactFixture**(`didDoc`, `repo`, `count?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `didDoc` | [`DIDDocumentEntity`](../classes/modules_did_did_entity.DIDDocumentEntity.md) | `undefined` |
| `repo` | `Repository`<[`DIDContact`](../classes/modules_did_contact_did_contact_entity.DIDContact.md)\> | `undefined` |
| `count` | `number` | `1` |

#### Returns

`Promise`<`any`[]\>

___

### didDocumentFixture

▸ `Const` **didDocumentFixture**(`didDocRepo`): `Promise`<{ `@context`: `string` = '<context\>'; `authentication`: `any`[] = []; `created`: `string` = '<created\>'; `id`: `string` = 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9'; `logs`: `string` = '<logs\>'; `proof`: `any` ; `publicKey`: `any`[] = []; `service`: `any`[] = []; `updated`: `string` = '<updated\>' } & [`DIDDocumentEntity`](../classes/modules_did_did_entity.DIDDocumentEntity.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `didDocRepo` | `Repository`<[`DIDDocumentEntity`](../classes/modules_did_did_entity.DIDDocumentEntity.md)\> |

#### Returns

`Promise`<{ `@context`: `string` = '<context\>'; `authentication`: `any`[] = []; `created`: `string` = '<created\>'; `id`: `string` = 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9'; `logs`: `string` = '<logs\>'; `proof`: `any` ; `publicKey`: `any`[] = []; `service`: `any`[] = []; `updated`: `string` = '<updated\>' } & [`DIDDocumentEntity`](../classes/modules_did_did_entity.DIDDocumentEntity.md)\>
