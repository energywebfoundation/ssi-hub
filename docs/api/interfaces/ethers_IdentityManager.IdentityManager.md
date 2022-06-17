# Interface: IdentityManager

[ethers/IdentityManager](../modules/ethers_IdentityManager.md).IdentityManager

## Hierarchy

- `BaseContract`

  ↳ **`IdentityManager`**

## Table of contents

### Properties

- [callStatic](ethers_IdentityManager.IdentityManager.md#callstatic)
- [contractName](ethers_IdentityManager.IdentityManager.md#contractname)
- [estimateGas](ethers_IdentityManager.IdentityManager.md#estimategas)
- [filters](ethers_IdentityManager.IdentityManager.md#filters)
- [functions](ethers_IdentityManager.IdentityManager.md#functions)
- [interface](ethers_IdentityManager.IdentityManager.md#interface)
- [off](ethers_IdentityManager.IdentityManager.md#off)
- [on](ethers_IdentityManager.IdentityManager.md#on)
- [once](ethers_IdentityManager.IdentityManager.md#once)
- [populateTransaction](ethers_IdentityManager.IdentityManager.md#populatetransaction)
- [removeListener](ethers_IdentityManager.IdentityManager.md#removelistener)

### Methods

- [attach](ethers_IdentityManager.IdentityManager.md#attach)
- [compliant](ethers_IdentityManager.IdentityManager.md#compliant)
- [connect](ethers_IdentityManager.IdentityManager.md#connect)
- [createIdentity](ethers_IdentityManager.IdentityManager.md#createidentity)
- [deployed](ethers_IdentityManager.IdentityManager.md#deployed)
- [identityAccepted](ethers_IdentityManager.IdentityManager.md#identityaccepted)
- [identityCreated](ethers_IdentityManager.IdentityManager.md#identitycreated)
- [identityOfferCanceled](ethers_IdentityManager.IdentityManager.md#identityoffercanceled)
- [identityOffered](ethers_IdentityManager.IdentityManager.md#identityoffered)
- [identityOwner](ethers_IdentityManager.IdentityManager.md#identityowner)
- [identityRejected](ethers_IdentityManager.IdentityManager.md#identityrejected)
- [initialize](ethers_IdentityManager.IdentityManager.md#initialize)
- [listeners](ethers_IdentityManager.IdentityManager.md#listeners)
- [owner](ethers_IdentityManager.IdentityManager.md#owner)
- [queryFilter](ethers_IdentityManager.IdentityManager.md#queryfilter)
- [removeAllListeners](ethers_IdentityManager.IdentityManager.md#removealllisteners)
- [renounceOwnership](ethers_IdentityManager.IdentityManager.md#renounceownership)
- [transferOwnership](ethers_IdentityManager.IdentityManager.md#transferownership)
- [upgradeTo](ethers_IdentityManager.IdentityManager.md#upgradeto)
- [upgradeToAndCall](ethers_IdentityManager.IdentityManager.md#upgradetoandcall)
- [verified](ethers_IdentityManager.IdentityManager.md#verified)
- [version](ethers_IdentityManager.IdentityManager.md#version)

## Properties

### callStatic

• **callStatic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `initialize` | (`_libraryAddress`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`string`\> |
| `renounceOwnership` | (`overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `transferOwnership` | (`newOwner`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `upgradeTo` | (`newImplementation`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `upgradeToAndCall` | (`newImplementation`: `string`, `data`: `BytesLike`, `overrides?`: `CallOverrides`) => `Promise`<`void`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`boolean`\> |
| `version` | (`overrides?`: `CallOverrides`) => `Promise`<`string`\> |

#### Overrides

BaseContract.callStatic

___

### contractName

• **contractName**: ``"IdentityManager"``

___

### estimateGas

• **estimateGas**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `initialize` | (`_libraryAddress`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `renounceOwnership` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `transferOwnership` | (`newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `upgradeTo` | (`newImplementation`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `upgradeToAndCall` | (`newImplementation`: `string`, `data`: `BytesLike`, `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`BigNumber`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |
| `version` | (`overrides?`: `CallOverrides`) => `Promise`<`BigNumber`\> |

#### Overrides

BaseContract.estimateGas

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AdminChanged` | (`previousAdmin?`: ``null``, `newAdmin?`: ``null``) => [`AdminChangedEventFilter`](../modules/ethers_IdentityManager.md#adminchangedeventfilter) |
| `AdminChanged(address,address)` | (`previousAdmin?`: ``null``, `newAdmin?`: ``null``) => [`AdminChangedEventFilter`](../modules/ethers_IdentityManager.md#adminchangedeventfilter) |
| `BeaconUpgraded` | (`beacon?`: `string`) => [`BeaconUpgradedEventFilter`](../modules/ethers_IdentityManager.md#beaconupgradedeventfilter) |
| `BeaconUpgraded(address)` | (`beacon?`: `string`) => [`BeaconUpgradedEventFilter`](../modules/ethers_IdentityManager.md#beaconupgradedeventfilter) |
| `IdentityCreated` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`IdentityCreatedEventFilter`](../modules/ethers_IdentityManager.md#identitycreatedeventfilter) |
| `IdentityCreated(address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`IdentityCreatedEventFilter`](../modules/ethers_IdentityManager.md#identitycreatedeventfilter) |
| `IdentityOfferCanceled` | (`identity?`: `string`, `owner?`: `string`, `oferedto?`: ``null``, `at?`: `BigNumberish`) => [`IdentityOfferCanceledEventFilter`](../modules/ethers_IdentityManager.md#identityoffercanceledeventfilter) |
| `IdentityOfferCanceled(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `oferedto?`: ``null``, `at?`: `BigNumberish`) => [`IdentityOfferCanceledEventFilter`](../modules/ethers_IdentityManager.md#identityoffercanceledeventfilter) |
| `IdentityOfferRejected` | (`identity?`: `string`, `owner?`: ``null``, `offeredTo?`: `string`, `at?`: `BigNumberish`) => [`IdentityOfferRejectedEventFilter`](../modules/ethers_IdentityManager.md#identityofferrejectedeventfilter) |
| `IdentityOfferRejected(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: ``null``, `offeredTo?`: `string`, `at?`: `BigNumberish`) => [`IdentityOfferRejectedEventFilter`](../modules/ethers_IdentityManager.md#identityofferrejectedeventfilter) |
| `IdentityOffered` | (`identity?`: `string`, `owner?`: `string`, `offeredTo?`: ``null``, `at?`: `BigNumberish`) => [`IdentityOfferedEventFilter`](../modules/ethers_IdentityManager.md#identityofferedeventfilter) |
| `IdentityOffered(address,address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `offeredTo?`: ``null``, `at?`: `BigNumberish`) => [`IdentityOfferedEventFilter`](../modules/ethers_IdentityManager.md#identityofferedeventfilter) |
| `IdentityTransferred` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`IdentityTransferredEventFilter`](../modules/ethers_IdentityManager.md#identitytransferredeventfilter) |
| `IdentityTransferred(address,address,uint256)` | (`identity?`: `string`, `owner?`: `string`, `at?`: `BigNumberish`) => [`IdentityTransferredEventFilter`](../modules/ethers_IdentityManager.md#identitytransferredeventfilter) |
| `OwnershipTransferred` | (`previousOwner?`: `string`, `newOwner?`: `string`) => [`OwnershipTransferredEventFilter`](../modules/ethers_IdentityManager.md#ownershiptransferredeventfilter) |
| `OwnershipTransferred(address,address)` | (`previousOwner?`: `string`, `newOwner?`: `string`) => [`OwnershipTransferredEventFilter`](../modules/ethers_IdentityManager.md#ownershiptransferredeventfilter) |
| `Upgraded` | (`implementation?`: `string`) => [`UpgradedEventFilter`](../modules/ethers_IdentityManager.md#upgradedeventfilter) |
| `Upgraded(address)` | (`implementation?`: `string`) => [`UpgradedEventFilter`](../modules/ethers_IdentityManager.md#upgradedeventfilter) |

#### Overrides

BaseContract.filters

___

### functions

• **functions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `initialize` | (`_libraryAddress`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |
| `renounceOwnership` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `transferOwnership` | (`newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `upgradeTo` | (`newImplementation`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `upgradeToAndCall` | (`newImplementation`: `string`, `data`: `BytesLike`, `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`ContractTransaction`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<[`boolean`]\> |
| `version` | (`overrides?`: `CallOverrides`) => `Promise`<[`string`]\> |

#### Overrides

BaseContract.functions

___

### interface

• **interface**: [`IdentityManagerInterface`](ethers_IdentityManager.IdentityManagerInterface.md)

#### Overrides

BaseContract.interface

___

### off

• **off**: [`OnEvent`](ethers_common.OnEvent.md)<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.off

___

### on

• **on**: [`OnEvent`](ethers_common.OnEvent.md)<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.on

___

### once

• **once**: [`OnEvent`](ethers_common.OnEvent.md)<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.once

___

### populateTransaction

• **populateTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compliant` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `createIdentity` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityAccepted` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityCreated` | (`_owner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOfferCanceled` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOffered` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `identityOwner` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `identityRejected` | (`_offeredTo`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `initialize` | (`_libraryAddress`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `owner` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `renounceOwnership` | (`overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `transferOwnership` | (`newOwner`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `upgradeTo` | (`newImplementation`: `string`, `overrides?`: `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `upgradeToAndCall` | (`newImplementation`: `string`, `data`: `BytesLike`, `overrides?`: `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  }) => `Promise`<`PopulatedTransaction`\> |
| `verified` | (`identity`: `string`, `overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |
| `version` | (`overrides?`: `CallOverrides`) => `Promise`<`PopulatedTransaction`\> |

#### Overrides

BaseContract.populateTransaction

___

### removeListener

• **removeListener**: [`OnEvent`](ethers_common.OnEvent.md)<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.removeListener

## Methods

### attach

▸ **attach**(`addressOrName`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.attach

___

### compliant

▸ **compliant**(`identity`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### connect

▸ **connect**(`signerOrProvider`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Signer` \| `Provider` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.connect

___

### createIdentity

▸ **createIdentity**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### deployed

▸ **deployed**(): `Promise`<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Returns

`Promise`<[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)\>

#### Overrides

BaseContract.deployed

___

### identityAccepted

▸ **identityAccepted**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityCreated

▸ **identityCreated**(`_owner`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_owner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityOfferCanceled

▸ **identityOfferCanceled**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityOffered

▸ **identityOffered**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### identityOwner

▸ **identityOwner**(`identity`, `overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

___

### identityRejected

▸ **identityRejected**(`_offeredTo`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_offeredTo` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### initialize

▸ **initialize**(`_libraryAddress`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_libraryAddress` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### listeners

▸ **listeners**<`TEvent`\>(`eventFilter?`): [`TypedListener`](ethers_common.TypedListener.md)<`TEvent`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

#### Returns

[`TypedListener`](ethers_common.TypedListener.md)<`TEvent`\>[]

#### Overrides

BaseContract.listeners

▸ **listeners**(`eventName?`): `Listener`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

`Listener`[]

#### Overrides

BaseContract.listeners

___

### owner

▸ **owner**(`overrides?`): `Promise`<`string`\>

Returns the address of the current owner.

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>

___

### queryFilter

▸ **queryFilter**<`TEvent`\>(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<`TEvent`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |
| `fromBlockOrBlockhash?` | `string` \| `number` |
| `toBlock?` | `string` \| `number` |

#### Returns

`Promise`<`TEvent`[]\>

#### Overrides

BaseContract.queryFilter

___

### removeAllListeners

▸ **removeAllListeners**<`TEvent`\>(`eventFilter`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends [`TypedEvent`](ethers_common.TypedEvent.md)<`any`, `any`, `TEvent`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [`TypedEventFilter`](ethers_common.TypedEventFilter.md)<`TEvent`\> |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` |

#### Returns

[`IdentityManager`](ethers_IdentityManager.IdentityManager.md)

#### Overrides

BaseContract.removeAllListeners

___

### renounceOwnership

▸ **renounceOwnership**(`overrides?`): `Promise`<`ContractTransaction`\>

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### transferOwnership

▸ **transferOwnership**(`newOwner`, `overrides?`): `Promise`<`ContractTransaction`\>

Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newOwner` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### upgradeTo

▸ **upgradeTo**(`newImplementation`, `overrides?`): `Promise`<`ContractTransaction`\>

Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newImplementation` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### upgradeToAndCall

▸ **upgradeToAndCall**(`newImplementation`, `data`, `overrides?`): `Promise`<`ContractTransaction`\>

Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newImplementation` | `string` |
| `data` | `BytesLike` |
| `overrides?` | `PayableOverrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<`ContractTransaction`\>

___

### verified

▸ **verified**(`identity`, `overrides?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`boolean`\>

___

### version

▸ **version**(`overrides?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `CallOverrides` |

#### Returns

`Promise`<`string`\>
