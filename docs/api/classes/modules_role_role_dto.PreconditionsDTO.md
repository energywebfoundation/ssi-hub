# Class: PreconditionsDTO

[modules/role/role.dto](../modules/modules_role_role_dto.md).PreconditionsDTO

## Implements

- [`EnrolmentPrecondition`](../interfaces/modules_role_role_types.EnrolmentPrecondition.md)

## Table of contents

### Constructors

- [constructor](modules_role_role_dto.PreconditionsDTO.md#constructor)

### Properties

- [conditions](modules_role_role_dto.PreconditionsDTO.md#conditions)
- [type](modules_role_role_dto.PreconditionsDTO.md#type)

### Methods

- [create](modules_role_role_dto.PreconditionsDTO.md#create)

## Constructors

### constructor

• **new PreconditionsDTO**()

## Properties

### conditions

• **conditions**: `string`[]

#### Implementation of

[EnrolmentPrecondition](../interfaces/modules_role_role_types.EnrolmentPrecondition.md).[conditions](../interfaces/modules_role_role_types.EnrolmentPrecondition.md#conditions)

___

### type

• **type**: `Role`

#### Implementation of

[EnrolmentPrecondition](../interfaces/modules_role_role_types.EnrolmentPrecondition.md).[type](../interfaces/modules_role_role_types.EnrolmentPrecondition.md#type)

## Methods

### create

▸ `Static` **create**(`data`): `Promise`<[`PreconditionsDTO`](modules_role_role_dto.PreconditionsDTO.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`PreconditionsDTO`](modules_role_role_dto.PreconditionsDTO.md)\> |

#### Returns

`Promise`<[`PreconditionsDTO`](modules_role_role_dto.PreconditionsDTO.md)\>
