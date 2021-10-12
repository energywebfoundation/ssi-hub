# Class: ClaimService

[modules/claim/claim.service](../modules/modules_claim_claim_service.md).ClaimService

## Table of contents

### Constructors

- [constructor](modules_claim_claim_service.ClaimService.md#constructor)

### Methods

- [create](modules_claim_claim_service.ClaimService.md#create)
- [getById](modules_claim_claim_service.ClaimService.md#getbyid)
- [getByIssuer](modules_claim_claim_service.ClaimService.md#getbyissuer)
- [getByParentNamespace](modules_claim_claim_service.ClaimService.md#getbyparentnamespace)
- [getByRequester](modules_claim_claim_service.ClaimService.md#getbyrequester)
- [getBySubject](modules_claim_claim_service.ClaimService.md#getbysubject)
- [getBySubjects](modules_claim_claim_service.ClaimService.md#getbysubjects)
- [getByUserDid](modules_claim_claim_service.ClaimService.md#getbyuserdid)
- [getDidOfClaimsOfNamespace](modules_claim_claim_service.ClaimService.md#getdidofclaimsofnamespace)
- [handleExchangeMessage](modules_claim_claim_service.ClaimService.md#handleexchangemessage)
- [issue](modules_claim_claim_service.ClaimService.md#issue)
- [reject](modules_claim_claim_service.ClaimService.md#reject)
- [removeById](modules_claim_claim_service.ClaimService.md#removebyid)
- [idOfClaim](modules_claim_claim_service.ClaimService.md#idofclaim)

## Constructors

### constructor

• **new ClaimService**(`roleService`, `logger`, `claimRepository`, `assetService`, `claimQueue`, `nats`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleService` | [`RoleService`](modules_role_role_service.RoleService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `claimRepository` | `Repository`<[`Claim`](modules_claim_claim_entity.Claim.md)\> |
| `assetService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |
| `claimQueue` | `Queue`<`string`\> |
| `nats` | [`NatsService`](modules_nats_nats_service.NatsService.md) |

## Methods

### create

▸ **create**(`data`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

Saves claim to database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ClaimRequestDTO`](modules_claim_claim_dto.ClaimRequestDTO.md) | Raw claim data |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

___

### getById

▸ **getById**(`id`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

returns claim with matching ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | claim ID |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

___

### getByIssuer

▸ **getByIssuer**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

Get claims issued by user with matching DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.currentUser?` | `string` | - |
| `__namedParameters.filters?` | `QueryFilters` | additional filters |
| `__namedParameters.issuer` | `string` | - |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`namespace`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

returns claims with matching parent namespace
eg: passing "A.app" will return all roles in this namespace like "admin.roles.A.app", "user.roles.A.app"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | target parent namespace |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByRequester

▸ **getByRequester**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

Get claims requested by user with matching DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.currentUser?` | `string` | - |
| `__namedParameters.filters?` | `QueryFilters` | additional filters |
| `__namedParameters.requester` | `string` | - |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getBySubject

▸ **getBySubject**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

Get claims issued for given subject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.currentUser?` | `string` | - |
| `__namedParameters.filters?` | `QueryFilters` | additional filters |
| `__namedParameters.subject` | `string` | - |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getBySubjects

▸ **getBySubjects**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

returns claims requested for given DIDs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.currentUser?` | `string` | - |
| `__namedParameters.filters?` | `QueryFilters` | - |
| `__namedParameters.subjects` | `string`[] | claim subjects DIDs |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByUserDid

▸ **getByUserDid**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

Get claims requested or issued by user with matching DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.currentUser?` | `string` | - |
| `__namedParameters.did` | `string` | user DID |
| `__namedParameters.filters?` | `QueryFilters` | - |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

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

### handleExchangeMessage

▸ **handleExchangeMessage**(`data`): `Promise`<`string`\>

Handles claims saving and updates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IClaimIssuance`](../interfaces/modules_claim_claim_types.IClaimIssuance.md) \| [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md) \| [`IClaimRejection`](../interfaces/modules_claim_claim_types.IClaimRejection.md) | Raw claim data |

#### Returns

`Promise`<`string`\>

___

### issue

▸ **issue**(`data`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ClaimIssueDTO`](modules_claim_claim_dto.ClaimIssueDTO.md) |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

___

### reject

▸ **reject**(`id`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

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

### idOfClaim

▸ `Static` **idOfClaim**(`claimReq`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimReq` | [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md) |

#### Returns

`string`
