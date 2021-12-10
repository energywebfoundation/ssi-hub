# Class: SearchController

[modules/search/search.controller](../modules/modules_search_search_controller.md).SearchController

## Table of contents

### Constructors

- [constructor](modules_search_search_controller.SearchController.md#constructor)

### Methods

- [search](modules_search_search_controller.SearchController.md#search)

## Constructors

### constructor

• **new SearchController**(`searchService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchService` | [`SearchService`](modules_search_search_service.SearchService.md) |

## Methods

### search

▸ **search**(`search`, `types?`): `Promise`<`ValidationError`[] \| ([`Application`](modules_application_application_entity.Application.md) \| [`Role`](modules_role_role_entity.Role.md) \| [`Organization`](modules_organization_organization_entity.Organization.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `types?` | [`NamespaceEntities`](../enums/modules_search_search_types.NamespaceEntities.md)[] |

#### Returns

`Promise`<`ValidationError`[] \| ([`Application`](modules_application_application_entity.Application.md) \| [`Role`](modules_role_role_entity.Role.md) \| [`Organization`](modules_organization_organization_entity.Organization.md))[]\>
