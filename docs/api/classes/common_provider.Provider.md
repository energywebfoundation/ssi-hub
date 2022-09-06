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

• **new Provider**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Overrides

providers.JsonRpcProvider.constructor

## Methods

### perform

▸ **perform**(`method`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Overrides

providers.JsonRpcProvider.perform
