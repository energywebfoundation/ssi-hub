# Class: ApplicationResolver

[modules/application/application.resolver](../modules/modules_application_application_resolver.md).ApplicationResolver

## Table of contents

### Constructors

- [constructor](modules_application_application_resolver.ApplicationResolver.md#constructor)

### Methods

- [application](modules_application_application_resolver.ApplicationResolver.md#application)
- [applications](modules_application_application_resolver.ApplicationResolver.md#applications)
- [roles](modules_application_application_resolver.ApplicationResolver.md#roles)

## Constructors

### constructor

• **new ApplicationResolver**(`applicationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationService` | [`ApplicationService`](modules_application_application_service.ApplicationService.md) |

## Methods

### application

▸ **application**(`namespace`): `Promise`<[`Application`](modules_application_application_entity.Application.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)\>

___

### applications

▸ **applications**(`owner`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### roles

▸ **roles**(`__namedParameters`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Application`](modules_application_application_entity.Application.md) |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>
