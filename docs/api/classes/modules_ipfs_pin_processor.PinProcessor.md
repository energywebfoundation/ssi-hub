# Class: PinProcessor

[modules/ipfs/pin.processor](../modules/modules_ipfs_pin_processor.md).PinProcessor

## Table of contents

### Constructors

- [constructor](modules_ipfs_pin_processor.PinProcessor.md#constructor)

### Methods

- [OnQueueWaiting](modules_ipfs_pin_processor.PinProcessor.md#onqueuewaiting)
- [onError](modules_ipfs_pin_processor.PinProcessor.md#onerror)
- [onFailed](modules_ipfs_pin_processor.PinProcessor.md#onfailed)
- [onStalled](modules_ipfs_pin_processor.PinProcessor.md#onstalled)
- [pin](modules_ipfs_pin_processor.PinProcessor.md#pin)

## Constructors

### constructor

• **new PinProcessor**(`logger`, `didStoreCluster`, `didStoreInfura`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `didStoreCluster` | `DidStore` |
| `didStoreInfura` | `DidStore` |

## Methods

### OnQueueWaiting

▸ **OnQueueWaiting**(`job`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`any`\> |

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

▸ **onFailed**(`job`, `err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`any`\> |
| `err` | `Error` |

#### Returns

`void`

___

### onStalled

▸ **onStalled**(`job`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`any`\> |

#### Returns

`void`

___

### pin

▸ **pin**(`job`): `Promise`<`void`\>

This method migrates claims by retrieving from one DidStore and pinning to another
It was implemented for EW migration from Infura to EW hosted IPFS

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<[`PinClaimData`](../modules/modules_ipfs_ipfs_types.md#pinclaimdata)\> |

#### Returns

`Promise`<`void`\>
