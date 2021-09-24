# Interface: IdentityManagerInterface

[ethers/IdentityManager](../modules/ethers_IdentityManager.md).IdentityManagerInterface

## Hierarchy

- `Interface`

  ↳ **`IdentityManagerInterface`**

## Table of contents

### Properties

- [events](ethers_IdentityManager.IdentityManagerInterface.md#events)
- [functions](ethers_IdentityManager.IdentityManagerInterface.md#functions)

### Methods

- [decodeFunctionResult](ethers_IdentityManager.IdentityManagerInterface.md#decodefunctionresult)
- [encodeFunctionData](ethers_IdentityManager.IdentityManagerInterface.md#encodefunctiondata)
- [getEvent](ethers_IdentityManager.IdentityManagerInterface.md#getevent)

## Properties

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `IdentityCreated(address,address,uint256)` | `any` |
| `IdentityOfferCanceled(address,address,address,uint256)` | `any` |
| `IdentityOfferRejected(address,address,address,uint256)` | `any` |
| `IdentityOffered(address,address,address,uint256)` | `any` |
| `IdentityTransferred(address,address,uint256)` | `any` |

#### Overrides

ethers.utils.Interface.events

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant(address)` | `any` |
| `createIdentity(address)` | `any` |
| `identityAccepted(address)` | `any` |
| `identityCreated(address)` | `any` |
| `identityOfferCanceled(address)` | `any` |
| `identityOffered(address)` | `any` |
| `identityOwner(address)` | `any` |
| `identityRejected(address)` | `any` |
| `verified(address)` | `any` |

#### Overrides

ethers.utils.Interface.functions

## Methods

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"verified"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"compliant"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOwner"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"createIdentity"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityCreated"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOffered"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityAccepted"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityRejected"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOfferCanceled"`` |
| `data` | `BytesLike` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.decodeFunctionResult

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"verified"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"compliant"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOwner"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"createIdentity"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityCreated"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOffered"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityAccepted"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityRejected"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | ``"identityOfferCanceled"`` |
| `values` | [`string`] |

#### Returns

`string`

#### Overrides

ethers.utils.Interface.encodeFunctionData

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"IdentityCreated"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"IdentityOfferCanceled"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"IdentityOfferRejected"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"IdentityOffered"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | ``"IdentityTransferred"`` |

#### Returns

`any`

#### Overrides

ethers.utils.Interface.getEvent
