# Interface: PublicResolverInterface

[ethers/PublicResolver](../modules/ethers_PublicResolver.md).PublicResolverInterface

## Hierarchy

- `Interface`

  ↳ **`PublicResolverInterface`**

## Table of contents

### Properties

- [contractName](ethers_PublicResolver.PublicResolverInterface.md#contractname)
- [events](ethers_PublicResolver.PublicResolverInterface.md#events)
- [functions](ethers_PublicResolver.PublicResolverInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_PublicResolver.PublicResolverInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_PublicResolver.PublicResolverInterface.md#encodefunctiondata)
- [getEvent](ethers_PublicResolver.PublicResolverInterface.md#getevent)

## Properties

### contractName

• **contractName**: ``"PublicResolver"``

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABIChanged(bytes32,uint256)` | `EventFragment` |
| `AddrChanged(bytes32,address)` | `EventFragment` |
| `AddressChanged(bytes32,uint256,bytes)` | `EventFragment` |
| `AuthorisationChanged(bytes32,address,address,bool)` | `EventFragment` |
| `ContenthashChanged(bytes32,bytes)` | `EventFragment` |
| `DNSRecordChanged(bytes32,bytes,uint16,bytes)` | `EventFragment` |
| `DNSRecordDeleted(bytes32,bytes,uint16)` | `EventFragment` |
| `DNSZoneCleared(bytes32)` | `EventFragment` |
| `InterfaceChanged(bytes32,bytes4,address)` | `EventFragment` |
| `NameChanged(bytes32,string)` | `EventFragment` |
| `PubkeyChanged(bytes32,bytes32,bytes32)` | `EventFragment` |
| `TextChanged(bytes32,string,string)` | `EventFragment` |

#### Overrides

utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABI(bytes32,uint256)` | `FunctionFragment` |
| `addr(bytes32)` | `FunctionFragment` |
| `authorisations(bytes32,address,address)` | `FunctionFragment` |
| `clearDNSZone(bytes32)` | `FunctionFragment` |
| `contenthash(bytes32)` | `FunctionFragment` |
| `dnsRecord(bytes32,bytes32,uint16)` | `FunctionFragment` |
| `hasDNSRecords(bytes32,bytes32)` | `FunctionFragment` |
| `interfaceImplementer(bytes32,bytes4)` | `FunctionFragment` |
| `multicall(bytes[])` | `FunctionFragment` |
| `name(bytes32)` | `FunctionFragment` |
| `pubkey(bytes32)` | `FunctionFragment` |
| `setABI(bytes32,uint256,bytes)` | `FunctionFragment` |
| `setAddr(bytes32,uint256,bytes)` | `FunctionFragment` |
| `setAuthorisation(bytes32,address,bool)` | `FunctionFragment` |
| `setContenthash(bytes32,bytes)` | `FunctionFragment` |
| `setDNSRecords(bytes32,bytes)` | `FunctionFragment` |
| `setInterface(bytes32,bytes4,address)` | `FunctionFragment` |
| `setName(bytes32,string)` | `FunctionFragment` |
| `setPubkey(bytes32,bytes32,bytes32)` | `FunctionFragment` |
| `setText(bytes32,string,string)` | `FunctionFragment` |
| `supportsInterface(bytes4)` | `FunctionFragment` |
| `text(bytes32,string)` | `FunctionFragment` |

#### Overrides

utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"supportsInterface"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setDNSRecords"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setText"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"interfaceImplementer"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ABI"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setPubkey"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setContenthash"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addr"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"hasDNSRecords"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"text"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setABI"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"name"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setName"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAddr"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"dnsRecord"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"clearDNSZone"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"contenthash"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"pubkey"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setInterface"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"authorisations"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAuthorisation"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"multicall"`` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Overrides

utils.Interface.decodeFunctionResult

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"supportsInterface"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setDNSRecords"`` |
| `values` | [`BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setText"`` |
| `values` | [`BytesLike`, `string`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"interfaceImplementer"`` |
| `values` | [`BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"ABI"`` |
| `values` | [`BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setPubkey"`` |
| `values` | [`BytesLike`, `BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setContenthash"`` |
| `values` | [`BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"addr"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"hasDNSRecords"`` |
| `values` | [`BytesLike`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"text"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setABI"`` |
| `values` | [`BytesLike`, `BigNumberish`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"name"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setName"`` |
| `values` | [`BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAddr"`` |
| `values` | [`BytesLike`, `BigNumberish`, `BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"dnsRecord"`` |
| `values` | [`BytesLike`, `BytesLike`, `BigNumberish`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"clearDNSZone"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"contenthash"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"pubkey"`` |
| `values` | [`BytesLike`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setInterface"`` |
| `values` | [`BytesLike`, `BytesLike`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"authorisations"`` |
| `values` | [`BytesLike`, `string`, `string`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"setAuthorisation"`` |
| `values` | [`BytesLike`, `string`, `boolean`] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"multicall"`` |
| `values` | [`BytesLike`[]] |

#### Returns

`string`

#### Overrides

utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"AuthorisationChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"TextChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"PubkeyChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"NameChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"InterfaceChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DNSRecordChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DNSRecordDeleted"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"DNSZoneCleared"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"ContenthashChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"AddrChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"AddressChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"ABIChanged"`` |

#### Returns

`EventFragment`

#### Overrides

utils.Interface.getEvent
