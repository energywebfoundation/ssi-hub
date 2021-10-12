# Class: JwtStrategy

[modules/auth/jwt.strategy](../modules/modules_auth_jwt_strategy.md).JwtStrategy

## Hierarchy

- `Strategy`<`this`\>

  ↳ **`JwtStrategy`**

## Table of contents

### Constructors

- [constructor](modules_auth_jwt_strategy.JwtStrategy.md#constructor)

### Methods

- [validate](modules_auth_jwt_strategy.JwtStrategy.md#validate)

## Constructors

### constructor

• **new JwtStrategy**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>\> |

#### Overrides

PassportStrategy(Strategy).constructor

## Methods

### validate

▸ **validate**(`payload`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

#### Returns

`Promise`<`any`\>
