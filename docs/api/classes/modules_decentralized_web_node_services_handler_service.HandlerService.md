# Class: HandlerService

[modules/decentralized-web-node/services/handler.service](../modules/modules_decentralized_web_node_services_handler_service.md).HandlerService

## Table of contents

### Constructors

- [constructor](modules_decentralized_web_node_services_handler_service.HandlerService.md#constructor)

### Methods

- [handleMessage](modules_decentralized_web_node_services_handler_service.HandlerService.md#handlemessage)

## Constructors

### constructor

• **new HandlerService**(`logger`, `messageService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `messageService` | [`MessageService`](modules_decentralized_web_node_services_message_service.MessageService.md) |

## Methods

### handleMessage

▸ **handleMessage**(`message`, `holder`): `Promise`<[`ResponseReplyDto`](modules_decentralized_web_node_dtos_response_reply_dto.ResponseReplyDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`MessageDto`](modules_decentralized_web_node_dtos_message_dto.MessageDto.md) |
| `holder` | `string` |

#### Returns

`Promise`<[`ResponseReplyDto`](modules_decentralized_web_node_dtos_response_reply_dto.ResponseReplyDto.md)\>
