# Class: StatusListService

[modules/status-list/status-list.service](../modules/modules_status_list_status_list_service.md).StatusListService

## Table of contents

### Constructors

- [constructor](modules_status_list_status_list_service.StatusListService.md#constructor)

### Methods

- [addSignedStatusListCredential](modules_status_list_status_list_service.StatusListService.md#addsignedstatuslistcredential)
- [addStatusListEntry](modules_status_list_status_list_service.StatusListService.md#addstatuslistentry)
- [getCredential](modules_status_list_status_list_service.StatusListService.md#getcredential)
- [getNamespace](modules_status_list_status_list_service.StatusListService.md#getnamespace)
- [getStatusList](modules_status_list_status_list_service.StatusListService.md#getstatuslist)
- [isCredentialRevoked](modules_status_list_status_list_service.StatusListService.md#iscredentialrevoked)
- [markStatusListCredential](modules_status_list_status_list_service.StatusListService.md#markstatuslistcredential)
- [verifyCredential](modules_status_list_status_list_service.StatusListService.md#verifycredential)

## Constructors

### constructor

• **new StatusListService**(`configService`, `credentialWithStatusRepository`, `namespaceRevocationsRepository`, `statusListCredentialRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `credentialWithStatusRepository` | `Repository`<[`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md)\> |
| `namespaceRevocationsRepository` | `Repository`<[`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md)\> |
| `statusListCredentialRepository` | `Repository`<[`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)\> |

## Methods

### addSignedStatusListCredential

▸ **addSignedStatusListCredential**(`vc`): `Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>

Add signed (with proof object) StatusList2021Credential object to a database. Perform a revocation.
https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential

#### Parameters

| Name | Type |
| :------ | :------ |
| `vc` | [`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md) |

#### Returns

`Promise`<[`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md)\>

saved StatusList2021Credential

___

### addStatusListEntry

▸ **addStatusListEntry**(`credential`): `Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

Add StatusList2021Entry as `credentialStatus` parameter to given credential object.
https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021entry

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | [`CredentialDto`](modules_status_list_dtos_credential_dto.CredentialDto.md) |

#### Returns

`Promise`<[`CredentialWithStatusDto`](modules_status_list_dtos_credential_status_dto.CredentialWithStatusDto.md)\>

credential with StatusList2021Entry

___

### getCredential

▸ **getCredential**(`credentialId`): `Promise`<[`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md)\>

Get registered credential with status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credentialId` | `string` | verifiable credential id |

#### Returns

`Promise`<[`CredentialWithStatus`](modules_status_list_entities_credential_with_status_entity.CredentialWithStatus.md)\>

credential

___

### getNamespace

▸ **getNamespace**(`namespace`): `Promise`<[`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md)\>

Get or create and get namespace revocations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | namespace |

#### Returns

`Promise`<[`NamespaceRevocations`](modules_status_list_entities_namespace_revocations_entity.NamespaceRevocations.md)\>

namespace revocations

___

### getStatusList

▸ **getStatusList**(`statusListId`): `Promise`<[`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)\>

Get status list credential.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statusListId` | `string` | status list credential id |

#### Returns

`Promise`<[`StatusListCredential`](modules_status_list_entities_status_list_credential_entity.StatusListCredential.md)\>

status list credential

___

### isCredentialRevoked

▸ **isCredentialRevoked**(`credentialId`): `Promise`<`boolean`\>

Check if credential is revoked. Revoked credential has StatusList2021Credential.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credentialId` | `string` | verifiable credential id |

#### Returns

`Promise`<`boolean`\>

true if credential is revoked

___

### markStatusListCredential

▸ **markStatusListCredential**(`credential`, `currentUser`): `Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

Return a StatusList2021Credential which is updated with the revocation of the provided verifiable credential.
Object is not signed and not saved to database.
https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | [`VerifiableCredentialDto`](modules_status_list_dtos_verifiable_credential_dto.VerifiableCredentialDto.md) |
| `currentUser` | `string` |

#### Returns

`Promise`<[`StatusListCredentialDto`](modules_status_list_dtos_status_list_credential_dto.StatusListCredentialDto.md)\>

StatusList2021Credential without proof

___

### verifyCredential

▸ **verifyCredential**(`credential`): `Promise`<`void`\>

Verify verifiable credential proof. Throw error if proof is not valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | [`VerifiableCredentialDto`](modules_status_list_dtos_verifiable_credential_dto.VerifiableCredentialDto.md) \| [`StatusListVerifiableCredentialDto`](modules_status_list_dtos_status_list_verifiable_credential_dto.StatusListVerifiableCredentialDto.md) | verifiable credential |

#### Returns

`Promise`<`void`\>