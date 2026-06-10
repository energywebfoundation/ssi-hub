# Class: DidStoreService

[modules/did-store/did-store.service](../modules/modules_did_store_did_store_service.md).DidStoreService

## Table of contents

### Constructors

- [constructor](modules_did_store_did_store_service.DidStoreService.md#constructor)

### Methods

- [get](modules_did_store_did_store_service.DidStoreService.md#get)
- [save](modules_did_store_did_store_service.DidStoreService.md#save)

## Constructors

### constructor

• **new DidStoreService**(`logger`, `storeFactory`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `storeFactory` | [`DidStoreGatewayFactory`](modules_did_store_did_store_gateway.DidStoreGatewayFactory.md) |

## Methods

### get

▸ **get**(`type`, `cid`): `Promise`<`string`\>

Get claim from cluster. If claim isn't found tries to get from gateway

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | - |
| `cid` | `string` | Content identifier. |

#### Returns

`Promise`<`string`\>

Stringified credential

___

### save

▸ **save**(`type`, `credential`): `Promise`<`string`\>

Saves credential on cluster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | - |
| `credential` | `string` | Credential being persisted |

#### Returns

`Promise`<`string`\>

CID of the persisted credential
