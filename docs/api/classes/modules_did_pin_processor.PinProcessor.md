# Class: PinProcessor

[modules/did/pin.processor](../modules/modules_did_pin_processor.md).PinProcessor

## Table of contents

### Constructors

- [constructor](modules_did_pin_processor.PinProcessor.md#constructor)

### Methods

- [onActive](modules_did_pin_processor.PinProcessor.md#onactive)
- [onError](modules_did_pin_processor.PinProcessor.md#onerror)
- [onFailed](modules_did_pin_processor.PinProcessor.md#onfailed)
- [onStalled](modules_did_pin_processor.PinProcessor.md#onstalled)
- [pinClaims](modules_did_pin_processor.PinProcessor.md#pinclaims)

## Constructors

### constructor

• **new PinProcessor**(`logger`, `configService`, `didInfura`, `queue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `didInfura` | `DidStore` |
| `queue` | `Queue`<`any`\> |

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

### pinClaims

▸ **pinClaims**(`doc`): `Promise`<`void`\>

This method migrates claims by retrieving from one DidStore and pinning to another
It was implemented for EW migration from Infura to EW hosted IPFS

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md) |

#### Returns

`Promise`<`void`\>
