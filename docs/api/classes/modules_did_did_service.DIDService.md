# Class: DIDService

[modules/did/did.service](../modules/modules_did_did_service.md).DIDService

## Implements

- `OnModuleInit`
- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_did_did_service.DIDService.md#constructor)

### Methods

- [addCachedDocument](modules_did_did_service.DIDService.md#addcacheddocument)
- [getById](modules_did_did_service.DIDService.md#getbyid)
- [getDIDDocumentFromUniversalResolver](modules_did_did_service.DIDService.md#getdiddocumentfromuniversalresolver)
- [incrementalRefreshCachedDocument](modules_did_did_service.DIDService.md#incrementalrefreshcacheddocument)
- [incrementalRefreshCachedDocumentByDid](modules_did_did_service.DIDService.md#incrementalrefreshcacheddocumentbydid)
- [obscureDid](modules_did_did_service.DIDService.md#obscuredid)
- [onModuleDestroy](modules_did_did_service.DIDService.md#onmoduledestroy)
- [onModuleInit](modules_did_did_service.DIDService.md#onmoduleinit)
- [resolveCredentials](modules_did_did_service.DIDService.md#resolvecredentials)

## Constructors

### constructor

• **new DIDService**(`config`, `schedulerRegistry`, `httpService`, `didQueue`, `eventDidQueue`, `logger`, `didRepository`, `provider`, `sentryTracingService`, `registrySettings`, `s3Service`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `schedulerRegistry` | `SchedulerRegistry` |
| `httpService` | `HttpService` |
| `didQueue` | `Queue`<`string`\> |
| `eventDidQueue` | `Queue`<`string`\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `didRepository` | `Repository`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\> |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `sentryTracingService` | [`SentryTracingService`](modules_sentry_sentry_tracing_service.SentryTracingService.md) |
| `registrySettings` | `RegistrySettings` |
| `s3Service` | [`S3Service`](modules_s3_s3_service.S3Service.md) |

## Methods

### addCachedDocument

▸ **addCachedDocument**(`did`, `isSync?`): `Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

Adds or fully refresh the DID Document cache for a given DID.
Also retrieves all claims from IPFS for the document.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `did` | `string` | `undefined` |
| `isSync` | `boolean` | `false` |

#### Returns

`Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

___

### getById

▸ **getById**(`did`, `transaction?`): `Promise`<`IDIDDocument`\>

Retrieves a DID Document for a given DID. Retrieves from blockchain if not cached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | DID whose document should be retrieved |
| `transaction?` | `Transaction` | - |

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

___

### incrementalRefreshCachedDocumentByDid

▸ **incrementalRefreshCachedDocumentByDid**(`did`): `Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

___

### obscureDid

▸ **obscureDid**(`did`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`string`

___

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleDestroy.onModuleDestroy

___

### onModuleInit

▸ **onModuleInit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleInit.onModuleInit

___

### resolveCredentials

▸ **resolveCredentials**(`did`): `Promise`<`any`[]\>

Resolves service endponts, which represent credentials

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | DID of the document service endpoints |

#### Returns

`Promise`<`any`[]\>
