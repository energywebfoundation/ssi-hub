# Class: BullHealthCheckIndicatorService

[health-check/bull-health-check-indicator.service](../modules/health_check_bull_health_check_indicator_service.md).BullHealthCheckIndicatorService

## Hierarchy

- `HealthIndicator`

  ↳ **`BullHealthCheckIndicatorService`**

## Table of contents

### Constructors

- [constructor](health_check_bull_health_check_indicator_service.BullHealthCheckIndicatorService.md#constructor)

### Methods

- [check](health_check_bull_health_check_indicator_service.BullHealthCheckIndicatorService.md#check)

## Constructors

### constructor

• **new BullHealthCheckIndicatorService**(`claimQueue`, `didQueue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimQueue` | `Queue`<`string`\> |
| `didQueue` | `Queue`<`string`\> |

#### Overrides

HealthIndicator.constructor

## Methods

### check

▸ **check**(`key`): `Promise`<`HealthIndicatorResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`HealthIndicatorResult`\>
