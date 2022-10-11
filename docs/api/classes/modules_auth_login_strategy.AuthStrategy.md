# Class: AuthStrategy

[modules/auth/login.strategy](../modules/modules_auth_login_strategy.md).AuthStrategy

## Hierarchy

- `LoginStrategy`<`this`\>

  ↳ **`AuthStrategy`**

## Table of contents

### Constructors

- [constructor](modules_auth_login_strategy.AuthStrategy.md#constructor)

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
