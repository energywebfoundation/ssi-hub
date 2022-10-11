# Class: HealthCheckController

[health-check/health-check.controller](../modules/health_check_health_check_controller.md).HealthCheckController

## Table of contents

### Constructors

- [constructor](health_check_health_check_controller.HealthCheckController.md#constructor)

### Methods

- [check](health_check_health_check_controller.HealthCheckController.md#check)
- [checkLiveness](health_check_health_check_controller.HealthCheckController.md#checkliveness)
- [checkReadiness](health_check_health_check_controller.HealthCheckController.md#checkreadiness)

## Constructors

### constructor

• **new HealthCheckController**(`healthCheckService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `healthCheckService` | [`HealthCheckService`](health_check_health_check_service.HealthCheckService.md) |

## Methods

### check

▸ **check**(): `Promise`<`HealthCheckResult`\>

#### Returns

`Promise`<`HealthCheckResult`\>

___

### checkLiveness

▸ **checkLiveness**(): `Promise`<`HealthCheckResult`\>

#### Returns

`Promise`<`HealthCheckResult`\>

___

### checkReadiness

▸ **checkReadiness**(): `Promise`<`HealthCheckResult`\>

#### Returns

`Promise`<`HealthCheckResult`\>
