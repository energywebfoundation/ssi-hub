# Class: RefreshTokenRepository

[modules/auth/refreshToken.repository](../modules/modules_auth_refreshToken_repository.md).RefreshTokenRepository

## Table of contents

### Constructors

- [constructor](modules_auth_refreshToken_repository.RefreshTokenRepository.md#constructor)

### Methods

- [createRefreshToken](modules_auth_refreshToken_repository.RefreshTokenRepository.md#createrefreshtoken)
- [deleteRefreshTokenById](modules_auth_refreshToken_repository.RefreshTokenRepository.md#deleterefreshtokenbyid)
- [getRefreshTokenById](modules_auth_refreshToken_repository.RefreshTokenRepository.md#getrefreshtokenbyid)

## Constructors

### constructor

• **new RefreshTokenRepository**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>\> |

## Methods

### createRefreshToken

▸ **createRefreshToken**(`__namedParameters`): `Promise`<`Record`<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.userDid` | `string` |

#### Returns

`Promise`<`Record`<`string`, `any`\>\>

___

### deleteRefreshTokenById

▸ **deleteRefreshTokenById**(`tokenId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<`void`\>

___

### getRefreshTokenById

▸ **getRefreshTokenById**(`tokenId`): `Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>