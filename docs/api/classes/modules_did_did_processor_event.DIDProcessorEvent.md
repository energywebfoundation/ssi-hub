# Class: DIDProcessorEvent

[modules/did/did.processor.event](../modules/modules_did_did_processor_event.md).DIDProcessorEvent

## Table of contents

### Constructors

- [constructor](modules_did_did_processor_event.DIDProcessorEvent.md#constructor)

### Methods

- [obscureDid](modules_did_did_processor_event.DIDProcessorEvent.md#obscuredid)
- [processDIDDocumentRefresh](modules_did_did_processor_event.DIDProcessorEvent.md#processdiddocumentrefresh)

## Constructors

### constructor

• **new DIDProcessorEvent**(`didProcessor`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didProcessor` | [`DIDProcessor`](modules_did_did_processor.DIDProcessor.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### obscureDid

▸ **obscureDid**(`did`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`string`

___

### processDIDDocumentRefresh

▸ **processDIDDocumentRefresh**(`job`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`string`\> |

#### Returns

`Promise`<`void`\>
