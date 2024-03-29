# Module: modules/auth/auth.decorator

## Table of contents

### Functions

- [Auth](modules_auth_auth_decorator.md#auth)
- [AuthGQL](modules_auth_auth_decorator.md#authgql)

## Functions

### Auth

▸ **Auth**(`«destructured»?`): <TFunction, Y\>(`target`: `object` \| `TFunction`, `propertyKey?`: `string` \| `symbol`, `descriptor?`: `TypedPropertyDescriptor`<`Y`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `useAuth?` | `boolean` |

#### Returns

`fn`

▸ <`TFunction`, `Y`\>(`target`, `propertyKey?`, `descriptor?`): `void`

Function that returns a new decorator that applies all decorators provided by param

Useful to build new decorators (or a decorator factory) encapsulating multiple decorators related with the same feature

**`Public Api`**

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunction` | extends `Function` |
| `Y` | `Y` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` \| `TFunction` |
| `propertyKey?` | `string` \| `symbol` |
| `descriptor?` | `TypedPropertyDescriptor`<`Y`\> |

##### Returns

`void`

___

### AuthGQL

▸ **AuthGQL**(`«destructured»?`): <TFunction, Y\>(`target`: `object` \| `TFunction`, `propertyKey?`: `string` \| `symbol`, `descriptor?`: `TypedPropertyDescriptor`<`Y`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `useAuth?` | `boolean` |

#### Returns

`fn`

▸ <`TFunction`, `Y`\>(`target`, `propertyKey?`, `descriptor?`): `void`

Function that returns a new decorator that applies all decorators provided by param

Useful to build new decorators (or a decorator factory) encapsulating multiple decorators related with the same feature

**`Public Api`**

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunction` | extends `Function` |
| `Y` | `Y` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` \| `TFunction` |
| `propertyKey?` | `string` \| `symbol` |
| `descriptor?` | `TypedPropertyDescriptor`<`Y`\> |

##### Returns

`void`
