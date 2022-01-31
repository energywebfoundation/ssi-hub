# Class: ClaimResolver

[modules/claim/claim.resolver](../modules/modules_claim_claim_resolver.md).ClaimResolver

## Table of contents

### Constructors

- [constructor](modules_claim_claim_resolver.ClaimResolver.md#constructor)

### Methods

- [claim](modules_claim_claim_resolver.ClaimResolver.md#claim)
- [claimsByIssuer](modules_claim_claim_resolver.ClaimResolver.md#claimsbyissuer)
- [claimsByParentNamespace](modules_claim_claim_resolver.ClaimResolver.md#claimsbyparentnamespace)
- [claimsByRequester](modules_claim_claim_resolver.ClaimResolver.md#claimsbyrequester)
- [claimsByUser](modules_claim_claim_resolver.ClaimResolver.md#claimsbyuser)
- [deleteClaim](modules_claim_claim_resolver.ClaimResolver.md#deleteclaim)

## Constructors

### constructor

• **new ClaimResolver**(`claimService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimService` | [`ClaimService`](modules_claim_services_claim_service.ClaimService.md) |

## Methods

### claim

▸ **claim**(`id`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)\>

___

### claimsByIssuer

▸ **claimsByIssuer**(`issuer?`, `accepted?`, `parentNamespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer?` | `string` |
| `accepted?` | `boolean` |
| `parentNamespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### claimsByParentNamespace

▸ **claimsByParentNamespace**(`namespace`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### claimsByRequester

▸ **claimsByRequester**(`requester?`, `accepted?`, `parentNamespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester?` | `string` |
| `accepted?` | `boolean` |
| `parentNamespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### claimsByUser

▸ **claimsByUser**(`did?`, `accepted?`, `parentNamespace?`, `user?`): `Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did?` | `string` |
| `accepted?` | `boolean` |
| `parentNamespace?` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<[`RoleClaim`](modules_claim_entities_roleClaim_entity.RoleClaim.md)[]\>

___

### deleteClaim

▸ **deleteClaim**(`id`, `user?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `user?` | `string` |

#### Returns

`Promise`<`boolean`\>
