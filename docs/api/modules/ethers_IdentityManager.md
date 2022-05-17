# Module: ethers/IdentityManager

## Table of contents

### Classes

- [IdentityManager](../classes/ethers_IdentityManager.IdentityManager.md)

### Interfaces

- [IdentityManagerInterface](../interfaces/ethers_IdentityManager.IdentityManagerInterface.md)

### Type aliases

- [AdminChangedEvent](ethers_IdentityManager.md#adminchangedevent)
- [BeaconUpgradedEvent](ethers_IdentityManager.md#beaconupgradedevent)
- [IdentityCreatedEvent](ethers_IdentityManager.md#identitycreatedevent)
- [IdentityOfferCanceledEvent](ethers_IdentityManager.md#identityoffercanceledevent)
- [IdentityOfferRejectedEvent](ethers_IdentityManager.md#identityofferrejectedevent)
- [IdentityOfferedEvent](ethers_IdentityManager.md#identityofferedevent)
- [IdentityTransferredEvent](ethers_IdentityManager.md#identitytransferredevent)
- [OwnershipTransferredEvent](ethers_IdentityManager.md#ownershiptransferredevent)
- [UpgradedEvent](ethers_IdentityManager.md#upgradedevent)

## Type aliases

### AdminChangedEvent

Ƭ **AdminChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `newAdmin`: `string` ; `previousAdmin`: `string`  }\>

___

### BeaconUpgradedEvent

Ƭ **BeaconUpgradedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`] & { `beacon`: `string`  }\>

___

### IdentityCreatedEvent

Ƭ **IdentityCreatedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`] & { `at`: `BigNumber` ; `identity`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferCanceledEvent

Ƭ **IdentityOfferCanceledEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`] & { `at`: `BigNumber` ; `identity`: `string` ; `oferedto`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferRejectedEvent

Ƭ **IdentityOfferRejectedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`] & { `at`: `BigNumber` ; `identity`: `string` ; `offeredTo`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferedEvent

Ƭ **IdentityOfferedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`] & { `at`: `BigNumber` ; `identity`: `string` ; `offeredTo`: `string` ; `owner`: `string`  }\>

___

### IdentityTransferredEvent

Ƭ **IdentityTransferredEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`] & { `at`: `BigNumber` ; `identity`: `string` ; `owner`: `string`  }\>

___

### OwnershipTransferredEvent

Ƭ **OwnershipTransferredEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`] & { `newOwner`: `string` ; `previousOwner`: `string`  }\>

___

### UpgradedEvent

Ƭ **UpgradedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`] & { `implementation`: `string`  }\>
