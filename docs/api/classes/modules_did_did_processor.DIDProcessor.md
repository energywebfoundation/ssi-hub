# Class: DIDProcessor

[modules/did/did.processor](../modules/modules_did_did_processor.md).DIDProcessor

## Table of contents

### Constructors

- [constructor](modules_did_did_processor.DIDProcessor.md#constructor)

### Methods

- [processDIDDocumentAddition](modules_did_did_processor.DIDProcessor.md#processdiddocumentaddition)
- [processDIDDocumentRefresh](modules_did_did_processor.DIDProcessor.md#processdiddocumentrefresh)

## Constructors

### constructor

• **new DIDProcessor**(`didService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

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
