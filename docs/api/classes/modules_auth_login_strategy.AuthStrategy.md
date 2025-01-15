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
- [extractSiwe](modules_auth_login_strategy.AuthStrategy.md#extractsiwe)
- [extractToken](modules_auth_login_strategy.AuthStrategy.md#extracttoken)
- [getRoleDefinition](modules_auth_login_strategy.AuthStrategy.md#getroledefinition)
- [isEIP191TokenPayload](modules_auth_login_strategy.AuthStrategy.md#iseip191tokenpayload)
- [isSiweMessagePayload](modules_auth_login_strategy.AuthStrategy.md#issiwemessagepayload)
- [validate](modules_auth_login_strategy.AuthStrategy.md#validate)
- [verifyIssuer](modules_auth_login_strategy.AuthStrategy.md#verifyissuer)

## Constructors

### constructor

• **new AuthStrategy**(`configService`, `ipfsConfig`, `issuerResolver`, `revokerResolver`, `credentialResolver`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `ipfsConfig` | `any` |
| `issuerResolver` | [`RoleIssuerResolver`](modules_claim_resolvers_issuer_resolver.RoleIssuerResolver.md) |
| `revokerResolver` | [`RoleRevokerResolver`](modules_claim_resolvers_revoker_resolver.RoleRevokerResolver.md) |
| `credentialResolver` | [`RoleCredentialResolver`](modules_claim_resolvers_credential_resolver.RoleCredentialResolver.md) |

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

### extractSiwe

▸ **extractSiwe**(`req`): `SiweReqPayload`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`SiweReqPayload`

#### Inherited from

PassportStrategy(LoginStrategy, 'login').extractSiwe

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

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinitionV2`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinitionV2`\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').getRoleDefinition

___

### isEIP191TokenPayload

▸ **isEIP191TokenPayload**(`payload`): payload is ITokenPayload

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `unknown` |

#### Returns

payload is ITokenPayload

#### Inherited from

PassportStrategy(LoginStrategy, 'login').isEIP191TokenPayload

___

### isSiweMessagePayload

▸ **isSiweMessagePayload**(`payload`): payload is Partial<SiweMessage\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `unknown` |

#### Returns

payload is Partial<SiweMessage\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').isSiweMessagePayload

___

### validate

▸ **validate**(`token`, `payload`, `done`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `payload` | `Partial`<`SiweMessage`\> \| `ITokenPayload` |
| `done` | (`err?`: `Error`, `user?`: `unknown`, `info?`: `unknown`) => `void` |

#### Returns

`Promise`<`void`\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').validate

___

### verifyIssuer

▸ **verifyIssuer**(`issuer`, `role`): `Promise`<`VerificationResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `role` | `string` |

#### Returns

`Promise`<`VerificationResult`\>

#### Inherited from

PassportStrategy(LoginStrategy, 'login').verifyIssuer
