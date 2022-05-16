# Module: ethers/PublicResolver

## Table of contents

### Interfaces

- [PublicResolver](../interfaces/ethers_PublicResolver.PublicResolver.md)
- [PublicResolverInterface](../interfaces/ethers_PublicResolver.PublicResolverInterface.md)

### Type aliases

- [ABIChangedEvent](ethers_PublicResolver.md#abichangedevent)
- [ABIChangedEventFilter](ethers_PublicResolver.md#abichangedeventfilter)
- [AddrChangedEvent](ethers_PublicResolver.md#addrchangedevent)
- [AddrChangedEventFilter](ethers_PublicResolver.md#addrchangedeventfilter)
- [AddressChangedEvent](ethers_PublicResolver.md#addresschangedevent)
- [AddressChangedEventFilter](ethers_PublicResolver.md#addresschangedeventfilter)
- [AuthorisationChangedEvent](ethers_PublicResolver.md#authorisationchangedevent)
- [AuthorisationChangedEventFilter](ethers_PublicResolver.md#authorisationchangedeventfilter)
- [ContenthashChangedEvent](ethers_PublicResolver.md#contenthashchangedevent)
- [ContenthashChangedEventFilter](ethers_PublicResolver.md#contenthashchangedeventfilter)
- [DNSRecordChangedEvent](ethers_PublicResolver.md#dnsrecordchangedevent)
- [DNSRecordChangedEventFilter](ethers_PublicResolver.md#dnsrecordchangedeventfilter)
- [DNSRecordDeletedEvent](ethers_PublicResolver.md#dnsrecorddeletedevent)
- [DNSRecordDeletedEventFilter](ethers_PublicResolver.md#dnsrecorddeletedeventfilter)
- [DNSZoneClearedEvent](ethers_PublicResolver.md#dnszoneclearedevent)
- [DNSZoneClearedEventFilter](ethers_PublicResolver.md#dnszoneclearedeventfilter)
- [InterfaceChangedEvent](ethers_PublicResolver.md#interfacechangedevent)
- [InterfaceChangedEventFilter](ethers_PublicResolver.md#interfacechangedeventfilter)
- [NameChangedEvent](ethers_PublicResolver.md#namechangedevent)
- [NameChangedEventFilter](ethers_PublicResolver.md#namechangedeventfilter)
- [PubkeyChangedEvent](ethers_PublicResolver.md#pubkeychangedevent)
- [PubkeyChangedEventFilter](ethers_PublicResolver.md#pubkeychangedeventfilter)
- [TextChangedEvent](ethers_PublicResolver.md#textchangedevent)
- [TextChangedEventFilter](ethers_PublicResolver.md#textchangedeventfilter)

## Type aliases

### ABIChangedEvent

Ƭ **ABIChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`], { `contentType`: `BigNumber` ; `node`: `string`  }\>

___

### ABIChangedEventFilter

Ƭ **ABIChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`ABIChangedEvent`](ethers_PublicResolver.md#abichangedevent)\>

___

### AddrChangedEvent

Ƭ **AddrChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `a`: `string` ; `node`: `string`  }\>

___

### AddrChangedEventFilter

Ƭ **AddrChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`AddrChangedEvent`](ethers_PublicResolver.md#addrchangedevent)\>

___

### AddressChangedEvent

Ƭ **AddressChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `BigNumber`, `string`], { `coinType`: `BigNumber` ; `newAddress`: `string` ; `node`: `string`  }\>

___

### AddressChangedEventFilter

Ƭ **AddressChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`AddressChangedEvent`](ethers_PublicResolver.md#addresschangedevent)\>

___

### AuthorisationChangedEvent

Ƭ **AuthorisationChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `boolean`], { `isAuthorised`: `boolean` ; `node`: `string` ; `owner`: `string` ; `target`: `string`  }\>

___

### AuthorisationChangedEventFilter

Ƭ **AuthorisationChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`AuthorisationChangedEvent`](ethers_PublicResolver.md#authorisationchangedevent)\>

___

### ContenthashChangedEvent

Ƭ **ContenthashChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `hash`: `string` ; `node`: `string`  }\>

___

### ContenthashChangedEventFilter

Ƭ **ContenthashChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`ContenthashChangedEvent`](ethers_PublicResolver.md#contenthashchangedevent)\>

___

### DNSRecordChangedEvent

Ƭ **DNSRecordChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `number`, `string`], { `name`: `string` ; `node`: `string` ; `record`: `string` ; `resource`: `number`  }\>

___

### DNSRecordChangedEventFilter

Ƭ **DNSRecordChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DNSRecordChangedEvent`](ethers_PublicResolver.md#dnsrecordchangedevent)\>

___

### DNSRecordDeletedEvent

Ƭ **DNSRecordDeletedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `number`], { `name`: `string` ; `node`: `string` ; `resource`: `number`  }\>

___

### DNSRecordDeletedEventFilter

Ƭ **DNSRecordDeletedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DNSRecordDeletedEvent`](ethers_PublicResolver.md#dnsrecorddeletedevent)\>

___

### DNSZoneClearedEvent

Ƭ **DNSZoneClearedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`], { `node`: `string`  }\>

___

### DNSZoneClearedEventFilter

Ƭ **DNSZoneClearedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`DNSZoneClearedEvent`](ethers_PublicResolver.md#dnszoneclearedevent)\>

___

### InterfaceChangedEvent

Ƭ **InterfaceChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`], { `implementer`: `string` ; `interfaceID`: `string` ; `node`: `string`  }\>

___

### InterfaceChangedEventFilter

Ƭ **InterfaceChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`InterfaceChangedEvent`](ethers_PublicResolver.md#interfacechangedevent)\>

___

### NameChangedEvent

Ƭ **NameChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `name`: `string` ; `node`: `string`  }\>

___

### NameChangedEventFilter

Ƭ **NameChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`NameChangedEvent`](ethers_PublicResolver.md#namechangedevent)\>

___

### PubkeyChangedEvent

Ƭ **PubkeyChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`], { `node`: `string` ; `x`: `string` ; `y`: `string`  }\>

___

### PubkeyChangedEventFilter

Ƭ **PubkeyChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`PubkeyChangedEvent`](ethers_PublicResolver.md#pubkeychangedevent)\>

___

### TextChangedEvent

Ƭ **TextChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`], { `indexedKey`: `string` ; `key`: `string` ; `node`: `string`  }\>

___

### TextChangedEventFilter

Ƭ **TextChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`TextChangedEvent`](ethers_PublicResolver.md#textchangedevent)\>
