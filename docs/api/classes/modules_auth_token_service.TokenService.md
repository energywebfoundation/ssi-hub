# Class: TokenService

[modules/auth/token.service](../modules/modules_auth_token_service.md).TokenService

## Table of contents

### Constructors

- [constructor](modules_auth_token_service.TokenService.md#constructor)

### Methods

- [generateAccessToken](modules_auth_token_service.TokenService.md#generateaccesstoken)
- [generateRefreshToken](modules_auth_token_service.TokenService.md#generaterefreshtoken)
- [handleOriginCheck](modules_auth_token_service.TokenService.md#handleorigincheck)
- [invalidateRefreshToken](modules_auth_token_service.TokenService.md#invalidaterefreshtoken)
- [verifyAccessToken](modules_auth_token_service.TokenService.md#verifyaccesstoken)
- [verifyRefreshToken](modules_auth_token_service.TokenService.md#verifyrefreshtoken)

## Constructors

### constructor

• **new TokenService**(`configService`, `jwtService`, `refreshTokenRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `jwtService` | `JwtService` |
| `refreshTokenRepository` | [`RefreshTokenRepository`](modules_auth_refreshToken_repository.RefreshTokenRepository.md) |

## Methods

### generateAccessToken

▸ **generateAccessToken**(`data`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TokenPayload`](../interfaces/modules_auth_token_service.TokenPayload.md) |

#### Returns

`Promise`<`string`\>

___

### generateRefreshToken

▸ **generateRefreshToken**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.userDid` | `string` |

#### Returns

`Promise`<`string`\>

___

### handleOriginCheck

▸ **handleOriginCheck**(`req`, `res`, `next`): `Promise`<`void`\>

Our approach to prevent or at least maximum decrease chances for any CSRF attacks:

Provide a Protection using Origin in headers and combining double check with JWT:
* Origin is a request header supported in most modern browsers, indicating from where the request originated, **which cannot be modified** <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin>
* We will store the request Origin header in JWT token after login
* And with every request our middleware will check if Origin in request headers is matching with origin stored in JTW token(**hacker cannot modify JWT as we are signing it with our secret in backend**)
* For node requests we will check if origin in request headers is undefined.
* IF ORIGIN IS SAME OR UNDEFINED: everything is fine
* IF NO: throw an exception as the origin could be from a hacker's website.
* More info(check approach 2, **origin headers**): <https://security.stackexchange.com/questions/203890/how-to-implement-csrf-protection-with-a-cross-origin-request-cors/203910#203910>

A pattern such as the double cookie submit pattern cannot be used because the cache-server does not share an origin with it's clients.

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `next` | `NextFunction` |

#### Returns

`Promise`<`void`\>

___

### invalidateRefreshToken

▸ **invalidateRefreshToken**(`id`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`number`\>

___

### verifyAccessToken

▸ **verifyAccessToken**(`token`): `Promise`<[`TokenPayload`](../interfaces/modules_auth_token_service.TokenPayload.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`TokenPayload`](../interfaces/modules_auth_token_service.TokenPayload.md)\>

___

### verifyRefreshToken

▸ **verifyRefreshToken**(`token`): `Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>
