# Class: JSONObjectScalar

[common/json.scalar](../modules/common_json_scalar.md).JSONObjectScalar

## Implements

- `CustomScalar`<`Record`<`string`, `unknown`\>, `Record`<`string`, `unknown`\>\>

## Table of contents

### Constructors

- [constructor](common_json_scalar.JSONObjectScalar.md#constructor)

### Properties

- [description](common_json_scalar.JSONObjectScalar.md#description)

### Methods

- [parseLiteral](common_json_scalar.JSONObjectScalar.md#parseliteral)
- [parseValue](common_json_scalar.JSONObjectScalar.md#parsevalue)
- [serialize](common_json_scalar.JSONObjectScalar.md#serialize)

## Constructors

### constructor

• **new JSONObjectScalar**()

## Properties

### description

• **description**: `string` = `'JSONObject custom scalar type'`

#### Implementation of

CustomScalar.description

## Methods

### parseLiteral

▸ **parseLiteral**(`ast`): `Record`<`string`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ast` | `any` |

#### Returns

`Record`<`string`, `unknown`\>

#### Implementation of

CustomScalar.parseLiteral

___

### parseValue

▸ **parseValue**(`value`): `Record`<`string`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Record`<`string`, `unknown`\> |

#### Returns

`Record`<`string`, `unknown`\>

#### Implementation of

CustomScalar.parseValue

___

### serialize

▸ **serialize**(`value`): `Record`<`string`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Record`<`string`, `unknown`\> |

#### Returns

`Record`<`string`, `unknown`\>

#### Implementation of

CustomScalar.serialize
