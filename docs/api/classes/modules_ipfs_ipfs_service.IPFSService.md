# Class: IPFSService

[modules/ipfs/ipfs.service](../modules/modules_ipfs_ipfs_service.md).IPFSService

## Table of contents

### Constructors

- [constructor](modules_ipfs_ipfs_service.IPFSService.md#constructor)

### Methods

- [get](modules_ipfs_ipfs_service.IPFSService.md#get)
- [save](modules_ipfs_ipfs_service.IPFSService.md#save)
- [isCID](modules_ipfs_ipfs_service.IPFSService.md#iscid)

## Constructors

### constructor

• **new IPFSService**(`didStoreInfura`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `didStoreInfura` | `DidStore` |
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

Check if given value is a valid IPFS CID.

```typescript
didService.isCID('Qm...');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `unknown` | value to check |

#### Returns

`boolean`
