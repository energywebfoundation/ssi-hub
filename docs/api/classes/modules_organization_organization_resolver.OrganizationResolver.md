# Class: OrganizationResolver

[modules/organization/organization.resolver](../modules/modules_organization_organization_resolver.md).OrganizationResolver

## Table of contents

### Constructors

- [constructor](modules_organization_organization_resolver.OrganizationResolver.md#constructor)

### Methods

- [apps](modules_organization_organization_resolver.OrganizationResolver.md#apps)
- [organization](modules_organization_organization_resolver.OrganizationResolver.md#organization)
- [organizations](modules_organization_organization_resolver.OrganizationResolver.md#organizations)
- [roles](modules_organization_organization_resolver.OrganizationResolver.md#roles)
- [subOrgs](modules_organization_organization_resolver.OrganizationResolver.md#suborgs)

## Constructors

### constructor

• **new OrganizationResolver**(`orgService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orgService` | [`OrganizationService`](modules_organization_organization_service.OrganizationService.md) |

## Methods

### apps

▸ **apps**(`«destructured»`): `Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Organization`](modules_organization_organization_entity.Organization.md) |

#### Returns

`Promise`<[`Application`](modules_application_application_entity.Application.md)[]\>

___

### organization

▸ **organization**(`namespace`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)\>

___

### organizations

▸ **organizations**(`owner`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

___

### roles

▸ **roles**(`«destructured»`): `Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Organization`](modules_organization_organization_entity.Organization.md) |

#### Returns

`Promise`<[`Role`](modules_role_role_entity.Role.md)[]\>

___

### subOrgs

▸ **subOrgs**(`«destructured»`): `Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Organization`](modules_organization_organization_entity.Organization.md) |

#### Returns

`Promise`<[`Organization`](modules_organization_organization_entity.Organization.md)[]\>
