# Module: ethers/IdentityManager

## Table of contents

### Classes

- [IdentityManager](../classes/ethers_IdentityManager.IdentityManager.md)

### Interfaces

- [IdentityManagerInterface](../interfaces/ethers_IdentityManager.IdentityManagerInterface.md)

### Type aliases

- [IdentityCreatedEvent](ethers_IdentityManager.md#identitycreatedevent)
- [IdentityOfferCanceledEvent](ethers_IdentityManager.md#identityoffercanceledevent)
- [IdentityOfferRejectedEvent](ethers_IdentityManager.md#identityofferrejectedevent)
- [IdentityOfferedEvent](ethers_IdentityManager.md#identityofferedevent)
- [IdentityTransferredEvent](ethers_IdentityManager.md#identitytransferredevent)

## Type aliases

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
