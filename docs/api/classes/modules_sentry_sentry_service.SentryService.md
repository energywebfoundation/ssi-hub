# Class: SentryService

[modules/sentry/sentry.service](../modules/modules_sentry_sentry_service.md).SentryService

## Implements

- `OnModuleDestroy`
- `OnApplicationShutdown`

## Table of contents

### Constructors

- [constructor](modules_sentry_sentry_service.SentryService.md#constructor)

### Methods

- [captureException](modules_sentry_sentry_service.SentryService.md#captureexception)
- [captureMessage](modules_sentry_sentry_service.SentryService.md#capturemessage)
- [getSentry](modules_sentry_sentry_service.SentryService.md#getsentry)
- [init](modules_sentry_sentry_service.SentryService.md#init)
- [onApplicationShutdown](modules_sentry_sentry_service.SentryService.md#onapplicationshutdown)
- [onModuleDestroy](modules_sentry_sentry_service.SentryService.md#onmoduledestroy)

## Constructors

### constructor

• **new SentryService**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>\> |

## Methods

### captureException

▸ **captureException**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `string` \| `Error` |

#### Returns

`void`

___

### captureMessage

▸ **captureMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

___

### getSentry

▸ **getSentry**(): `__module`

#### Returns

`__module`

___

### init

▸ **init**(`app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Application` |

#### Returns

`void`

___

### onApplicationShutdown

▸ **onApplicationShutdown**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnApplicationShutdown.onApplicationShutdown

___

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleDestroy.onModuleDestroy
