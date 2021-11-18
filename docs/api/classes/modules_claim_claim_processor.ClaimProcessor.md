# Class: ClaimProcessor

[modules/claim/claim.processor](../modules/modules_claim_claim_processor.md).ClaimProcessor

## Table of contents

### Constructors

- [constructor](modules_claim_claim_processor.ClaimProcessor.md#constructor)

### Methods

- [onError](modules_claim_claim_processor.ClaimProcessor.md#onerror)
- [processClaim](modules_claim_claim_processor.ClaimProcessor.md#processclaim)

## Constructors

### constructor

• **new ClaimProcessor**(`claimService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_claim_service.ClaimService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### onError

▸ **onError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

___

### processClaim

▸ **processClaim**(`job`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<`string`\> |

#### Returns

`Promise`<`void`\>
