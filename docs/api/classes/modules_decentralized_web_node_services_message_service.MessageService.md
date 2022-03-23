# Class: MessageService

[modules/decentralized-web-node/services/message.service](../modules/modules_decentralized_web_node_services_message_service.md).MessageService

## Table of contents

### Constructors

- [constructor](modules_decentralized_web_node_services_message_service.MessageService.md#constructor)

### Methods

- [find](modules_decentralized_web_node_services_message_service.MessageService.md#find)
- [save](modules_decentralized_web_node_services_message_service.MessageService.md#save)

## Constructors

### constructor

• **new MessageService**(`logger`, `messageRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `messageRepository` | `Repository`<[`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md)\> |

## Methods

### find

▸ **find**(`user`, `options`): `Promise`<[`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `options` | `Object` |
| `options.dataFormat?` | `string` |
| `options.dateSort?` | [`DataSort`](../modules/modules_decentralized_web_node_dtos_collections_query_descriptor_dto.md#datasort) |
| `options.objectId?` | `string` |
| `options.schema?` | `string` |

#### Returns

`Promise`<[`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md)[]\>

___

### save

▸ **save**(`message`, `user`): `Promise`<[`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md) |
| `user` | `string` |

#### Returns

`Promise`<[`CollectionsWriteMessage`](modules_decentralized_web_node_entities_collections_write_message_entity.CollectionsWriteMessage.md)\>
