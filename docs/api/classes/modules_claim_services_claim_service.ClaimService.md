# Class: ClaimService

[modules/claim/services/claim.service](../modules/modules_claim_services_claim_service.md).ClaimService

## Table of contents

### Constructors

- [constructor](modules_claim_services_claim_service.ClaimService.md#constructor)

### Methods

- [create](modules_claim_services_claim_service.ClaimService.md#create)
- [getByClaimType](modules_claim_services_claim_service.ClaimService.md#getbyclaimtype)
- [getById](modules_claim_services_claim_service.ClaimService.md#getbyid)
- [getByIssuer](modules_claim_services_claim_service.ClaimService.md#getbyissuer)
- [getByParentNamespace](modules_claim_services_claim_service.ClaimService.md#getbyparentnamespace)
- [getByRequester](modules_claim_services_claim_service.ClaimService.md#getbyrequester)
- [getByRevoker](modules_claim_services_claim_service.ClaimService.md#getbyrevoker)
- [getBySubject](modules_claim_services_claim_service.ClaimService.md#getbysubject)
- [getBySubjects](modules_claim_services_claim_service.ClaimService.md#getbysubjects)
- [getByUserDid](modules_claim_services_claim_service.ClaimService.md#getbyuserdid)
- [getClaims](modules_claim_services_claim_service.ClaimService.md#getclaims)
- [getDidOfClaimsOfNamespace](modules_claim_services_claim_service.ClaimService.md#getdidofclaimsofnamespace)
- [getIssuedClaimsBySubjects](modules_claim_services_claim_service.ClaimService.md#getissuedclaimsbysubjects)
- [handleClaimEnrolmentRequest](modules_claim_services_claim_service.ClaimService.md#handleclaimenrolmentrequest)
- [handleClaimRejectionRequest](modules_claim_services_claim_service.ClaimService.md#handleclaimrejectionrequest)
- [issuersOfRole](modules_claim_services_claim_service.ClaimService.md#issuersofrole)
- [reject](modules_claim_services_claim_service.ClaimService.md#reject)
- [removeById](modules_claim_services_claim_service.ClaimService.md#removebyid)
- [rolesByIssuer](modules_claim_services_claim_service.ClaimService.md#rolesbyissuer)
- [rolesByRevoker](modules_claim_services_claim_service.ClaimService.md#rolesbyrevoker)
- [saveIssuedClaim](modules_claim_services_claim_service.ClaimService.md#saveissuedclaim)

## Constructors

### constructor

• **new ClaimService**(`roleService`, `logger`, `roleClaimRepository`, `claimRepository`, `assetService`, `claimVerificationService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `roleClaimRepository` | `Repository`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\> |
| `claimRepository` | `Repository`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)\> |
| `assetService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |
| `claimVerificationService` | [`ClaimVerificationService`](modules_claim_services_claim_verification_service.ClaimVerificationService.md) |

## Methods

### create

▸ **create**(`data`, `subject`, `redirectUri`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

Saves claim to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md) | Raw claim data |
| `subject` | `string` | - |
| `redirectUri` | `string` | - |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### getByClaimType

▸ **getByClaimType**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

Get approved claim for given did and claim type

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `claimType` | `string` |
| › `subject` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### getById

▸ **getById**(`id`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

returns claim with matching ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | claim ID |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### getByIssuer

▸ **getByIssuer**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims issued by user with matching DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentUser?` | `string` |
| › `filters?` | `QueryFilters` |
| › `issuer` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`namespace`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

returns claims with matching parent namespace
eg: passing "A.app" will return all roles in this namespace like "admin.roles.A.app", "user.roles.A.app"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | target parent namespace |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByRequester

▸ **getByRequester**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims requested by user with matching DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentUser?` | `string` |
| › `filters?` | `QueryFilters` |
| › `requester` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByRevoker

▸ **getByRevoker**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims able to be revoked by user with matching DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentUser?` | `string` |
| › `filters?` | `QueryFilters` |
| › `revoker` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

allowed claims to revoke

___

### getBySubject

▸ **getBySubject**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims issued for given subject

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentUser?` | `string` |
| › `filters?` | `QueryFilters` |
| › `subject` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getBySubjects

▸ **getBySubjects**(`subjects`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

returns claims requested for given DIDs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjects` | `Object` | claim subjects DIDs |
| `subjects.currentUser?` | `string` | - |
| `subjects.filters?` | `QueryFilters` | - |
| `subjects.subjects` | `string`[] | - |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByUserDid

▸ **getByUserDid**(`did`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims requested or issued by user with matching DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `Object` | user DID |
| `did.currentUser?` | `string` | - |
| `did.did` | `string` | - |
| `did.filters?` | `QueryFilters` | - |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getClaims

▸ **getClaims**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Returns claims for given role

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `isAccepted?` | `boolean` |
| › `roleName` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getDidOfClaimsOfNamespace

▸ **getDidOfClaimsOfNamespace**(`roleName`, `isAccepted?`): `Promise`<`string`[]\>

get all DID of requesters of given namespace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleName` | `string` | target claim namespace |
| `isAccepted?` | `boolean` | flag for filtering only accepted claims |

#### Returns

`Promise`<`string`[]\>

___

### getIssuedClaimsBySubjects

▸ **getIssuedClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)[]\>

Save issued claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)[]\>

___

### handleClaimEnrolmentRequest

▸ **handleClaimEnrolmentRequest**(`rq`, `redirectUri`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>

Handles claim enrolment request saving and updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md) | IClaimRequest request |
| `redirectUri` | `string` | redirect URI |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>

___

### handleClaimRejectionRequest

▸ **handleClaimRejectionRequest**(`rq`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>

Handles claim rejection request saving and updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimRejection`](../interfaces/modules_claim_claim_types.IClaimRejection.md) | IClaimRejection request |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_handle_result_dto.ClaimHandleResult.md)\>

___

### issuersOfRole

▸ **issuersOfRole**(`roleName`): `Promise`<`string`[]\>

Finds DID's specified as issuers of `roleName`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleName` | `string` | role name |

#### Returns

`Promise`<`string`[]\>

___

### reject

▸ **reject**(`«destructured»`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ClaimRejectionDTO`](modules_claim_claim_dto.ClaimRejectionDTO.md) |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### removeById

▸ **removeById**(`id`, `currentUser?`): `Promise`<`void`\>

delete claim with matching ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | claim ID |
| `currentUser?` | `string` | - |

#### Returns

`Promise`<`void`\>

___

### rolesByIssuer

▸ **rolesByIssuer**(`issuer`, `namespace?`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `namespace?` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### rolesByRevoker

▸ **rolesByRevoker**(`revokerDid`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

Get allowed roles to revoke by given DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `revokerDid` | `string` | revoker DID |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

allowed roles to revoke

___

### saveIssuedClaim

▸ **saveIssuedClaim**(`claim`): `Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>

Save issued claim

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claim` | [`IssuedClaimDTO`](modules_claim_claim_dto.IssuedClaimDTO.md) | Issued claim that we want to save |

#### Returns

`Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>
