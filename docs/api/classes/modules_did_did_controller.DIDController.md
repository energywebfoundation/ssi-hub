# Class: DIDController

[modules/did/did.controller](../modules/modules_did_did_controller.md).DIDController

## Table of contents

### Constructors

- [constructor](modules_did_did_controller.DIDController.md#constructor)

### Methods

- [getById](modules_did_did_controller.DIDController.md#getbyid)
- [postById](modules_did_did_controller.DIDController.md#postbyid)

## Constructors

### constructor

• **new DIDController**(`didService`, `logger`, `sentryTracingService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `sentryTracingService` | [`SentryTracingService`](modules_sentry_sentry_tracing_service.SentryTracingService.md) |

## Methods

### getById

▸ **getById**(`did`): `Promise`<`any`\>

Retrieves a cached DID Document. If not in cache, retrieves from blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | [`DID`](modules_did_did_types.DID.md) | The DID to retrieve |

#### Returns

`Promise`<`any`\>

A DID Document representation which optionally includes full claims.

___

### postById

▸ **postById**(`did`): `Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | [`DID`](modules_did_did_types.DID.md) |

#### Returns

`Promise`<[`DIDDocumentEntity`](modules_did_did_entity.DIDDocumentEntity.md)\>
