# Class: ClaimIssuanceService

[modules/claim/services/claim-issuance.service](../modules/modules_claim_services_claim_issuance_service.md).ClaimIssuanceService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_issuance_service.ClaimIssuanceService.md#constructor)

### Methods

- [handleClaimIssuanceRequest](modules_claim_services_claim_issuance_service.ClaimIssuanceService.md#handleclaimissuancerequest)

## Constructors

### constructor

• **new ClaimIssuanceService**(`roleService`, `logger`, `roleClaimRepository`, `claimVerificationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `roleClaimRepository` | `Repository`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\> |
| `claimVerificationService` | [`ClaimVerificationService`](modules_claim_services_claim_verification_service.ClaimVerificationService.md) |

## Methods

### handleClaimIssuanceRequest

▸ **handleClaimIssuanceRequest**(`rq`, `previouslyRequestedClaim`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>

Handles claim issuance request saving and updates.
Two scenarios are handled - issue requested claim and issue not-requested claim

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimIssuance`](../interfaces/modules_claim_claim_types.IClaimIssuance.md) | IClaimIssuance request |
| `previouslyRequestedClaim` | [`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md) | - |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>
