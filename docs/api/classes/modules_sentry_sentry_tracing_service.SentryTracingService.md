# Class: SentryTracingService

[modules/sentry/sentry-tracing.service](../modules/modules_sentry_sentry_tracing_service.md).SentryTracingService

## Table of contents

### Constructors

- [constructor](modules_sentry_sentry_tracing_service.SentryTracingService.md#constructor)

### Methods

- [startTransaction](modules_sentry_sentry_tracing_service.SentryTracingService.md#starttransaction)

## Constructors

### constructor

• **new SentryTracingService**()

## Methods

### startTransaction

▸ **startTransaction**(`operationTag`, `operationName`, `data?`): `Transaction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operationTag` | `string` |
| `operationName` | `string` |
| `data?` | `Record`<`string`, `any`\> |

#### Returns

`Transaction`
