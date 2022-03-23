# Class: DecentralizedWebNodeInterceptor

[modules/decentralized-web-node/decentralized-web-node-response.interceptor](../modules/modules_decentralized_web_node_decentralized_web_node_response_interceptor.md).DecentralizedWebNodeInterceptor

This is motivated by the example error responses from the DWebNode spec
https://identity.foundation/decentralized-web-node/spec/#request-level-status-coding
For example, the "General request-level processing errors" example is
 {
   "requestId": "c5784162-84af-4aab-aff5-f1f8438dfc3d",
    "status": {
      "code": 500,
      "text": "The request could not be processed correctly"
    }
}

## Implements

- `NestInterceptor`<[`ResponseObjectDto`](modules_decentralized_web_node_dtos_response_object_dto.ResponseObjectDto.md)\>

## Table of contents

### Constructors

- [constructor](modules_decentralized_web_node_decentralized_web_node_response_interceptor.DecentralizedWebNodeInterceptor.md#constructor)

### Methods

- [errorStatusMapping](modules_decentralized_web_node_decentralized_web_node_response_interceptor.DecentralizedWebNodeInterceptor.md#errorstatusmapping)
- [intercept](modules_decentralized_web_node_decentralized_web_node_response_interceptor.DecentralizedWebNodeInterceptor.md#intercept)

## Constructors

### constructor

• **new DecentralizedWebNodeInterceptor**()

## Methods

### errorStatusMapping

▸ **errorStatusMapping**(`status`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `code` | `number` |
| `message` | `string` |

___

### intercept

▸ **intercept**(`context`, `next`): `Observable`<[`ResponseObjectDto`](modules_decentralized_web_node_dtos_response_object_dto.ResponseObjectDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |
| `next` | `CallHandler`<`any`\> |

#### Returns

`Observable`<[`ResponseObjectDto`](modules_decentralized_web_node_dtos_response_object_dto.ResponseObjectDto.md)\>

#### Implementation of

NestInterceptor.intercept
