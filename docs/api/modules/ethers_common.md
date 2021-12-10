# Module: ethers/common

## Table of contents

### Interfaces

- [TypedEvent](../interfaces/ethers_common.TypedEvent.md)
- [TypedEventFilter](../interfaces/ethers_common.TypedEventFilter.md)

### Type aliases

- [GetARGsTypeFromFactory](ethers_common.md#getargstypefromfactory)
- [GetContractTypeFromFactory](ethers_common.md#getcontracttypefromfactory)
- [MinEthersFactory](ethers_common.md#minethersfactory)
- [TypedListener](ethers_common.md#typedlistener)

## Type aliases

### GetARGsTypeFromFactory

Ƭ **GetARGsTypeFromFactory**<`F`\>: `F` extends [`MinEthersFactory`](ethers_common.md#minethersfactory)<`any`, `any`\> ? `Parameters`<`F`[``"deploy"``]\> : `never`

#### Type parameters

| Name |
| :------ |
| `F` |

___

### GetContractTypeFromFactory

Ƭ **GetContractTypeFromFactory**<`F`\>: `F` extends [`MinEthersFactory`](ethers_common.md#minethersfactory)<infer C, `any`\> ? `C` : `never`

#### Type parameters

| Name |
| :------ |
| `F` |

___

### MinEthersFactory

Ƭ **MinEthersFactory**<`C`, `ARGS`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `C` |
| `ARGS` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deploy` | (...`a`: `ARGS`[]) => `Promise`<`C`\> |

___

### TypedListener

Ƭ **TypedListener**<`EventArgsArray`, `EventArgsObject`\>: (...`listenerArg`: [...EventArgsArray, [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>]) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | extends `any`[] |
| `EventArgsObject` | `EventArgsObject` |

#### Type declaration

▸ (...`listenerArg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...listenerArg` | [...EventArgsArray, [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<`EventArgsArray` & `EventArgsObject`\>] |

##### Returns

`void`
