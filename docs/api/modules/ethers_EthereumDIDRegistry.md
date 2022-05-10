# Module: ethers/EthereumDIDRegistry

## Table of contents

### Classes

- [EthereumDIDRegistry](../classes/ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)

### Interfaces

- [EthereumDIDRegistryInterface](../interfaces/ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md)

### Type aliases

- [DIDAttributeChangedEvent](ethers_EthereumDIDRegistry.md#didattributechangedevent)
- [DIDDelegateChangedEvent](ethers_EthereumDIDRegistry.md#diddelegatechangedevent)
- [DIDOwnerChangedEvent](ethers_EthereumDIDRegistry.md#didownerchangedevent)

## Type aliases

### DIDAttributeChangedEvent

Ƭ **DIDAttributeChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`] & { `identity`: `string` ; `name`: `string` ; `previousChange`: `BigNumber` ; `validTo`: `BigNumber` ; `value`: `string`  }\>

___

### DIDDelegateChangedEvent

Ƭ **DIDDelegateChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`] & { `delegate`: `string` ; `delegateType`: `string` ; `identity`: `string` ; `previousChange`: `BigNumber` ; `validTo`: `BigNumber`  }\>

___

### DIDOwnerChangedEvent

Ƭ **DIDOwnerChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`] & { `identity`: `string` ; `owner`: `string` ; `previousChange`: `BigNumber`  }\>
