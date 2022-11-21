# Class: SearchService

[modules/search/search.service](../modules/modules_search_search_service.md).SearchService

## Table of contents

### Constructors

- [constructor](modules_search_search_service.SearchService.md#constructor)

### Methods

- [searchByText](modules_search_search_service.SearchService.md#searchbytext)

## Constructors

### constructor

• **new SearchService**(`orgRepository`, `roleRepository`, `appRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orgRepository` | `Repository`<[`Organization`](modules_organization_organization_entity.Organization.md)\> |
| `roleRepository` | `Repository`<[`Role`](modules_role_role_entity.Role.md)\> |
| `appRepository` | `Repository`<[`Application`](modules_application_application_entity.Application.md)\> |

## Methods

### searchByText

▸ **searchByText**(`text`, `types?`): `Promise`<([`Organization`](modules_organization_organization_entity.Organization.md) \| [`Application`](modules_application_application_entity.Application.md) \| [`Role`](modules_role_role_entity.Role.md))[]\>

returns App/Org/Role with namespace matching or similar to provided text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | fragment of namespace string |
| `types?` | [`NamespaceEntities`](../enums/modules_search_search_types.NamespaceEntities.md)[] | - |

#### Returns

`Promise`<([`Organization`](modules_organization_organization_entity.Organization.md) \| [`Application`](modules_application_application_entity.Application.md) \| [`Role`](modules_role_role_entity.Role.md))[]\>

Array of Apps, Orgs and Roles
