**[nest-backend](../README.md)**

# Class: ClaimService

## Hierarchy

* **ClaimService**

## Index

### Constructors

* [constructor](claimservice.md#constructor)

### Methods

* [getById](claimservice.md#getbyid)
* [getByIssuer](claimservice.md#getbyissuer)
* [getByParentNamespace](claimservice.md#getbyparentnamespace)
* [getByRequester](claimservice.md#getbyrequester)
* [getByUserDid](claimservice.md#getbyuserdid)
* [getDidOfClaimsOfnamespace](claimservice.md#getdidofclaimsofnamespace)
* [removeById](claimservice.md#removebyid)
* [saveClaim](claimservice.md#saveclaim)
* [saveOrUpdate](claimservice.md#saveorupdate)

## Constructors

### constructor

\+ **new ClaimService**(`dgraph`: [DgraphService](dgraphservice.md)): [ClaimService](claimservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`dgraph` | [DgraphService](dgraphservice.md) |

**Returns:** [ClaimService](claimservice.md)

## Methods

### getById

▸ **getById**(`id`: string): Promise<[Claim](../interfaces/claim.md)\>

returns claim with matching ID

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | claim ID  |

**Returns:** Promise<[Claim](../interfaces/claim.md)\>

___

### getByIssuer

▸ **getByIssuer**(`did`: string, `filters?`: [QueryFilters](../interfaces/queryfilters.md)): Promise<any\>

Get claims issued by user with matching DID

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`did` | string | - | issuer's DID |
`filters` | [QueryFilters](../interfaces/queryfilters.md) | {} | additional filters  |

**Returns:** Promise<any\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`namespace`: string): Promise<any\>

returns claims with matching parent namespace
eg: passing "A.app" will return all roles in this namespace like "admin.roles.A.app", "user.roles.A.app"

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | target parent namespace  |

**Returns:** Promise<any\>

___

### getByRequester

▸ **getByRequester**(`did`: string, `filters?`: [QueryFilters](../interfaces/queryfilters.md)): Promise<any\>

Get claims requested by user with matching DID

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`did` | string | - | requester's DID |
`filters` | [QueryFilters](../interfaces/queryfilters.md) | {} | additional filters  |

**Returns:** Promise<any\>

___

### getByUserDid

▸ **getByUserDid**(`did`: string): Promise<any\>

Get claims requested or issued by user with matching DID

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`did` | string | user DID  |

**Returns:** Promise<any\>

___

### getDidOfClaimsOfnamespace

▸ **getDidOfClaimsOfnamespace**(`namespace`: string, `accepted?`: boolean): Promise<string[]\>

get all DID of requesters of given namespace

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | target claim namespace |
`accepted?` | boolean | flag for filtering only accepted claims  |

**Returns:** Promise<string[]\>

___

### removeById

▸ **removeById**(`id`: string): Promise<boolean\>

delete claim with matching ID

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | claim ID  |

**Returns:** Promise<boolean\>

___

### saveClaim

▸ **saveClaim**(`__namedParameters`: { data: data  }): Promise<string\>

Saves claim to database

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: data  } |

**Returns:** Promise<string\>

___

### saveOrUpdate

▸ **saveOrUpdate**(`data`: [ClaimDataMessage](../interfaces/claimdatamessage.md)): Promise<string\>

Handles claims saving and updates

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ClaimDataMessage](../interfaces/claimdatamessage.md) | Raw claim data  |

**Returns:** Promise<string\>
