# Class: DIDProcessor

[modules/did/did.processor](../modules/modules_did_did_processor.md).DIDProcessor

## Table of contents

### Constructors

- [constructor](modules_did_did_processor.DIDProcessor.md#constructor)

### Methods

- [onActive](modules_did_did_processor.DIDProcessor.md#onactive)
- [onError](modules_did_did_processor.DIDProcessor.md#onerror)
- [onFailed](modules_did_did_processor.DIDProcessor.md#onfailed)
- [onStalled](modules_did_did_processor.DIDProcessor.md#onstalled)
- [processDIDDocumentAddition](modules_did_did_processor.DIDProcessor.md#processdiddocumentaddition)
- [processDIDDocumentRefresh](modules_did_did_processor.DIDProcessor.md#processdiddocumentrefresh)

## Constructors

### constructor

• **new DIDProcessor**(`didService`, `logger`, `configService`, `queue`, `pinQueue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `queue` | `Queue`<`any`\> |
| `pinQueue` | `Queue`<`any`\> |

## Methods

### onActive

▸ **onActive**(`jobId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `number` |

#### Returns

`Promise`<`void`\>

___

### onError

▸ **onError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

___

### onFailed

▸ **onFailed**(`jobId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `number` |

#### Returns

`Promise`<`void`\>

___

### onStalled

▸ **onStalled**(`jobId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `number` |

#### Returns

`Promise`<`void`\>

___

### processDIDDocumentAddition

▸ **processDIDDocumentAddition**(`job`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`string`\> |

#### Returns

`Promise`<`void`\>

___

### processDIDDocumentRefresh

▸ **processDIDDocumentRefresh**(`job`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`string`\> |

#### Returns

`Promise`<`void`\>
