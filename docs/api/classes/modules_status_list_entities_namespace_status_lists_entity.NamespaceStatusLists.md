# Class: NamespaceStatusLists

[modules/status-list/entities/namespace-status-lists.entity](../modules/modules_status_list_entities_namespace_status_lists_entity.md).NamespaceStatusLists

## Table of contents

### Constructors

- [constructor](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#constructor)

### Properties

- [id](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#id)
- [lists](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#lists)
- [namespace](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#namespace)

### Methods

- [createEntry](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#createentry)
- [hasList](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#haslist)
- [create](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md#create)

## Constructors

### constructor

• **new NamespaceStatusLists**()

## Properties

### id

• **id**: `string`

___

### lists

• **lists**: [`NamespaceStatusList`](modules_status_list_entities_namespace_status_list_entity.NamespaceStatusList.md)[]

___

### namespace

• **namespace**: `string`

## Methods

### createEntry

▸ **createEntry**(`statusListDomain`, `credentialId`): [`StatusList2021EntryDto`](modules_status_list_dtos_credential_status_dto.StatusList2021EntryDto.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusListDomain` | `string` |
| `credentialId` | `string` |

#### Returns

[`StatusList2021EntryDto`](modules_status_list_dtos_credential_status_dto.StatusList2021EntryDto.md)

___

### hasList

▸ **hasList**(`statusListId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusListId` | `string` |

#### Returns

`boolean`

___

### create

▸ `Static` **create**(`data`): [`NamespaceStatusLists`](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Pick`<[`NamespaceStatusLists`](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md), ``"namespace"``\> & { `id?`: `string`  } |

#### Returns

[`NamespaceStatusLists`](modules_status_list_entities_namespace_status_lists_entity.NamespaceStatusLists.md)
