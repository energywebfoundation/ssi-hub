# Class: LoginController

[modules/auth/login.controller](../modules/modules_auth_login_controller.md).LoginController

## Table of contents

### Constructors

- [constructor](modules_auth_login_controller.LoginController.md#constructor)

### Methods

- [login](modules_auth_login_controller.LoginController.md#login)
- [refreshToken](modules_auth_login_controller.LoginController.md#refreshtoken)

## Constructors

### constructor

• **new LoginController**(`tokenService`, `cookiesServices`, `configService`, `roleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenService` | [`TokenService`](modules_auth_token_service.TokenService.md) |
| `cookiesServices` | [`CookiesServices`](modules_auth_cookies_service.CookiesServices.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>\> |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |

## Methods

### login

▸ **login**(`req`, `res`): `Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

___

### refreshToken

▸ **refreshToken**(`req`, `res`, `refresh_token?`): `Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `refresh_token?` | `string` |

#### Returns

`Promise`<`Response`<`any`, `Record`<`string`, `any`\>\>\>
