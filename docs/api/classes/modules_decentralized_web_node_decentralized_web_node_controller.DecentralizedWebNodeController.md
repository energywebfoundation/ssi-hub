# Class: DecentralizedWebNodeController

[modules/decentralized-web-node/decentralized-web-node.controller](../modules/modules_decentralized_web_node_decentralized_web_node_controller.md).DecentralizedWebNodeController

## Table of contents

### Constructors

- [constructor](modules_decentralized_web_node_decentralized_web_node_controller.DecentralizedWebNodeController.md#constructor)

### Methods

- [requestHandler](modules_decentralized_web_node_decentralized_web_node_controller.DecentralizedWebNodeController.md#requesthandler)

## Constructors

### constructor

• **new DecentralizedWebNodeController**(`logger`, `collectionHandlerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `collectionHandlerService` | [`HandlerService`](modules_decentralized_web_node_services_handler_service.HandlerService.md) |

## Methods

### requestHandler

▸ **requestHandler**(`requestObject`, `user`): `Promise`<[`ResponseObjectDto`](modules_decentralized_web_node_dtos_response_object_dto.ResponseObjectDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestObject` | [`RequestObjectDto`](modules_decentralized_web_node_dtos_request_object_dto.RequestObjectDto.md) |
| `user` | `string` |

#### Returns

`Promise`<[`ResponseObjectDto`](modules_decentralized_web_node_dtos_response_object_dto.ResponseObjectDto.md)\>
