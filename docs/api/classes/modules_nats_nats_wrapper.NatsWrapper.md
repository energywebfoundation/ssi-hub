# Class: NatsWrapper

[modules/nats/nats.wrapper](../modules/modules_nats_nats_wrapper.md).NatsWrapper

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_nats_nats_wrapper.NatsWrapper.md#constructor)

### Methods

- [onModuleDestroy](modules_nats_nats_wrapper.NatsWrapper.md#onmoduledestroy)
- [publish](modules_nats_nats_wrapper.NatsWrapper.md#publish)

## Constructors

### constructor

• **new NatsWrapper**(`config`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleDestroy.onModuleDestroy

___

### publish

▸ **publish**<`T`\>(`subject`, `data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `data` | `T` |

#### Returns

`void`
