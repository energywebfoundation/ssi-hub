# Class: IPFSController

[modules/ipfs/ipfs.controller](../modules/modules_ipfs_ipfs_controller.md).IPFSController

## Table of contents

### Constructors

- [constructor](modules_ipfs_ipfs_controller.IPFSController.md#constructor)

### Methods

- [get](modules_ipfs_ipfs_controller.IPFSController.md#get)
- [save](modules_ipfs_ipfs_controller.IPFSController.md#save)

## Constructors

### constructor

• **new IPFSController**(`ipfsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipfsService` | [`IPFSService`](modules_ipfs_ipfs_service.IPFSService.md) |

## Methods

### get

▸ **get**(`cid`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cid` | `CID` |

#### Returns

`Promise`<`string`\>

___

### save

▸ **save**(`credential`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | `string` \| `object` |

#### Returns

`Promise`<`string`\>
