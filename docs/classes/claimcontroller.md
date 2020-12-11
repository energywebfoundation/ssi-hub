**[nest-backend](../README.md)**

# Class: ClaimController

## Hierarchy

* **ClaimController**

## Index

### Constructors

* [constructor](claimcontroller.md#constructor)

### Methods

* [getById](claimcontroller.md#getbyid)
* [getByIssuerDid](claimcontroller.md#getbyissuerdid)
* [getByParentNamespace](claimcontroller.md#getbyparentnamespace)
* [getByRequesterDid](claimcontroller.md#getbyrequesterdid)
* [getByUserDid](claimcontroller.md#getbyuserdid)
* [getDidsOfNamespace](claimcontroller.md#getdidsofnamespace)
* [postIssuerClaim](claimcontroller.md#postissuerclaim)
* [postRequesterClaim](claimcontroller.md#postrequesterclaim)
* [removeById](claimcontroller.md#removebyid)

## Constructors

### constructor

\+ **new ClaimController**(`claimService`: [ClaimService](claimservice.md), `nats`: [NatsService](natsservice.md), `claimQueue`: Queue<string\>): [ClaimController](claimcontroller.md)

#### Parameters:

Name | Type |
------ | ------ |
`claimService` | [ClaimService](claimservice.md) |
`nats` | [NatsService](natsservice.md) |
`claimQueue` | Queue<string\> |

**Returns:** [ClaimController](claimcontroller.md)

## Methods

### getById

▸ **getById**(`id`: string): Promise<[Claim](../interfaces/claim.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise<[Claim](../interfaces/claim.md)\>

___

### getByIssuerDid

▸ **getByIssuerDid**(`did`: string, `accepted`: boolean, `namespace`: string): Promise<any\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |
`accepted` | boolean |
`namespace` | string |

**Returns:** Promise<any\>

___

### getByParentNamespace

▸ **getByParentNamespace**(`id`: string): Promise<any\>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise<any\>

___

### getByRequesterDid

▸ **getByRequesterDid**(`did`: string, `accepted`: boolean, `namespace`: string): Promise<any\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |
`accepted` | boolean |
`namespace` | string |

**Returns:** Promise<any\>

___

### getByUserDid

▸ **getByUserDid**(`did`: string): Promise<any\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |

**Returns:** Promise<any\>

___

### getDidsOfNamespace

▸ **getDidsOfNamespace**(`namespace`: string, `accepted`: boolean): Promise<string[]\>

#### Parameters:

Name | Type |
------ | ------ |
`namespace` | string |
`accepted` | boolean |

**Returns:** Promise<string[]\>

___

### postIssuerClaim

▸ **postIssuerClaim**(`did`: string, `data`: [ClaimDataMessage](../interfaces/claimdatamessage.md)): Promise<ValidationError[]\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |
`data` | [ClaimDataMessage](../interfaces/claimdatamessage.md) |

**Returns:** Promise<ValidationError[]\>

___

### postRequesterClaim

▸ **postRequesterClaim**(`did`: string, `data`: [ClaimDataMessage](../interfaces/claimdatamessage.md)): Promise<any\>

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |
`data` | [ClaimDataMessage](../interfaces/claimdatamessage.md) |

**Returns:** Promise<any\>

___

### removeById

▸ **removeById**(`id`: string): Promise<boolean\>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise<boolean\>
