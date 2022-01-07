# Class: DIDService

[modules/did/did.service](../modules/modules_did_did_service.md).DIDService

## Table of contents

### Constructors

- [constructor](modules_did_did_service.DIDService.md#constructor)

### Methods

- [addCachedDocument](modules_did_did_service.DIDService.md#addcacheddocument)
- [getById](modules_did_did_service.DIDService.md#getbyid)
- [getDIDDocumentFromUniversalResolver](modules_did_did_service.DIDService.md#getdiddocumentfromuniversalresolver)
- [incrementalRefreshCachedDocument](modules_did_did_service.DIDService.md#incrementalrefreshcacheddocument)

## Constructors

### constructor

• **new DIDService**(`config`, `schedulerRegistry`, `httpService`, `didQueue`, `logger`, `didRepository`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>\> |
| `schedulerRegistry` | `SchedulerRegistry` |
| `httpService` | `HttpService` |
| `didQueue` | `Queue`<`string`\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `didRepository` | `Repository`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\> |
| `provider` | [`Provider`](common_provider.Provider.md) |

## Methods

### addCachedDocument

▸ **addCachedDocument**(`did`): `Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

Adds or fully refresh the DID Document cache for a given DID.
Also retrieves all claims from IPFS for the document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

___

### getById

▸ **getById**(`did`): `Promise`<`IDIDDocument`\>

Retrieves a DID Document for a given DID. Retrieves from blockchain if not cached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | DID whose document should be retrieved |

#### Returns

`Promise`<`IDIDDocument`\>

Resolved DID Document.

___

### getDIDDocumentFromUniversalResolver

▸ **getDIDDocumentFromUniversalResolver**(`did`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`any`\>

___

### incrementalRefreshCachedDocument

▸ **incrementalRefreshCachedDocument**(`did`): `Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

Add any incremental changes to the DID document that occurred since the last sync.
Also retrieves all claims from IPFS for the document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>
