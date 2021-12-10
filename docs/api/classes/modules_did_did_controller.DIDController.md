# Class: DIDController

[modules/did/did.controller](../modules/modules_did_did_controller.md).DIDController

## Table of contents

### Constructors

- [constructor](modules_did_did_controller.DIDController.md#constructor)

### Methods

- [getById](modules_did_did_controller.DIDController.md#getbyid)

## Constructors

### constructor

• **new DIDController**(`didService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### getById

▸ **getById**(`id`): `Promise`<`any`\>

Retrieves a cached DID Document. If not in cache, retrieves from blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The DID to retrieve |

#### Returns

`Promise`<`any`\>

A DID Document representation which optionally includes full claims.
