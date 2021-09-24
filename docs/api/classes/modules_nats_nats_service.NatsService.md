# Class: NatsService

[modules/nats/nats.service](../modules/modules_nats_nats_service.md).NatsService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_nats_nats_service.NatsService.md#constructor)

### Properties

- [connection](modules_nats_nats_service.NatsService.md#connection)

### Methods

- [onModuleDestroy](modules_nats_nats_service.NatsService.md#onmoduledestroy)

## Constructors

### constructor

• **new NatsService**(`config`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Properties

### connection

• **connection**: `Client`

## Methods

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleDestroy.onModuleDestroy
