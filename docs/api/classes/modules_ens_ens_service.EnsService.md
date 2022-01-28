# Class: EnsService

[modules/ens/ens.service](../modules/modules_ens_ens_service.md).EnsService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](modules_ens_ens_service.EnsService.md#constructor)

### Methods

- [onModuleDestroy](modules_ens_ens_service.EnsService.md#onmoduledestroy)
- [syncENS](modules_ens_ens_service.EnsService.md#syncens)
- [syncNamespace](modules_ens_ens_service.EnsService.md#syncnamespace)

## Constructors

### constructor

• **new EnsService**(`roleService`, `applicationService`, `organizationService`, `schedulerRegistry`, `config`, `logger`, `provider`, `sentryTracingService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `applicationService` | [`ApplicationService`](modules_application_application_service.ApplicationService.md) |
| `organizationService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |
| `schedulerRegistry` | `SchedulerRegistry` |
| `config` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `provider` | [`Provider`](common_provider.Provider.md) |
| `sentryTracingService` | [`SentryTracingService`](modules_sentry_sentry_tracing_service.SentryTracingService.md) |

## Methods

### onModuleDestroy

▸ **onModuleDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnModuleDestroy.onModuleDestroy

___

### syncENS

▸ **syncENS**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### syncNamespace

▸ **syncNamespace**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IRoleDefinition` \| `IAppDefinition` \| `IOrganizationDefinition` |
| `__namedParameters.hash` | `string` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<`void`\>
