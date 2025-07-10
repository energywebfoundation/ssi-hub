# Class: S3Service

[modules/s3/s3.service](../modules/modules_s3_s3_service.md).S3Service

## Table of contents

### Constructors

- [constructor](modules_s3_s3_service.S3Service.md#constructor)

### Methods

- [get](modules_s3_s3_service.S3Service.md#get)
- [getWithTimeout](modules_s3_s3_service.S3Service.md#getwithtimeout)
- [save](modules_s3_s3_service.S3Service.md#save)
- [isCID](modules_s3_s3_service.S3Service.md#iscid)

## Constructors

### constructor

• **new S3Service**(`didStore`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didStore` | `DidStore` |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### get

▸ **get**(`cid`): `Promise`<`string`\>

Get claim from cluster. If claim isn't found tries to get from gateway

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cid` | `string` | Content identifier. |

#### Returns

`Promise`<`string`\>

Stringified credential

___

### getWithTimeout

▸ **getWithTimeout**(`cid`, `timeoutMs`): `Promise`<`string`\>

Get claim from cluster with timeout. If claim isn't found tries to get from gateway

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cid` | `string` | Content identifier. |
| `timeoutMs` | `number` | timeout waiting. |

#### Returns

`Promise`<`string`\>

Stringified credential

___

### save

▸ **save**(`credential`): `Promise`<`string`\>

Saves credential on cluster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `string` | Credential being persisted |

#### Returns

`Promise`<`string`\>

CID of the persisted credential

___

### isCID

▸ `Static` **isCID**(`hash`): `boolean`

Check if given value is a valid S3 CID.

```typescript
didService.isCID('Qm...');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `unknown` | value to check |

#### Returns

`boolean`
