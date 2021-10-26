# Class: HealthCheckService

[health-check/health-check.service](../modules/health_check_health_check_service.md).HealthCheckService

## Table of contents

### Constructors

- [constructor](health_check_health_check_service.HealthCheckService.md#constructor)

### Methods

- [checkLiveness](health_check_health_check_service.HealthCheckService.md#checkliveness)
- [checkReadiness](health_check_health_check_service.HealthCheckService.md#checkreadiness)

## Constructors

### constructor

• **new HealthCheckService**(`terminusHealthCheckService`, `db`, `redisHealthCheckIndicatorService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `terminusHealthCheckService` | `HealthCheckService` |
| `db` | `TypeOrmHealthIndicator` |
| `redisHealthCheckIndicatorService` | [`BullHealthCheckIndicatorService`](health_check_bull_health_check_indicator_service.BullHealthCheckIndicatorService.md) |

## Methods

### checkLiveness

▸ **checkLiveness**(): `Promise`<`HealthCheckResult`\>

#### Returns

`Promise`<`HealthCheckResult`\>

___

### checkReadiness

▸ **checkReadiness**(): `Promise`<`HealthCheckResult`\>

#### Returns

`Promise`<`HealthCheckResult`\>
