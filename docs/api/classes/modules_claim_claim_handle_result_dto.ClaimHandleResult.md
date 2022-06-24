# Class: ClaimHandleResult

[modules/claim/claim-handle-result.dto](../modules/modules_claim_claim_handle_result_dto.md).ClaimHandleResult

## Table of contents

### Constructors

- [constructor](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#constructor)

### Properties

- [claimId](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#claimid)
- [details](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#details)
- [isSuccessful](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#issuccessful)

### Methods

- [Failure](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#failure)
- [Success](modules_claim_claim_handle_result_dto.ClaimHandleResult.md#success)

## Constructors

### constructor

• **new ClaimHandleResult**()

## Properties

### claimId

• `Optional` **claimId**: `string`

___

### details

• `Optional` **details**: `string`

___

### isSuccessful

• **isSuccessful**: `boolean`

## Methods

### Failure

▸ `Static` **Failure**(`details`): [`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `details` | `string` |

#### Returns

[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)

___

### Success

▸ `Static` **Success**(`claimId`): [`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)
