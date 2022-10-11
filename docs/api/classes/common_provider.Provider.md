# Class: Provider

[common/provider](../modules/common_provider.md).Provider

## Hierarchy

- `JsonRpcProvider`

  ↳ **`Provider`**

## Table of contents

### Constructors

- [constructor](common_provider.Provider.md#constructor)

### Methods

- [perform](common_provider.Provider.md#perform)

## Constructors

### constructor

• **new Provider**(`configService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

#### Overrides

providers.JsonRpcProvider.constructor

## Methods

### perform

▸ **perform**(`method`, `params`): `Promise`<`any`\>

Retries failed chain requests https://github.com/ethers-io/ethers.js/issues/427#issuecomment-465329448

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Overrides

providers.JsonRpcProvider.perform
