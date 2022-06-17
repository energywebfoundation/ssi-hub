# Module: ethers/ENSRegistry

## Table of contents

### Interfaces

- [ENSRegistry](../interfaces/ethers_ENSRegistry.ENSRegistry.md)
- [ENSRegistryInterface](../interfaces/ethers_ENSRegistry.ENSRegistryInterface.md)

### Type Aliases

- [ApprovalForAllEvent](ethers_ENSRegistry.md#approvalforallevent)
- [ApprovalForAllEventFilter](ethers_ENSRegistry.md#approvalforalleventfilter)
- [NewOwnerEvent](ethers_ENSRegistry.md#newownerevent)
- [NewOwnerEventFilter](ethers_ENSRegistry.md#newownereventfilter)
- [NewResolverEvent](ethers_ENSRegistry.md#newresolverevent)
- [NewResolverEventFilter](ethers_ENSRegistry.md#newresolvereventfilter)
- [NewTTLEvent](ethers_ENSRegistry.md#newttlevent)
- [NewTTLEventFilter](ethers_ENSRegistry.md#newttleventfilter)
- [TransferEvent](ethers_ENSRegistry.md#transferevent)
- [TransferEventFilter](ethers_ENSRegistry.md#transfereventfilter)

## Type Aliases

### ApprovalForAllEvent

Ƭ **ApprovalForAllEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `boolean`], { `approved`: `boolean` ; `operator`: `string` ; `owner`: `string`  }\>

___

### ApprovalForAllEventFilter

Ƭ **ApprovalForAllEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`ApprovalForAllEvent`](ethers_ENSRegistry.md#approvalforallevent)\>

___

### NewOwnerEvent

Ƭ **NewOwnerEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`], { `label`: `string` ; `node`: `string` ; `owner`: `string`  }\>

___

### NewOwnerEventFilter

Ƭ **NewOwnerEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`NewOwnerEvent`](ethers_ENSRegistry.md#newownerevent)\>

___

### NewResolverEvent

Ƭ **NewResolverEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `node`: `string` ; `resolver`: `string`  }\>

___

### NewResolverEventFilter

Ƭ **NewResolverEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`NewResolverEvent`](ethers_ENSRegistry.md#newresolverevent)\>

___

### NewTTLEvent

Ƭ **NewTTLEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`], { `node`: `string` ; `ttl`: `BigNumber`  }\>

___

### NewTTLEventFilter

Ƭ **NewTTLEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`NewTTLEvent`](ethers_ENSRegistry.md#newttlevent)\>

___

### TransferEvent

Ƭ **TransferEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `node`: `string` ; `owner`: `string`  }\>

___

### TransferEventFilter

Ƭ **TransferEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`TransferEvent`](ethers_ENSRegistry.md#transferevent)\>
