# Class: ClaimController

[modules/claim/claim.controller](../modules/modules_claim_claim_controller.md).ClaimController

## Table of contents

### Constructors

- [constructor](modules_claim_claim_controller.ClaimController.md#constructor)

### Methods

- [getByAllowedRolesByIssuer](modules_claim_claim_controller.ClaimController.md#getbyallowedrolesbyissuer)
- [getById](modules_claim_claim_controller.ClaimController.md#getbyid)
- [getByIssuerDid](modules_claim_claim_controller.ClaimController.md#getbyissuerdid)
- [getByParentNamespace](modules_claim_claim_controller.ClaimController.md#getbyparentnamespace)
- [getByRequesterDid](modules_claim_claim_controller.ClaimController.md#getbyrequesterdid)
- [getBySubject](modules_claim_claim_controller.ClaimController.md#getbysubject)
- [getBySubjects](modules_claim_claim_controller.ClaimController.md#getbysubjects)
- [getByUserDid](modules_claim_claim_controller.ClaimController.md#getbyuserdid)
- [getDidsOfNamespace](modules_claim_claim_controller.ClaimController.md#getdidsofnamespace)
- [getIssuedClaimsBySubjects](modules_claim_claim_controller.ClaimController.md#getissuedclaimsbysubjects)
- [postClaimRejection](modules_claim_claim_controller.ClaimController.md#postclaimrejection)
- [postIssuerClaim](modules_claim_claim_controller.ClaimController.md#postissuerclaim)
- [postRequesterClaim](modules_claim_claim_controller.ClaimController.md#postrequesterclaim)
- [removeById](modules_claim_claim_controller.ClaimController.md#removebyid)
- [saveIssued](modules_claim_claim_controller.ClaimController.md#saveissued)

## Constructors

### constructor

• **new ClaimController**(`claimService`, `didService`, `assetsService`, `logger`, `nats`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_claim_service.ClaimService.md) |
| `didService` | [`DIDService`](modules_did_did_service.DIDService.md) |
| `assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |
| `nats` | [`NatsService`](modules_nats_nats_service.NatsService.md) |

## Methods

### getByAllowedRolesByIssuer

▸ **getByAllowedRolesByIssuer**(`issuer`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### getById

▸ **getById**(`id`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### getByIssuerDid

▸ **getByIssuerDid**(`issuer`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`id`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByRequesterDid

▸ **getByRequesterDid**(`requester`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getBySubject

▸ **getBySubject**(`subject`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getBySubjects

▸ **getBySubjects**(`__namedParameters`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DIDsQuery`](modules_claim_entities_roleClaim_entity.DIDsQuery.md) |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getByUserDid

▸ **getByUserDid**(`did`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### getDidsOfNamespace

▸ **getDidsOfNamespace**(`namespace`, `accepted?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |
| `accepted?` | `boolean` |

#### Returns

`Promise`<`string`[]\>

___

### getIssuedClaimsBySubjects

▸ **getIssuedClaimsBySubjects**(`__namedParameters`): `Promise`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DIDsQuery`](modules_claim_entities_roleClaim_entity.DIDsQuery.md) |

#### Returns

`Promise`<[`Claim`](modules_claim_entities_claim_entity.Claim.md)[]\>

___

### postClaimRejection

▸ **postClaimRejection**(`did`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `data` | [`IClaimRejection`](../interfaces/modules_claim_claim_types.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

___

### postIssuerClaim

▸ **postIssuerClaim**(`did`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `data` | [`IClaimIssuance`](../interfaces/modules_claim_claim_types.IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

___

### postRequesterClaim

▸ **postRequesterClaim**(`did`, `data`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `data` | [`IClaimRequest`](../interfaces/modules_claim_claim_types.IClaimRequest.md) |

#### Returns

`Promise`<`string`\>

___

### removeById

▸ **removeById**(`id`, `user?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<`void`\>

___

### saveIssued

▸ **saveIssued**(`body`): `Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | [`IssuedClaimDTO`](modules_claim_claim_dto.IssuedClaimDTO.md) |

#### Returns

`Promise`<[`IClaim`](../interfaces/modules_claim_claim_types.IClaim.md) & [`Claim`](modules_claim_entities_claim_entity.Claim.md)\>
