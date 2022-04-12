# Class: MatchResultsDto

[modules/presentation-exchange/dtos/match-results.dto](../modules/modules_presentation_exchange_dtos_match_results_dto.md).MatchResultsDto

## Implements

- `SelectResults`

## Table of contents

### Constructors

- [constructor](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#constructor)

### Properties

- [areRequiredCredentialsPresent](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#arerequiredcredentialspresent)
- [errors](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#errors)
- [matches](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#matches)
- [vcIndexes](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#vcindexes)
- [verifiableCredential](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#verifiablecredential)
- [warnings](modules_presentation_exchange_dtos_match_results_dto.MatchResultsDto.md#warnings)

## Constructors

### constructor

• **new MatchResultsDto**()

## Properties

### areRequiredCredentialsPresent

• **areRequiredCredentialsPresent**: `Status`

#### Implementation of

SelectResults.areRequiredCredentialsPresent

___

### errors

• `Optional` **errors**: [`CheckedDto`](modules_presentation_exchange_dtos_checked_dto.CheckedDto.md)[]

#### Implementation of

SelectResults.errors

___

### matches

• `Optional` **matches**: [`SubmissionRequirementMatchDto`](modules_presentation_exchange_dtos_submission_requirement_match_dto.SubmissionRequirementMatchDto.md)[]

#### Implementation of

SelectResults.matches

___

### vcIndexes

• `Optional` **vcIndexes**: `number`[]

#### Implementation of

SelectResults.vcIndexes

___

### verifiableCredential

• `Optional` **verifiableCredential**: `IVerifiableCredential`[]

#### Implementation of

SelectResults.verifiableCredential

___

### warnings

• `Optional` **warnings**: [`CheckedDto`](modules_presentation_exchange_dtos_checked_dto.CheckedDto.md)[]

#### Implementation of

SelectResults.warnings
