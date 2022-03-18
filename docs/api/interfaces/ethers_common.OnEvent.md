# Interface: OnEvent<TRes\>

[ethers/common](../modules/ethers_common.md).OnEvent

## Type parameters

| Name |
| :------ |
| `TRes` |

## Callable

### OnEvent

▸ **OnEvent**<`TEvent`\>(`eventFilter`, `listener`): `TRes`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |
| `listener` | [`TypedListener`](ethers_common.TypedListener.md)<`TEvent`\> |

#### Returns

`TRes`

### OnEvent

▸ **OnEvent**(`eventName`, `listener`): `TRes`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Listener` |

#### Returns

`TRes`
