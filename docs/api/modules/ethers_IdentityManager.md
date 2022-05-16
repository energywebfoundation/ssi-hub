# Module: ethers/IdentityManager

## Table of contents

### Interfaces

- [IdentityManager](../interfaces/ethers_IdentityManager.IdentityManager.md)
- [IdentityManagerInterface](../interfaces/ethers_IdentityManager.IdentityManagerInterface.md)

### Type aliases

- [AdminChangedEvent](ethers_IdentityManager.md#adminchangedevent)
- [AdminChangedEventFilter](ethers_IdentityManager.md#adminchangedeventfilter)
- [BeaconUpgradedEvent](ethers_IdentityManager.md#beaconupgradedevent)
- [BeaconUpgradedEventFilter](ethers_IdentityManager.md#beaconupgradedeventfilter)
- [IdentityCreatedEvent](ethers_IdentityManager.md#identitycreatedevent)
- [IdentityCreatedEventFilter](ethers_IdentityManager.md#identitycreatedeventfilter)
- [IdentityOfferCanceledEvent](ethers_IdentityManager.md#identityoffercanceledevent)
- [IdentityOfferCanceledEventFilter](ethers_IdentityManager.md#identityoffercanceledeventfilter)
- [IdentityOfferRejectedEvent](ethers_IdentityManager.md#identityofferrejectedevent)
- [IdentityOfferRejectedEventFilter](ethers_IdentityManager.md#identityofferrejectedeventfilter)
- [IdentityOfferedEvent](ethers_IdentityManager.md#identityofferedevent)
- [IdentityOfferedEventFilter](ethers_IdentityManager.md#identityofferedeventfilter)
- [IdentityTransferredEvent](ethers_IdentityManager.md#identitytransferredevent)
- [IdentityTransferredEventFilter](ethers_IdentityManager.md#identitytransferredeventfilter)
- [OwnershipTransferredEvent](ethers_IdentityManager.md#ownershiptransferredevent)
- [OwnershipTransferredEventFilter](ethers_IdentityManager.md#ownershiptransferredeventfilter)
- [UpgradedEvent](ethers_IdentityManager.md#upgradedevent)
- [UpgradedEventFilter](ethers_IdentityManager.md#upgradedeventfilter)

## Type aliases

### AdminChangedEvent

Ƭ **AdminChangedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `newAdmin`: `string` ; `previousAdmin`: `string`  }\>

___

### AdminChangedEventFilter

Ƭ **AdminChangedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`AdminChangedEvent`](ethers_IdentityManager.md#adminchangedevent)\>

___

### BeaconUpgradedEvent

Ƭ **BeaconUpgradedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`], { `beacon`: `string`  }\>

___

### BeaconUpgradedEventFilter

Ƭ **BeaconUpgradedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`BeaconUpgradedEvent`](ethers_IdentityManager.md#beaconupgradedevent)\>

___

### IdentityCreatedEvent

Ƭ **IdentityCreatedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`], { `at`: `BigNumber` ; `identity`: `string` ; `owner`: `string`  }\>

___

### IdentityCreatedEventFilter

Ƭ **IdentityCreatedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`IdentityCreatedEvent`](ethers_IdentityManager.md#identitycreatedevent)\>

___

### IdentityOfferCanceledEvent

Ƭ **IdentityOfferCanceledEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`], { `at`: `BigNumber` ; `identity`: `string` ; `oferedto`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferCanceledEventFilter

Ƭ **IdentityOfferCanceledEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`IdentityOfferCanceledEvent`](ethers_IdentityManager.md#identityoffercanceledevent)\>

___

### IdentityOfferRejectedEvent

Ƭ **IdentityOfferRejectedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`], { `at`: `BigNumber` ; `identity`: `string` ; `offeredTo`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferRejectedEventFilter

Ƭ **IdentityOfferRejectedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`IdentityOfferRejectedEvent`](ethers_IdentityManager.md#identityofferrejectedevent)\>

___

### IdentityOfferedEvent

Ƭ **IdentityOfferedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `string`, `BigNumber`], { `at`: `BigNumber` ; `identity`: `string` ; `offeredTo`: `string` ; `owner`: `string`  }\>

___

### IdentityOfferedEventFilter

Ƭ **IdentityOfferedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`IdentityOfferedEvent`](ethers_IdentityManager.md#identityofferedevent)\>

___

### IdentityTransferredEvent

Ƭ **IdentityTransferredEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`, `BigNumber`], { `at`: `BigNumber` ; `identity`: `string` ; `owner`: `string`  }\>

___

### IdentityTransferredEventFilter

Ƭ **IdentityTransferredEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`IdentityTransferredEvent`](ethers_IdentityManager.md#identitytransferredevent)\>

___

### OwnershipTransferredEvent

Ƭ **OwnershipTransferredEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`, `string`], { `newOwner`: `string` ; `previousOwner`: `string`  }\>

___

### OwnershipTransferredEventFilter

Ƭ **OwnershipTransferredEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`OwnershipTransferredEvent`](ethers_IdentityManager.md#ownershiptransferredevent)\>

___

### UpgradedEvent

Ƭ **UpgradedEvent**: [`TypedEvent`](../interfaces/ethers_common.TypedEvent.md)<[`string`], { `implementation`: `string`  }\>

___

### UpgradedEventFilter

Ƭ **UpgradedEventFilter**: [`TypedEventFilter`](../interfaces/ethers_common.TypedEventFilter.md)<[`UpgradedEvent`](ethers_IdentityManager.md#upgradedevent)\>
