**[nest-backend](../README.md)**

# Class: OrganizationController

## Hierarchy

* **OrganizationController**

## Index

### Constructors

* [constructor](organizationcontroller.md#constructor)

### Methods

* [exists](organizationcontroller.md#exists)
* [getAll](organizationcontroller.md#getall)
* [getAppsByOrgId](organizationcontroller.md#getappsbyorgid)
* [getById](organizationcontroller.md#getbyid)
* [getRolesByOrgId](organizationcontroller.md#getrolesbyorgid)

## Constructors

### constructor

\+ **new OrganizationController**(`organizationService`: [OrganizationService](organizationservice.md)): [OrganizationController](organizationcontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`organizationService` | [OrganizationService](organizationservice.md) |

**Returns:** [OrganizationController](organizationcontroller.md)

## Methods

### exists

▸ **exists**(`namespace`: string): Promise<boolean\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<boolean\>

___

### getAll

▸ **getAll**(): Promise<any\>

**Returns:** Promise<any\>

___

### getAppsByOrgId

▸ **getAppsByOrgId**(`namespace`: string): Promise<{ Data: any = org.apps }\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<{ Data: any = org.apps }\>

___

### getById

▸ **getById**(`namespace`: string): Promise<[OrganizationDTO](organizationdto.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<[OrganizationDTO](organizationdto.md)\>

___

### getRolesByOrgId

▸ **getRolesByOrgId**(`namespace`: string): Promise<{ Data: any = org.roles }\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** Promise<{ Data: any = org.roles }\>
