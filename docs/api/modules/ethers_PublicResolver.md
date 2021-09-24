# Module: ethers/PublicResolver

## Table of contents

### Classes

- [PublicResolver](../classes/ethers_PublicResolver.PublicResolver.md)

### Interfaces

- [PublicResolverInterface](../interfaces/ethers_PublicResolver.PublicResolverInterface.md)

### Type aliases

- [ABIChangedEvent](ethers_PublicResolver.md#abichangedevent)
- [AddrChangedEvent](ethers_PublicResolver.md#addrchangedevent)
- [AddressChangedEvent](ethers_PublicResolver.md#addresschangedevent)
- [AuthorisationChangedEvent](ethers_PublicResolver.md#authorisationchangedevent)
- [ContenthashChangedEvent](ethers_PublicResolver.md#contenthashchangedevent)
- [DNSRecordChangedEvent](ethers_PublicResolver.md#dnsrecordchangedevent)
- [DNSRecordDeletedEvent](ethers_PublicResolver.md#dnsrecorddeletedevent)
- [DNSZoneClearedEvent](ethers_PublicResolver.md#dnszoneclearedevent)
- [InterfaceChangedEvent](ethers_PublicResolver.md#interfacechangedevent)
- [NameChangedEvent](ethers_PublicResolver.md#namechangedevent)
- [PubkeyChangedEvent](ethers_PublicResolver.md#pubkeychangedevent)
- [TextChangedEvent](ethers_PublicResolver.md#textchangedevent)

## Type aliases

### ABIChangedEvent

Ƭ **ABIChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`] & { `contentType`: `BigNumber` ; `node`: `string`  }\>

___

### AddrChangedEvent

Ƭ **AddrChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `a`: `string` ; `node`: `string`  }\>

___

### AddressChangedEvent

Ƭ **AddressChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`, `string`] & { `coinType`: `BigNumber` ; `newAddress`: `string` ; `node`: `string`  }\>

___

### AuthorisationChangedEvent

Ƭ **AuthorisationChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `boolean`] & { `isAuthorised`: `boolean` ; `node`: `string` ; `owner`: `string` ; `target`: `string`  }\>

___

### ContenthashChangedEvent

Ƭ **ContenthashChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `hash`: `string` ; `node`: `string`  }\>

___

### DNSRecordChangedEvent

Ƭ **DNSRecordChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `number`, `string`] & { `name`: `string` ; `node`: `string` ; `record`: `string` ; `resource`: `number`  }\>

___

### DNSRecordDeletedEvent

Ƭ **DNSRecordDeletedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `number`] & { `name`: `string` ; `node`: `string` ; `resource`: `number`  }\>

___

### DNSZoneClearedEvent

Ƭ **DNSZoneClearedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`] & { `node`: `string`  }\>

___

### InterfaceChangedEvent

Ƭ **InterfaceChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`] & { `implementer`: `string` ; `interfaceID`: `string` ; `node`: `string`  }\>

___

### NameChangedEvent

Ƭ **NameChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `name`: `string` ; `node`: `string`  }\>

___

### PubkeyChangedEvent

Ƭ **PubkeyChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`] & { `node`: `string` ; `x`: `string` ; `y`: `string`  }\>

___

### TextChangedEvent

Ƭ **TextChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`] & { `indexedKey`: `string` ; `key`: `string` ; `node`: `string`  }\>
