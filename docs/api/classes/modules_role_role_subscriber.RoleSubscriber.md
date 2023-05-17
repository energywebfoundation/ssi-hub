# Class: RoleSubscriber

[modules/role/role.subscriber](../modules/modules_role_role_subscriber.md).RoleSubscriber

## Implements

- `EntitySubscriberInterface`<[`Role`](modules_role_role_entity.Role.md)\>

## Table of contents

### Constructors

- [constructor](modules_role_role_subscriber.RoleSubscriber.md#constructor)

### Methods

- [beforeInsert](modules_role_role_subscriber.RoleSubscriber.md#beforeinsert)
- [beforeUpdate](modules_role_role_subscriber.RoleSubscriber.md#beforeupdate)
- [listenTo](modules_role_role_subscriber.RoleSubscriber.md#listento)

## Constructors

### constructor

• **new RoleSubscriber**(`logger`, `dataSource`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `dataSource` | `DataSource` |

## Methods

### beforeInsert

▸ **beforeInsert**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `InsertEvent`<[`Role`](modules_role_role_entity.Role.md)\> |

#### Returns

`void`

#### Implementation of

EntitySubscriberInterface.beforeInsert

___

### beforeUpdate

▸ **beforeUpdate**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `UpdateEvent`<[`Role`](modules_role_role_entity.Role.md)\> |

#### Returns

`void`

#### Implementation of

EntitySubscriberInterface.beforeUpdate

___

### listenTo

▸ **listenTo**(): typeof [`Role`](modules_role_role_entity.Role.md)

#### Returns

typeof [`Role`](modules_role_role_entity.Role.md)

#### Implementation of

EntitySubscriberInterface.listenTo
