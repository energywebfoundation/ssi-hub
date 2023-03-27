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

• **new RefreshTokenRepository**(`configService`, `client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `client` | `RedisClientType`<{}, `Record`<`string`, `never`\>, `Record`<`string`, `never`\>\> |

## Methods

### createRefreshToken

▸ **createRefreshToken**(`«destructured»`): `Promise`<`Record`<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `userDid` | `string` |

#### Returns

`Promise`<`Record`<`string`, `any`\>\>

___

### deleteRefreshTokenById

▸ **deleteRefreshTokenById**(`tokenId`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<`number`\>

___

### getRefreshTokenById

▸ **getRefreshTokenById**(`tokenId`): `Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<[`RefreshToken`](modules_auth_refreshToken_model.RefreshToken.md)\>
