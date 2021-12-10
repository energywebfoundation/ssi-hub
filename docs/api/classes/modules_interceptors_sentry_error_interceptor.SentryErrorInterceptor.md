# Class: SentryErrorInterceptor

[modules/interceptors/sentry-error-interceptor](../modules/modules_interceptors_sentry_error_interceptor.md).SentryErrorInterceptor

## Implements

- `NestInterceptor`

## Table of contents

### Constructors

- [constructor](modules_interceptors_sentry_error_interceptor.SentryErrorInterceptor.md#constructor)

### Methods

- [intercept](modules_interceptors_sentry_error_interceptor.SentryErrorInterceptor.md#intercept)

## Constructors

### constructor

• **new SentryErrorInterceptor**(`sentryService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentryService` | [`SentryService`](modules_sentry_sentry_service.SentryService.md) |

## Methods

### intercept

▸ **intercept**(`context`, `next`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |
| `next` | `CallHandler`<`any`\> |

#### Returns

`Observable`<`any`\>

#### Implementation of

NestInterceptor.intercept
