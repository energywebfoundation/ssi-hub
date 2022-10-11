# Class: NatsService

[modules/nats/nats.service](../modules/modules_nats_nats_service.md).NatsService

## Table of contents

### Constructors

- [constructor](modules_nats_nats_service.NatsService.md#constructor)

### Properties

- [natsEnvironmentName](modules_nats_nats_service.NatsService.md#natsenvironmentname)

### Methods

- [processMessage](modules_nats_nats_service.NatsService.md#processmessage)
- [publishForDids](modules_nats_nats_service.NatsService.md#publishfordids)

## Constructors

### constructor

• **new NatsService**(`natsWrapper`, `config`, `messagesQueue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `natsWrapper` | [`NatsWrapper`](modules_nats_nats_wrapper.NatsWrapper.md) |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `messagesQueue` | `Queue`<[`IMessageJob`](../modules/modules_nats_nats_service.md#imessagejob)\> |

## Properties

### natsEnvironmentName

• **natsEnvironmentName**: `string`

## Methods

### processMessage

▸ **processMessage**(`job`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `job` | `Job`<[`IMessageJob`](../modules/modules_nats_nats_service.md#imessagejob)\> |

#### Returns

`void`

___

### publishForDids

▸ **publishForDids**(`requestType`, `topic`, `dids`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestType` | `string` |
| `topic` | `string` |
| `dids` | `string`[] |
| `data` | `Record`<`string`, `unknown`\> |

#### Returns

`Promise`<`void`\>
