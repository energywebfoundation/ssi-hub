# Module: ethers/common

## Table of contents

### Interfaces

- [OnEvent](../interfaces/ethers_common.OnEvent.md)
- [TypedEvent](../interfaces/ethers_common.TypedEvent.md)
- [TypedEventFilter](../interfaces/ethers_common.TypedEventFilter.md)
- [TypedListener](../interfaces/ethers_common.TypedListener.md)

### Type aliases

- [GetARGsTypeFromFactory](ethers_common.md#getargstypefromfactory)
- [GetContractTypeFromFactory](ethers_common.md#getcontracttypefromfactory)
- [MinEthersFactory](ethers_common.md#minethersfactory)

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
