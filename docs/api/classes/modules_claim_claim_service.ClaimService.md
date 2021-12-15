# Class: ClaimService

[modules/claim/claim.service](../modules/modules_claim_claim_service.md).ClaimService

## Table of contents

### Constructors

- [constructor](modules_claim_claim_service.ClaimService.md#constructor)

### Methods

- [create](modules_claim_claim_service.ClaimService.md#create)
- [createAndIssue](modules_claim_claim_service.ClaimService.md#createandissue)
- [getById](modules_claim_claim_service.ClaimService.md#getbyid)
- [getByIssuer](modules_claim_claim_service.ClaimService.md#getbyissuer)
- [getByParentNamespace](modules_claim_claim_service.ClaimService.md#getbyparentnamespace)
- [getByRequester](modules_claim_claim_service.ClaimService.md#getbyrequester)
- [getBySubject](modules_claim_claim_service.ClaimService.md#getbysubject)
- [getBySubjects](modules_claim_claim_service.ClaimService.md#getbysubjects)
- [getByUserDid](modules_claim_claim_service.ClaimService.md#getbyuserdid)
- [getDidOfClaimsOfNamespace](modules_claim_claim_service.ClaimService.md#getdidofclaimsofnamespace)
- [getIssuedClaimsBySubjects](modules_claim_claim_service.ClaimService.md#getissuedclaimsbysubjects)
- [handleClaimEnrolmentRequest](modules_claim_claim_service.ClaimService.md#handleclaimenrolmentrequest)
- [handleClaimIssuanceRequest](modules_claim_claim_service.ClaimService.md#handleclaimissuancerequest)
- [handleClaimRejectionRequest](modules_claim_claim_service.ClaimService.md#handleclaimrejectionrequest)
- [issue](modules_claim_claim_service.ClaimService.md#issue)
- [reject](modules_claim_claim_service.ClaimService.md#reject)
- [removeById](modules_claim_claim_service.ClaimService.md#removebyid)
- [rolesByIssuer](modules_claim_claim_service.ClaimService.md#rolesbyissuer)
- [saveIssuedClaim](modules_claim_claim_service.ClaimService.md#saveissuedclaim)
- [idOfClaim](modules_claim_claim_service.ClaimService.md#idofclaim)

## Constructors

### constructor

• **new ClaimService**(`roleService`, `logger`, `roleClaimRepository`, `claimRepository`, `assetService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `roleClaimRepository` | `Repository`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\> |
| `claimRepository` | `Repository`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)\> |
| `assetService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |

## Methods

### create

▸ **create**(`data`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

Saves claim to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md) | Raw claim data |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### createAndIssue

▸ **createAndIssue**(`data`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

Saves and issue claim to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`NewClaimIssueDTO`](modules_claim_claim_dto.NewClaimIssueDTO.md) | Raw claim data |

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

▸ **getByIssuer**(`__namedParameters`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims issued by user with matching DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.currentUser?` | `string` |
| `__namedParameters.filters?` | `QueryFilters` |
| `__namedParameters.issuer` | `string` |

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

▸ **getByRequester**(`__namedParameters`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims requested by user with matching DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.currentUser?` | `string` |
| `__namedParameters.filters?` | `QueryFilters` |
| `__namedParameters.requester` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getBySubject

▸ **getBySubject**(`__namedParameters`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

Get claims issued for given subject

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.currentUser?` | `string` |
| `__namedParameters.filters?` | `QueryFilters` |
| `__namedParameters.subject` | `string` |

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

### getDidOfClaimsOfNamespace

▸ **getDidOfClaimsOfNamespace**(`namespace`, `isAccepted?`): `Promise`<`string`[]\>

get all DID of requesters of given namespace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | target claim namespace |
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

▸ **handleClaimEnrolmentRequest**(`rq`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

Handles claim enrolment request saving and updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md) | IClaimRequest request |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

___

### handleClaimIssuanceRequest

▸ **handleClaimIssuanceRequest**(`rq`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

Handles claim issuance request saving and updates.
Two scenarios are handled - issue requested claim and issue not-requested claim

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimIssuance`](../interfaces/modules_claim_claim_types.IClaimIssuance.md) | IClaimIssuance request |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

___

### handleClaimRejectionRequest

▸ **handleClaimRejectionRequest**(`rq`): `Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

Handles claim rejection request saving and updates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rq` | [`IClaimRejection`](../interfaces/modules_claim_claim_types.IClaimRejection.md) | IClaimRejection request |

#### Returns

`Promise`<[`ClaimHandleResult`](modules_claim_claim_service.ClaimHandleResult.md)\>

___

### issue

▸ **issue**(`data`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md) |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### reject

▸ **reject**(`id`, `rejectionReason?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `rejectionReason?` | `string` |

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

### saveIssuedClaim

▸ **saveIssuedClaim**(`claim`): `Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>

Save issued claim

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claim` | [`IssuedClaimDTO`](modules_claim_claim_dto.IssuedClaimDTO.md) | Issued claim that we want to save |

#### Returns

`Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>

___

### idOfClaim

▸ `Static` **idOfClaim**(`claimReq`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimReq` | `Object` |
| `claimReq.claimType` | `string` |
| `claimReq.claimTypeVersion` | `string` |
| `claimReq.token` | `string` |

#### Returns

`string`
