# Module: ethers/EthereumDIDRegistry

## Table of contents

### Interfaces

- [EthereumDIDRegistry](../interfaces/ethers_EthereumDIDRegistry.EthereumDIDRegistry.md)
- [EthereumDIDRegistryInterface](../interfaces/ethers_EthereumDIDRegistry.EthereumDIDRegistryInterface.md)

### Type aliases

- [DIDAttributeChangedEvent](ethers_EthereumDIDRegistry.md#didattributechangedevent)
- [DIDAttributeChangedEventFilter](ethers_EthereumDIDRegistry.md#didattributechangedeventfilter)
- [DIDDelegateChangedEvent](ethers_EthereumDIDRegistry.md#diddelegatechangedevent)
- [DIDDelegateChangedEventFilter](ethers_EthereumDIDRegistry.md#diddelegatechangedeventfilter)
- [DIDOwnerChangedEvent](ethers_EthereumDIDRegistry.md#didownerchangedevent)
- [DIDOwnerChangedEventFilter](ethers_EthereumDIDRegistry.md#didownerchangedeventfilter)

## Type aliases

### DIDAttributeChangedEvent

Ƭ **DIDAttributeChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], { `identity`: `string` ; `name`: `string` ; `previousChange`: `BigNumber` ; `validTo`: `BigNumber` ; `value`: `string`  }\>

___

### DIDAttributeChangedEventFilter

Ƭ **DIDAttributeChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DIDAttributeChangedEvent`](ethers_EthereumDIDRegistry.md#didattributechangedevent)\>

___

### DIDDelegateChangedEvent

Ƭ **DIDDelegateChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`, `BigNumber`], { `delegate`: `string` ; `delegateType`: `string` ; `identity`: `string` ; `previousChange`: `BigNumber` ; `validTo`: `BigNumber`  }\>

___

### DIDDelegateChangedEventFilter

Ƭ **DIDDelegateChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DIDDelegateChangedEvent`](ethers_EthereumDIDRegistry.md#diddelegatechangedevent)\>

___

### DIDOwnerChangedEvent

Ƭ **DIDOwnerChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`], { `identity`: `string` ; `owner`: `string` ; `previousChange`: `BigNumber`  }\>

___

### DIDOwnerChangedEventFilter

Ƭ **DIDOwnerChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DIDOwnerChangedEvent`](ethers_EthereumDIDRegistry.md#didownerchangedevent)\>
