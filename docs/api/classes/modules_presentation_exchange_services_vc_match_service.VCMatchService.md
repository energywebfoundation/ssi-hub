# Class: VCMatchService

[modules/presentation-exchange/services/vc-match.service](../modules/modules_presentation_exchange_services_vc_match_service.md).VCMatchService

## Table of contents

### Constructors

- [constructor](modules_presentation_exchange_services_vc_match_service.VCMatchService.md#constructor)

### Methods

- [matchCredentials](modules_presentation_exchange_services_vc_match_service.VCMatchService.md#matchcredentials)

## Constructors

### constructor

• **new VCMatchService**(`logger`, `handlerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `handlerService` | [`HandlerService`](modules_decentralized_web_node_services_handler_service.HandlerService.md) |

## Methods

### matchCredentials

▸ **matchCredentials**(`presentationDefinition`, `holder`): `Promise`<[`MatchResultsDto`](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `presentationDefinition` | [`PresentationDefinitionDto`](modules_presentation_exchange_dtos_presentation_definition_dto.PresentationDefinitionDto.md) |
| `holder` | `string` |

#### Returns

`Promise`<[`MatchResultsDto`](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md)\>
