# Class: IPFSService

[modules/ipfs/ipfs.service](../modules/modules_ipfs_ipfs_service.md).IPFSService

## Table of contents

### Constructors

- [constructor](modules_ipfs_ipfs_service.IPFSService.md#constructor)

### Methods

- [isCID](modules_ipfs_ipfs_service.IPFSService.md#iscid)

## Constructors

### constructor

• **new IPFSService**()

## Methods

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
