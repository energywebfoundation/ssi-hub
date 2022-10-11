# Class: DIDController

[modules/did/did.controller](../modules/modules_did_did_controller.md).DIDController

## Table of contents

### Constructors

- [constructor](modules_did_did_controller.DIDController.md#constructor)

### Methods

- [getById](modules_did_did_controller.DIDController.md#getbyid)

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

▸ **getById**(`did`): `Promise`<`IDIDDocument`\>

Retrieves a cached DID Document. If not in cache, retrieves from blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | [`DID`](modules_did_did_types.DID.md) | The DID to retrieve |

#### Returns

`Promise`<`IDIDDocument`\>

A DID Document representation which optionally includes full claims.
