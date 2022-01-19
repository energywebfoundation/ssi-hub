# Class: Logger

[modules/logger/logger.service](../modules/modules_logger_logger_service.md).Logger

## Hierarchy

- `NestLogger`

  ↳ **`Logger`**

## Implements

- `LoggerService`

## Table of contents

### Constructors

- [constructor](modules_logger_logger_service.Logger.md#constructor)

### Properties

- [logger](modules_logger_logger_service.Logger.md#logger)

### Methods

- [debug](modules_logger_logger_service.Logger.md#debug)
- [error](modules_logger_logger_service.Logger.md#error)
- [info](modules_logger_logger_service.Logger.md#info)
- [setContext](modules_logger_logger_service.Logger.md#setcontext)
- [verbose](modules_logger_logger_service.Logger.md#verbose)
- [warn](modules_logger_logger_service.Logger.md#warn)

## Constructors

### constructor

• **new Logger**(`configService`, `sentryService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `sentryService` | [`SentryService`](modules_sentry_sentry_service.SentryService.md) |

#### Overrides

NestLogger.constructor

## Properties

### logger

• `Readonly` **logger**: `Logger`

## Methods

### debug

▸ **debug**(`message`, `context?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context` | `string` |

#### Returns

`Logger`

#### Implementation of

LoggerService.debug

#### Overrides

NestLogger.debug

___

### error

▸ **error**(`error`, `trace?`, `context?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |
| `trace?` | `string` |
| `context` | `string` |

#### Returns

`Logger`

#### Implementation of

LoggerService.error

#### Overrides

NestLogger.error

___

### info

▸ **info**(`message`, `context?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context` | `string` |

#### Returns

`Logger`

___

### setContext

▸ **setContext**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `string` |

#### Returns

`void`

___

### verbose

▸ **verbose**(`message`, `context?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context` | `string` |

#### Returns

`Logger`

#### Implementation of

LoggerService.verbose

#### Overrides

NestLogger.verbose

___

### warn

▸ **warn**(`message`, `context?`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `context` | `string` |

#### Returns

`Logger`

#### Implementation of

LoggerService.warn

#### Overrides

NestLogger.warn
