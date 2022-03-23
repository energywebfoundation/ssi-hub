# Class: PresentationExchangeController

[modules/presentation-exchange/presentation-exchange.controller](../modules/modules_presentation_exchange_presentation_exchange_controller.md).PresentationExchangeController

## Table of contents

### Constructors

- [constructor](modules_presentation_exchange_presentation_exchange_controller.PresentationExchangeController.md#constructor)

### Methods

- [getMatchedCredentialsForVpDefinition](modules_presentation_exchange_presentation_exchange_controller.PresentationExchangeController.md#getmatchedcredentialsforvpdefinition)

## Constructors

### constructor

• **new PresentationExchangeController**(`logger`, `vcMatchService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `vcMatchService` | [`VCMatchService`](modules_presentation_exchange_services_vc_match_service.VCMatchService.md) |

## Methods

### getMatchedCredentialsForVpDefinition

▸ **getMatchedCredentialsForVpDefinition**(`user`, `presentationDefinition`): `Promise`<[`MatchResultsDto`](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `presentationDefinition` | [`PresentationDefinitionDto`](modules_presentation_exchange_dtos_presentation_definition_dto.PresentationDefinitionDto.md) |

#### Returns

`Promise`<[`MatchResultsDto`](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md)\>
