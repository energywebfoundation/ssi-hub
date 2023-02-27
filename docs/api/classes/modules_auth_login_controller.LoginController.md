# Class: LoginController

[modules/auth/login.controller](../modules/modules_auth_login_controller.md).LoginController

## Table of contents

### Constructors

- [constructor](modules_auth_login_controller.LoginController.md#constructor)

### Methods

- [initiateSiweLogin](modules_auth_login_controller.LoginController.md#initiatesiwelogin)
- [login](modules_auth_login_controller.LoginController.md#login)
- [loginSiwe](modules_auth_login_controller.LoginController.md#loginsiwe)
- [refreshToken](modules_auth_login_controller.LoginController.md#refreshtoken)
- [status](modules_auth_login_controller.LoginController.md#status)

## Constructors

### constructor

• **new LoginController**(`tokenService`, `cookiesServices`, `configService`, `roleService`, `redis`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenService` | [`TokenService`](modules_auth_token_service.TokenService.md) |
| `cookiesServices` | [`CookiesServices`](modules_auth_cookies_service.CookiesServices.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `redis` | `RedisClientType`<{}, `Record`<`string`, `never`\>, `Record`<`string`, `never`\>\> |

## Methods

### initiateSiweLogin

▸ **initiateSiweLogin**(`res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

___

### login

▸ **login**(`req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

___

### loginSiwe

▸ **loginSiwe**(`req`, `res`, `__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `__namedParameters` | [`SiweReqPayload`](modules_auth_siwe_dto.SiweReqPayload.md) |

#### Returns

`Promise`<`void`\>

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

___

### status

▸ **status**(`req`): `Promise`<{ `user`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<{ `user`: `string`  }\>
