# Class: ClaimController

[modules/claim/claim.controller](../modules/modules_claim_claim_controller.md).ClaimController

## Table of contents

### Constructors

- [constructor](modules_claim_claim_controller.ClaimController.md#constructor)

### Methods

- [getById](modules_claim_claim_controller.ClaimController.md#getbyid)
- [getByIssuerDid](modules_claim_claim_controller.ClaimController.md#getbyissuerdid)
- [getByParentNamespace](modules_claim_claim_controller.ClaimController.md#getbyparentnamespace)
- [getByRequesterDid](modules_claim_claim_controller.ClaimController.md#getbyrequesterdid)
- [getBySubject](modules_claim_claim_controller.ClaimController.md#getbysubject)
- [getBySubjects](modules_claim_claim_controller.ClaimController.md#getbysubjects)
- [getByUserDid](modules_claim_claim_controller.ClaimController.md#getbyuserdid)
- [getDidsOfNamespace](modules_claim_claim_controller.ClaimController.md#getdidsofnamespace)
- [postClaimRejection](modules_claim_claim_controller.ClaimController.md#postclaimrejection)
- [postIssuerClaim](modules_claim_claim_controller.ClaimController.md#postissuerclaim)
- [postRequesterClaim](modules_claim_claim_controller.ClaimController.md#postrequesterclaim)
- [removeById](modules_claim_claim_controller.ClaimController.md#removebyid)

## Constructors

### constructor

• **new ClaimController**(`claimService`, `nats`, `assetsService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_claim_service.ClaimService.md) |
| `nats` | [`NatsService`](modules_nats_nats_service.NatsService.md) |
| `assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |
| `logger` | [`Logger`](modules_logger_logger_service.Logger.md) |

## Methods

### getById

▸ **getById**(`id`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)\>

___

### getByIssuerDid

▸ **getByIssuerDid**(`issuer`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`id`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByRequesterDid

▸ **getByRequesterDid**(`requester`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getBySubject

▸ **getBySubject**(`subject`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getBySubjects

▸ **getBySubjects**(`__namedParameters`, `isAccepted?`, `namespace?`, `user?`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DIDsQuery`](modules_claim_claim_entity.DIDsQuery.md) |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

___

### getByUserDid

▸ **getByUserDid**(`did`, `user?`): `Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claim_claim_entity.Claim.md)[]\>

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
