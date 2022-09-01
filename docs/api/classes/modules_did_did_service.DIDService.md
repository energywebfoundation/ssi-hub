# Class: DIDService

[modules/did/did.service](../modules/modules_did_did_service.md).DIDService

## Implements

- `OnModuleInit`

## Table of contents

### Constructors

- [constructor](modules_did_did_service.DIDService.md#constructor)

### Methods

- [addCachedDocument](modules_did_did_service.DIDService.md#addcacheddocument)
- [getById](modules_did_did_service.DIDService.md#getbyid)
- [getDIDDocumentFromUniversalResolver](modules_did_did_service.DIDService.md#getdiddocumentfromuniversalresolver)
- [incrementalRefreshCachedDocument](modules_did_did_service.DIDService.md#incrementalrefreshcacheddocument)
- [obscureDid](modules_did_did_service.DIDService.md#obscuredid)
- [onModuleInit](modules_did_did_service.DIDService.md#onmoduleinit)
- [resolveServiceEndpoints](modules_did_did_service.DIDService.md#resolveserviceendpoints)

## Constructors

### constructor

• **new DIDService**(`config`, `schedulerRegistry`, `httpService`, `didQueue`, `logger`, `didRepository`, `provider`, `sentryTracingService`, `registrySettings`, `didStore`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `schedulerRegistry` | `SchedulerRegistry` |
| `httpService` | `HttpService` |
| `didQueue` | `Queue`<`string`\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `didRepository` | `Repository`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\> |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `sentryTracingService` | [`SentryTracingService`](modules_sentry_sentry_tracing_service.SentryTracingService.md) |
| `registrySettings` | `RegistrySettings` |
| `didStore` | `DidStore` |

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

### obscureDid

▸ **obscureDid**(`did`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`string`

___

### onModuleInit

▸ **onModuleInit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleInit.onModuleInit

___

### resolveServiceEndpoints

▸ **resolveServiceEndpoints**(`did`): `Promise`<`string`[]\>

Resolves document service endponts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | DID of the document service endpoints |

#### Returns

`Promise`<`string`[]\>
