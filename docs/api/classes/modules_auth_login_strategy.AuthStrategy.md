# Class: AuthStrategy

[modules/auth/login.strategy](../modules/modules_auth_login_strategy.md).AuthStrategy

## Hierarchy

- `LoginStrategy`<`this`\>

  ↳ **`AuthStrategy`**

## Table of contents

### Constructors

- [constructor](modules_auth_login_strategy.AuthStrategy.md#constructor)

### Methods

- [authenticate](modules_auth_login_strategy.AuthStrategy.md#authenticate)
- [decodeToken](modules_auth_login_strategy.AuthStrategy.md#decodetoken)
- [didUnification](modules_auth_login_strategy.AuthStrategy.md#didunification)
- [encodeToken](modules_auth_login_strategy.AuthStrategy.md#encodetoken)
- [extractToken](modules_auth_login_strategy.AuthStrategy.md#extracttoken)
- [getRoleDefinition](modules_auth_login_strategy.AuthStrategy.md#getroledefinition)
- [offchainClaimsOf](modules_auth_login_strategy.AuthStrategy.md#offchainclaimsof)
- [validate](modules_auth_login_strategy.AuthStrategy.md#validate)

## Constructors

### constructor

• **new AuthStrategy**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Overrides

PassportStrategy(LoginStrategy, &#x27;login&#x27;).constructor

## Methods

### authenticate

▸ **authenticate**(`req`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').authenticate

___

### decodeToken

▸ **decodeToken**<`T`\>(`token`, `options?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `options?` | `DecodeOptions` |

#### Returns

`T`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').decodeToken

___

### didUnification

▸ **didUnification**(`did`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`string`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').didUnification

___

### encodeToken

▸ **encodeToken**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`<`string`, `unknown`\> |

#### Returns

`string`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').encodeToken

___

### extractToken

▸ **extractToken**(`req`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`string`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').extractToken

___

### getRoleDefinition

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition`\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').getRoleDefinition

___

### offchainClaimsOf

▸ **offchainClaimsOf**(`did`): `Promise`<`OffchainClaim`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`OffchainClaim`[]\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').offchainClaimsOf

___

### validate

▸ **validate**(`token`, `payload`, `done`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `payload` | `ITokenPayload` |
| `done` | (`err?`: `Error`, `user?`: `unknown`, `info?`: `unknown`) => `void` |

#### Returns

`Promise`<`void`\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').validate
