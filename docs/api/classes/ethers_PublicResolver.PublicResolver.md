# Class: PublicResolver

[ethers/PublicResolver](../modules/ethers_PublicResolver.md).PublicResolver

## Hierarchy

- `BaseContract`

  ↳ **`PublicResolver`**

## Table of contents

### Constructors

- [constructor](ethers_PublicResolver.PublicResolver.md#constructor)

### Properties

- [callStatic](ethers_PublicResolver.PublicResolver.md#callstatic)
- [estimateGas](ethers_PublicResolver.PublicResolver.md#estimategas)
- [filters](ethers_PublicResolver.PublicResolver.md#filters)
- [functions](ethers_PublicResolver.PublicResolver.md#functions)
- [interface](ethers_PublicResolver.PublicResolver.md#interface)
- [populateTransaction](ethers_PublicResolver.PublicResolver.md#populatetransaction)

### Methods

- [ABI](ethers_PublicResolver.PublicResolver.md#abi)
- [addr(bytes32)](ethers_PublicResolver.PublicResolver.md#addr(bytes32))
- [addr(bytes32,uint256)](ethers_PublicResolver.PublicResolver.md#addr(bytes32,uint256))
- [attach](ethers_PublicResolver.PublicResolver.md#attach)
- [authorisations](ethers_PublicResolver.PublicResolver.md#authorisations)
- [clearDNSZone](ethers_PublicResolver.PublicResolver.md#cleardnszone)
- [connect](ethers_PublicResolver.PublicResolver.md#connect)
- [contenthash](ethers_PublicResolver.PublicResolver.md#contenthash)
- [deployed](ethers_PublicResolver.PublicResolver.md#deployed)
- [dnsRecord](ethers_PublicResolver.PublicResolver.md#dnsrecord)
- [hasDNSRecords](ethers_PublicResolver.PublicResolver.md#hasdnsrecords)
- [interfaceImplementer](ethers_PublicResolver.PublicResolver.md#interfaceimplementer)
- [listeners](ethers_PublicResolver.PublicResolver.md#listeners)
- [multicall](ethers_PublicResolver.PublicResolver.md#multicall)
- [name](ethers_PublicResolver.PublicResolver.md#name)
- [off](ethers_PublicResolver.PublicResolver.md#off)
- [on](ethers_PublicResolver.PublicResolver.md#on)
- [once](ethers_PublicResolver.PublicResolver.md#once)
- [pubkey](ethers_PublicResolver.PublicResolver.md#pubkey)
- [queryFilter](ethers_PublicResolver.PublicResolver.md#queryfilter)
- [removeAllListeners](ethers_PublicResolver.PublicResolver.md#removealllisteners)
- [removeListener](ethers_PublicResolver.PublicResolver.md#removelistener)
- [setABI](ethers_PublicResolver.PublicResolver.md#setabi)
- [setAddr(bytes32,address)](ethers_PublicResolver.PublicResolver.md#setaddr(bytes32,address))
- [setAddr(bytes32,uint256,bytes)](ethers_PublicResolver.PublicResolver.md#setaddr(bytes32,uint256,bytes))
- [setAuthorisation](ethers_PublicResolver.PublicResolver.md#setauthorisation)
- [setContenthash](ethers_PublicResolver.PublicResolver.md#setcontenthash)
- [setDNSRecords](ethers_PublicResolver.PublicResolver.md#setdnsrecords)
- [setInterface](ethers_PublicResolver.PublicResolver.md#setinterface)
- [setName](ethers_PublicResolver.PublicResolver.md#setname)
- [setPubkey](ethers_PublicResolver.PublicResolver.md#setpubkey)
- [setText](ethers_PublicResolver.PublicResolver.md#settext)
- [supportsInterface](ethers_PublicResolver.PublicResolver.md#supportsinterface)
- [text](ethers_PublicResolver.PublicResolver.md#text)

## Constructors

### constructor

• **new PublicResolver**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |
| `contractInterface` | `ContractInterface` |
| `signerOrProvider?` | `Signer` \| `Provider` |

#### Inherited from

BaseContract.constructor

## Properties

### callStatic

• **callStatic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABI` | (`node`: `BytesLike`, `contentTypes`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`, `string`]\> |
| `addr(bytes32)` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `addr(bytes32,uint256)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `authorisations` | (`arg0`: `BytesLike`, `arg1`: `string`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `clearDNSZone` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `contenthash` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `dnsRecord` | (`node`: `BytesLike`, `name`: `BytesLike`, `resource`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `hasDNSRecords` | (`node`: `BytesLike`, `name`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `interfaceImplementer` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `multicall` | (`data`: `BytesLike`[], `overrides?`: `CallOverrides`) => `Promise`<`string`[]\> |
| `name` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `pubkey` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`, `string`] & { `x`: `string` ; `y`: `string`  }\> |
| `setABI` | (`node`: `BytesLike`, `contentType`: `BigNumberish`, `data`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setAddr(bytes32,address)` | (`node`: `BytesLike`, `a`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setAddr(bytes32,uint256,bytes)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `a`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setAuthorisation` | (`node`: `BytesLike`, `target`: `string`, `isAuthorised`: `boolean`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setContenthash` | (`node`: `BytesLike`, `hash`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setDNSRecords` | (`node`: `BytesLike`, `data`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setInterface` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `implementer`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setName` | (`node`: `BytesLike`, `name`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setPubkey` | (`node`: `BytesLike`, `x`: `BytesLike`, `y`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `setText` | (`node`: `BytesLike`, `key`: `string`, `value`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `supportsInterface` | (`interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `text` | (`node`: `BytesLike`, `key`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |

#### Overrides

BaseContract.callStatic

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABI` | (`node`: `BytesLike`, `contentTypes`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `addr(bytes32)` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `addr(bytes32,uint256)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `authorisations` | (`arg0`: `BytesLike`, `arg1`: `string`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `clearDNSZone` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `contenthash` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `dnsRecord` | (`node`: `BytesLike`, `name`: `BytesLike`, `resource`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `hasDNSRecords` | (`node`: `BytesLike`, `name`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `interfaceImplementer` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `multicall` | (`data`: `BytesLike`[], `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `name` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `pubkey` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `setABI` | (`node`: `BytesLike`, `contentType`: `BigNumberish`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setAddr(bytes32,address)` | (`node`: `BytesLike`, `a`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setAddr(bytes32,uint256,bytes)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `a`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setAuthorisation` | (`node`: `BytesLike`, `target`: `string`, `isAuthorised`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setContenthash` | (`node`: `BytesLike`, `hash`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setDNSRecords` | (`node`: `BytesLike`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setInterface` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `implementer`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setName` | (`node`: `BytesLike`, `name`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setPubkey` | (`node`: `BytesLike`, `x`: `BytesLike`, `y`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `setText` | (`node`: `BytesLike`, `key`: `string`, `value`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `supportsInterface` | (`interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `text` | (`node`: `BytesLike`, `key`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABIChanged` | (`node?`: `BytesLike`, `contentType?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], { `contentType`: `BigNumber` ; `node`: `string`  }\> |
| `ABIChanged(bytes32,uint256)` | (`node?`: `BytesLike`, `contentType?`: `BigNumberish`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`], { `contentType`: `BigNumber` ; `node`: `string`  }\> |
| `AddrChanged` | (`node?`: `BytesLike`, `a?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `a`: `string` ; `node`: `string`  }\> |
| `AddrChanged(bytes32,address)` | (`node?`: `BytesLike`, `a?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `a`: `string` ; `node`: `string`  }\> |
| `AddressChanged` | (`node?`: `BytesLike`, `coinType?`: ``null``, `newAddress?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`, `string`], { `coinType`: `BigNumber` ; `newAddress`: `string` ; `node`: `string`  }\> |
| `AddressChanged(bytes32,uint256,bytes)` | (`node?`: `BytesLike`, `coinType?`: ``null``, `newAddress?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `BigNumber`, `string`], { `coinType`: `BigNumber` ; `newAddress`: `string` ; `node`: `string`  }\> |
| `AuthorisationChanged` | (`node?`: `BytesLike`, `owner?`: `string`, `target?`: `string`, `isAuthorised?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `boolean`], { `isAuthorised`: `boolean` ; `node`: `string` ; `owner`: `string` ; `target`: `string`  }\> |
| `AuthorisationChanged(bytes32,address,address,bool)` | (`node?`: `BytesLike`, `owner?`: `string`, `target?`: `string`, `isAuthorised?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`, `boolean`], { `isAuthorised`: `boolean` ; `node`: `string` ; `owner`: `string` ; `target`: `string`  }\> |
| `ContenthashChanged` | (`node?`: `BytesLike`, `hash?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `hash`: `string` ; `node`: `string`  }\> |
| `ContenthashChanged(bytes32,bytes)` | (`node?`: `BytesLike`, `hash?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `hash`: `string` ; `node`: `string`  }\> |
| `DNSRecordChanged` | (`node?`: `BytesLike`, `name?`: ``null``, `resource?`: ``null``, `record?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `number`, `string`], { `name`: `string` ; `node`: `string` ; `record`: `string` ; `resource`: `number`  }\> |
| `DNSRecordChanged(bytes32,bytes,uint16,bytes)` | (`node?`: `BytesLike`, `name?`: ``null``, `resource?`: ``null``, `record?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `number`, `string`], { `name`: `string` ; `node`: `string` ; `record`: `string` ; `resource`: `number`  }\> |
| `DNSRecordDeleted` | (`node?`: `BytesLike`, `name?`: ``null``, `resource?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `number`], { `name`: `string` ; `node`: `string` ; `resource`: `number`  }\> |
| `DNSRecordDeleted(bytes32,bytes,uint16)` | (`node?`: `BytesLike`, `name?`: ``null``, `resource?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `number`], { `name`: `string` ; `node`: `string` ; `resource`: `number`  }\> |
| `DNSZoneCleared` | (`node?`: `BytesLike`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`], { `node`: `string`  }\> |
| `DNSZoneCleared(bytes32)` | (`node?`: `BytesLike`) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`], { `node`: `string`  }\> |
| `InterfaceChanged` | (`node?`: `BytesLike`, `interfaceID?`: `BytesLike`, `implementer?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `implementer`: `string` ; `interfaceID`: `string` ; `node`: `string`  }\> |
| `InterfaceChanged(bytes32,bytes4,address)` | (`node?`: `BytesLike`, `interfaceID?`: `BytesLike`, `implementer?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `implementer`: `string` ; `interfaceID`: `string` ; `node`: `string`  }\> |
| `NameChanged` | (`node?`: `BytesLike`, `name?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `name`: `string` ; `node`: `string`  }\> |
| `NameChanged(bytes32,string)` | (`node?`: `BytesLike`, `name?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`], { `name`: `string` ; `node`: `string`  }\> |
| `PubkeyChanged` | (`node?`: `BytesLike`, `x?`: ``null``, `y?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `node`: `string` ; `x`: `string` ; `y`: `string`  }\> |
| `PubkeyChanged(bytes32,bytes32,bytes32)` | (`node?`: `BytesLike`, `x?`: ``null``, `y?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `node`: `string` ; `x`: `string` ; `y`: `string`  }\> |
| `TextChanged` | (`node?`: `BytesLike`, `indexedKey?`: `string`, `key?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `indexedKey`: `string` ; `key`: `string` ; `node`: `string`  }\> |
| `TextChanged(bytes32,string,string)` | (`node?`: `BytesLike`, `indexedKey?`: `string`, `key?`: ``null``) => [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`string`, `string`, `string`], { `indexedKey`: `string` ; `key`: `string` ; `node`: `string`  }\> |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABI` | (`node`: `BytesLike`, `contentTypes`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<[`BigNumber`, `string`]\> |
| `addr(bytes32)` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `addr(bytes32,uint256)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `authorisations` | (`arg0`: `BytesLike`, `arg1`: `string`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `clearDNSZone` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `contenthash` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `dnsRecord` | (`node`: `BytesLike`, `name`: `BytesLike`, `resource`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `hasDNSRecords` | (`node`: `BytesLike`, `name`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `interfaceImplementer` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `multicall` | (`data`: `BytesLike`[], `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `name` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `pubkey` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`string`, `string`] & { `x`: `string` ; `y`: `string`  }\> |
| `setABI` | (`node`: `BytesLike`, `contentType`: `BigNumberish`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setAddr(bytes32,address)` | (`node`: `BytesLike`, `a`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setAddr(bytes32,uint256,bytes)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `a`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setAuthorisation` | (`node`: `BytesLike`, `target`: `string`, `isAuthorised`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setContenthash` | (`node`: `BytesLike`, `hash`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setDNSRecords` | (`node`: `BytesLike`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setInterface` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `implementer`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setName` | (`node`: `BytesLike`, `name`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setPubkey` | (`node`: `BytesLike`, `x`: `BytesLike`, `y`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `setText` | (`node`: `BytesLike`, `key`: `string`, `value`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `supportsInterface` | (`interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `text` | (`node`: `BytesLike`, `key`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`PublicResolverInterface`](../interfaces/ethers_PublicResolver.PublicResolverInterface.md)

#### Overrides

BaseContract.interface

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ABI` | (`node`: `BytesLike`, `contentTypes`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `addr(bytes32)` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `addr(bytes32,uint256)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `authorisations` | (`arg0`: `BytesLike`, `arg1`: `string`, `arg2`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `clearDNSZone` | (`node`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `contenthash` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `dnsRecord` | (`node`: `BytesLike`, `name`: `BytesLike`, `resource`: `BigNumberish`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `hasDNSRecords` | (`node`: `BytesLike`, `name`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `interfaceImplementer` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `multicall` | (`data`: `BytesLike`[], `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `name` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `pubkey` | (`node`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `setABI` | (`node`: `BytesLike`, `contentType`: `BigNumberish`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setAddr(bytes32,address)` | (`node`: `BytesLike`, `a`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setAddr(bytes32,uint256,bytes)` | (`node`: `BytesLike`, `coinType`: `BigNumberish`, `a`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setAuthorisation` | (`node`: `BytesLike`, `target`: `string`, `isAuthorised`: `boolean`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setContenthash` | (`node`: `BytesLike`, `hash`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setDNSRecords` | (`node`: `BytesLike`, `data`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setInterface` | (`node`: `BytesLike`, `interfaceID`: `BytesLike`, `implementer`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setName` | (`node`: `BytesLike`, `name`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setPubkey` | (`node`: `BytesLike`, `x`: `BytesLike`, `y`: `BytesLike`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `setText` | (`node`: `BytesLike`, `key`: `string`, `value`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `supportsInterface` | (`interfaceID`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `text` | (`node`: `BytesLike`, `key`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

## Methods

### ABI

▸ **ABI**(`node`, `contentTypes`, `overrides?`): `Promise`<[`BigNumber`, `string`]\>

Returns the ABI associated with an ENS node. Defined in EIP205.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query |
| `contentTypes` | `BigNumberish` | A bitwise OR of the ABI formats accepted by the caller. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<[`BigNumber`, `string`]\>

contentType The content type of the return valuedata The ABI data

___

### addr(bytes32)

▸ **addr(bytes32)**(`node`, `overrides?`): `Promise`<`string`\>

Returns the address associated with an ENS node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

The associated address.

___

### addr(bytes32,uint256)

▸ **addr(bytes32,uint256)**(`node`, `coinType`, `overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `BytesLike` |
| `coinType` | `BigNumberish` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

___

### attach

▸ **attach**(`addressOrName`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.attach

___

### authorisations

▸ **authorisations**(`arg0`, `arg1`, `arg2`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `BytesLike` |
| `arg1` | `string` |
| `arg2` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### clearDNSZone

▸ **clearDNSZone**(`node`, `overrides?`): `Promise`<`ContractTransaction`\>

Clear all information for a DNS zone.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | the namehash of the node for which to clear the zone |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Provider` \| `Signer` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.connect

___

### contenthash

▸ **contenthash**(`node`, `overrides?`): `Promise`<`string`\>

Returns the contenthash associated with an ENS node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

The associated contenthash.

___

### deployed

▸ **deployed**(): `Promise`<[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)\>

#### Returns

`Promise`<[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)\>

#### Overrides

BaseContract.deployed

___

### dnsRecord

▸ **dnsRecord**(`node`, `name`, `resource`, `overrides?`): `Promise`<`string`\>

Obtain a DNS record.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | the namehash of the node for which to fetch the record |
| `name` | `BytesLike` | the keccak-256 hash of the fully-qualified name for which to fetch the record |
| `resource` | `BigNumberish` | the ID of the resource as per https://en.wikipedia.org/wiki/List_of_DNS_record_types |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

the DNS record in wire format if present, otherwise empty

___

### hasDNSRecords

▸ **hasDNSRecords**(`node`, `name`, `overrides?`): `Promise`<`boolean`\>

Check if a given node has records.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | the namehash of the node for which to check the records |
| `name` | `BytesLike` | the namehash of the node for which to check the records |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`boolean`\>

___

### interfaceImplementer

▸ **interfaceImplementer**(`node`, `interfaceID`, `overrides?`): `Promise`<`string`\>

Returns the address of a contract that implements the specified interface for this name. If an implementer has not been set for this interfaceID and name, the resolver will query the contract at `addr()`. If `addr()` is set, a contract exists at that address, and that contract implements EIP168 and returns `true` for the specified interfaceID, its address will be returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query. |
| `interfaceID` | `BytesLike` | The EIP 168 interface ID to check for. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

The address that implements this interface, or 0 if the interface is unsupported.

___

### listeners

▸ **listeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter?`): [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\>[]

#### Overrides

BaseContract.listeners

▸ **listeners**(`eventName?`): `Listener`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

`Listener`[]

#### Overrides

BaseContract.listeners

___

### multicall

▸ **multicall**(`data`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike`[] |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### name

▸ **name**(`node`, `overrides?`): `Promise`<`string`\>

Returns the name associated with an ENS node, for reverse records. Defined in EIP181.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

The associated name.

___

### off

▸ **off**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.off

▸ **off**(`eventName`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.off

___

### on

▸ **on**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.on

▸ **on**(`eventName`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.on

___

### once

▸ **once**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.once

▸ **once**(`eventName`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.once

___

### pubkey

▸ **pubkey**(`node`, `overrides?`): `Promise`<[`string`, `string`] & { `x`: `string` ; `y`: `string`  }\>

Returns the SECP256k1 public key associated with an ENS node. Defined in EIP 619.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<[`string`, `string`] & { `x`: `string` ; `y`: `string`  }\>

x, y the X and Y coordinates of the curve point for the public key.

___

### queryFilter

▸ **queryFilter**<`EventArgsArray`, `EventArgsObject`\>(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `fromBlockOrBlockhash?` | `string` \| `number` |
| `toBlock?` | `string` \| `number` |

#### Returns

`Promise`<[`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>[]\>

#### Overrides

BaseContract.queryFilter

___

### removeAllListeners

▸ **removeAllListeners**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.removeAllListeners

___

### removeListener

▸ **removeListener**<`EventArgsArray`, `EventArgsObject`\>(`eventFilter`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<`EventArgsArray`, `EventArgsObject`\> |
| `listener` | [`TypedListener`](../modules/ethers_common.md#typedlistener)<`EventArgsArray`, `EventArgsObject`\> |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.removeListener

▸ **removeListener**(`eventName`, `listener`): [`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

[`PublicResolver`](ethers_PublicResolver.PublicResolver.md)

#### Overrides

BaseContract.removeListener

___

### setABI

▸ **setABI**(`node`, `contentType`, `data`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the ABI associated with an ENS node. Nodes may have one ABI of each content type. To remove an ABI, set it to the empty string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `contentType` | `BigNumberish` | The content type of the ABI |
| `data` | `BytesLike` | The ABI data. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setAddr(bytes32,address)

▸ **setAddr(bytes32,address)**(`node`, `a`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the address associated with an ENS node. May only be called by the owner of that node in the ENS registry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `a` | `string` | The address to set. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setAddr(bytes32,uint256,bytes)

▸ **setAddr(bytes32,uint256,bytes)**(`node`, `coinType`, `a`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `BytesLike` |
| `coinType` | `BigNumberish` |
| `a` | `BytesLike` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setAuthorisation

▸ **setAuthorisation**(`node`, `target`, `isAuthorised`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets or clears an authorisation. Authorisations are specific to the caller. Any account can set an authorisation for any name, but the authorisation that is checked will be that of the current owner of a name. Thus, transferring a name effectively clears any existing authorisations, and new authorisations can be set in advance of an ownership transfer if desired.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The name to change the authorisation on. |
| `target` | `string` | The address that is to be authorised or deauthorised. |
| `isAuthorised` | `boolean` | True if the address should be authorised, or false if it should be deauthorised. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setContenthash

▸ **setContenthash**(`node`, `hash`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the contenthash associated with an ENS node. May only be called by the owner of that node in the ENS registry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `hash` | `BytesLike` | The contenthash to set |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setDNSRecords

▸ **setDNSRecords**(`node`, `data`, `overrides?`): `Promise`<`ContractTransaction`\>

Set one or more DNS records.  Records are supplied in wire-format. Records with the same node/name/resource must be supplied one after the other to ensure the data is updated correctly. For example, if the data was supplied:    a.example.com IN A 1.2.3.4    a.example.com IN A 5.6.7.8    www.example.com IN CNAME a.example.com. then this would store the two A records for a.example.com correctly as a single RRSET, however if the data was supplied:    a.example.com IN A 1.2.3.4    www.example.com IN CNAME a.example.com.    a.example.com IN A 5.6.7.8 then this would store the first A record, the CNAME, then the second A record which would overwrite the first.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | the namehash of the node for which to set the records |
| `data` | `BytesLike` | the DNS wire format records to set |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setInterface

▸ **setInterface**(`node`, `interfaceID`, `implementer`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets an interface associated with a name. Setting the address to 0 restores the default behaviour of querying the contract at `addr()` for interface support.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `interfaceID` | `BytesLike` | The EIP 168 interface ID. |
| `implementer` | `string` | The address of a contract that implements this interface for this node. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setName

▸ **setName**(`node`, `name`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the name associated with an ENS node, for reverse records. May only be called by the owner of that node in the ENS registry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `name` | `string` | The name to set. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setPubkey

▸ **setPubkey**(`node`, `x`, `y`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the SECP256k1 public key associated with an ENS node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query |
| `x` | `BytesLike` | the X coordinate of the curve point for the public key. |
| `y` | `BytesLike` | the Y coordinate of the curve point for the public key. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### setText

▸ **setText**(`node`, `key`, `value`, `overrides?`): `Promise`<`ContractTransaction`\>

Sets the text data associated with an ENS node and key. May only be called by the owner of that node in the ENS registry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The node to update. |
| `key` | `string` | The key to set. |
| `value` | `string` | The text data value to set. |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } | - |

#### Returns

`Promise`<`ContractTransaction`\>

___

### supportsInterface

▸ **supportsInterface**(`interfaceID`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `interfaceID` | `BytesLike` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### text

▸ **text**(`node`, `key`, `overrides?`): `Promise`<`string`\>

Returns the text data associated with an ENS node and key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `BytesLike` | The ENS node to query. |
| `key` | `string` | The text data key to query. |
| `overrides?` | `CallOverrides` | - |

#### Returns

`Promise`<`string`\>

The associated text data.
