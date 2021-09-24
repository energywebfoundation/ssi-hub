# Module: ethers/ENSRegistry

## Table of contents

### Classes

- [ENSRegistry](../classes/ethers_ENSRegistry.ENSRegistry.md)

### Interfaces

- [ENSRegistryInterface](../interfaces/ethers_ENSRegistry.ENSRegistryInterface.md)

### Type aliases

- [ApprovalForAllEvent](ethers_ENSRegistry.md#approvalforallevent)
- [NewOwnerEvent](ethers_ENSRegistry.md#newownerevent)
- [NewResolverEvent](ethers_ENSRegistry.md#newresolverevent)
- [NewTTLEvent](ethers_ENSRegistry.md#newttlevent)
- [TransferEvent](ethers_ENSRegistry.md#transferevent)

## Type aliases

### ApprovalForAllEvent

Ƭ **ApprovalForAllEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `boolean`] & { `approved`: `boolean` ; `operator`: `string` ; `owner`: `string`  }\>

___

### NewOwnerEvent

Ƭ **NewOwnerEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`] & { `label`: `string` ; `node`: `string` ; `owner`: `string`  }\>

___

### NewResolverEvent

Ƭ **NewResolverEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `node`: `string` ; `resolver`: `string`  }\>

___

### NewTTLEvent

Ƭ **NewTTLEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`] & { `node`: `string` ; `ttl`: `BigNumber`  }\>

___

### TransferEvent

Ƭ **TransferEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `node`: `string` ; `owner`: `string`  }\>
