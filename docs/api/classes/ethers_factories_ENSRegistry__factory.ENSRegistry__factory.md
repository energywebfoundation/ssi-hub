# Class: ENSRegistry\_\_factory

[ethers/factories/ENSRegistry__factory](../modules/ethers_factories_ENSRegistry__factory.md).ENSRegistry__factory

## Hierarchy

- `ContractFactory`

  ↳ **`ENSRegistry__factory`**

## Table of contents

### Constructors

- [constructor](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#constructor)

### Properties

- [abi](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#abi)
- [bytecode](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#bytecode)

### Methods

- [attach](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#attach)
- [connect](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#connect)
- [deploy](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#deploy)
- [getDeployTransaction](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#getdeploytransaction)
- [connect](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#connect)
- [createInterface](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md#createinterface)

## Constructors

### constructor

• **new ENSRegistry__factory**(...`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [contractInterface: ContractInterface, bytecode: BytesLike \| Object, signer?: Signer] \| [signer: Signer] |

#### Overrides

ContractFactory.constructor

## Properties

### abi

▪ `Static` `Readonly` **abi**: ({ `anonymous`: `undefined` = false; `constant`: `undefined` = false; `inputs`: `any`[] = []; `name`: `undefined` = "domainUpdated"; `outputs`: `undefined` = []; `payable`: `boolean` = false; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "constructor" } \| { `anonymous`: `boolean` = false; `constant`: `undefined` = false; `inputs`: { `indexed`: `boolean` = true; `internalType`: `string` = "address"; `name`: `string` = "owner"; `type`: `string` = "address" }[] ; `name`: `string` = "ApprovalForAll"; `outputs`: `undefined` = []; `payable`: `undefined` = false; `stateMutability`: `undefined` = "nonpayable"; `type`: `string` = "event" } \| { `anonymous`: `undefined` = false; `constant`: `boolean` = false; `inputs`: { `internalType`: `string` = "bytes32"; `name`: `string` = "node"; `type`: `string` = "bytes32" }[] ; `name`: `string` = "setSubnodeOwner"; `outputs`: { `internalType`: `string` = "bytes32"; `name`: `string` = ""; `type`: `string` = "bytes32" }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "function" })[] = `_abi`

___

### bytecode

▪ `Static` `Readonly` **bytecode**: ``"0x608060405234801561001057600080fd5b50336000808060001b815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061118b806100776000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635b0fc9c3116100715780635b0fc9c3146102e75780635ef2c7f014610335578063a22cb465146103c1578063cf40882314610411578063e985e9c514610493578063f79fe5381461050f576100b4565b80630178b8bf146100b957806302571be31461012757806306ab59231461019557806314ab90381461020157806316a25cbd146102435780631896f70a14610299575b600080fd5b6100e5600480360360208110156100cf57600080fd5b8101908080359060200190929190505050610555565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101536004803603602081101561013d57600080fd5b8101908080359060200190929190505050610594565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101eb600480360360608110156101ab57600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610617565b6040518082815260200191505060405180910390f35b6102416004803603604081101561021757600080fd5b8101908080359060200190929190803567ffffffffffffffff1690602001909291905050506107cc565b005b61026f6004803603602081101561025957600080fd5b810190808035906020019092919050505061095e565b604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390f35b6102e5600480360360408110156102af57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610991565b005b610333600480360360408110156102fd57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b53565b005b6103bf600480360360a081101561034b57600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610ccb565b005b61040f600480360360408110156103d757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610ced565b005b6104916004803603608081101561042757600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610dee565b005b6104f5600480360360408110156104a957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e09565b604051808215151515815260200191505060405180910390f35b61053b6004803603602081101561052557600080fd5b8101908080359060200190929190505050610e9d565b604051808215151515815260200191505060405180910390f35b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561060d576000915050610612565b809150505b919050565b600083600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107145750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61071d57600080fd5b60008686604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120905061075a8186610f0b565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e8287604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a38093505050509392505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806108c75750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6108d057600080fd5b837f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6884604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050505050565b600080600083815260200190815260200160002060010160149054906101000a900467ffffffffffffffff169050919050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610a8c5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610a9557600080fd5b837f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610c4e5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610c5757600080fd5b610c618484610f0b565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d26684604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a250505050565b6000610cd8868686610617565b9050610ce5818484610f63565b505050505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b610df88484610b53565b610e03848383610f63565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b8060008084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611084578160008085815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b60008084815260200190815260200160002060010160149054906101000a900467ffffffffffffffff1667ffffffffffffffff168167ffffffffffffffff1614611151578060008085815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550827f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6882604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a25b50505056fea265627a7a723158207b5a893502e908f44aa238df4c84f15a53b16ec0f0e4ca667c972fe8f918e5d364736f6c63430005100032"``

## Methods

### attach

▸ **attach**(`address`): [`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)

#### Overrides

ContractFactory.attach

___

### connect

▸ **connect**(`signer`): [`ENSRegistry__factory`](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

[`ENSRegistry__factory`](ethers_factories_ENSRegistry__factory.ENSRegistry__factory.md)

#### Overrides

ContractFactory.connect

___

### deploy

▸ **deploy**(`overrides?`): `Promise`<[`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<[`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)\>

#### Overrides

ContractFactory.deploy

___

### getDeployTransaction

▸ **getDeployTransaction**(`overrides?`): `TransactionRequest`

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`TransactionRequest`

#### Overrides

ContractFactory.getDeployTransaction

___

### connect

▸ `Static` **connect**(`address`, `signerOrProvider`): [`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `signerOrProvider` | `Provider` \| `Signer` |

#### Returns

[`ENSRegistry`](../interfaces/ethers_ENSRegistry.ENSRegistry.md)

___

### createInterface

▸ `Static` **createInterface**(): [`ENSRegistryInterface`](../interfaces/ethers_ENSRegistry.ENSRegistryInterface.md)

#### Returns

[`ENSRegistryInterface`](../interfaces/ethers_ENSRegistry.ENSRegistryInterface.md)
