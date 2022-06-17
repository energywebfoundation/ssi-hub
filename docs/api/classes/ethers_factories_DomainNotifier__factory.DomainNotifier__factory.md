# Class: DomainNotifier\_\_factory

[ethers/factories/DomainNotifier__factory](../modules/ethers_factories_DomainNotifier__factory.md).DomainNotifier__factory

## Hierarchy

- `ContractFactory`

  ↳ **`DomainNotifier__factory`**

## Table of contents

### Constructors

- [constructor](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#constructor)

### Properties

- [contractName](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#contractname)
- [abi](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#abi)
- [bytecode](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#bytecode)
- [contractName](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#contractname-1)

### Methods

- [attach](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#attach)
- [connect](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#connect)
- [deploy](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#deploy)
- [getDeployTransaction](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#getdeploytransaction)
- [connect](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#connect-1)
- [createInterface](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md#createinterface)

## Constructors

### constructor

• **new DomainNotifier__factory**(...`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `DomainNotifierConstructorParams` |

#### Overrides

ContractFactory.constructor

## Properties

### contractName

• `Readonly` **contractName**: ``"DomainNotifier"``

___

### abi

▪ `Static` `Readonly` **abi**: ({ `anonymous`: `undefined` = false; `inputs`: { `internalType`: `string` = "contract ENS"; `name`: `string` = "ens"; `type`: `string` = "address" }[] ; `outputs`: `undefined` ; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "constructor" } \| { `anonymous`: `boolean` = false; `inputs`: { `indexed`: `boolean` = true; `internalType`: `string` = "bytes32"; `name`: `string` = "node"; `type`: `string` = "bytes32" }[] ; `name`: `string` = "DomainUpdated"; `outputs`: `undefined` ; `stateMutability`: `undefined` = "view"; `type`: `string` = "event" } \| { `anonymous`: `undefined` = false; `inputs`: { `internalType`: `string` = "bytes32"; `name`: `string` = "node"; `type`: `string` = "bytes32" }[] ; `name`: `string` = "domainUpdated"; `outputs`: `any`[] = []; `stateMutability`: `string` = "nonpayable"; `type`: `string` = "function" })[] = `_abi`

___

### bytecode

▪ `Static` `Readonly` **bytecode**: ``"0x608060405234801561001057600080fd5b506040516103df3803806103df8339818101604052810190610032919061008d565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061011a565b60008151905061008781610103565b92915050565b6000602082840312156100a3576100a26100fe565b5b60006100b184828501610078565b91505092915050565b60006100c5826100de565b9050919050565b60006100d7826100ba565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61010c816100cc565b811461011757600080fd5b50565b6102b6806101296000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80636161016414610030575b600080fd5b61004a600480360381019061004591906101ba565b61004c565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf836040518263ffffffff1660e01b81526004016100a891906101f6565b60206040518083038186803b1580156100c057600080fd5b505afa1580156100d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f8919061018d565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461013257600080fd5b817f8c7bc2aee1d48bb46b825273bef0ffd000ccf7d354d5be84bd1e7fe6a208db4960405160405180910390a25050565b60008151905061017281610252565b92915050565b60008135905061018781610269565b92915050565b6000602082840312156101a3576101a261024d565b5b60006101b184828501610163565b91505092915050565b6000602082840312156101d0576101cf61024d565b5b60006101de84828501610178565b91505092915050565b6101f081610223565b82525050565b600060208201905061020b60008301846101e7565b92915050565b600061021c8261022d565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61025b81610211565b811461026657600080fd5b50565b61027281610223565b811461027d57600080fd5b5056fea2646970667358221220abd3eca2e63385e1ab5cfdc2c854c7d3ef80c12946de5ea6c81e1dde543c49a264736f6c63430008060033"``

___

### contractName

▪ `Static` `Readonly` **contractName**: ``"DomainNotifier"``

## Methods

### attach

▸ **attach**(`address`): [`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)

#### Overrides

ContractFactory.attach

___

### connect

▸ **connect**(`signer`): [`DomainNotifier__factory`](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

[`DomainNotifier__factory`](ethers_factories_DomainNotifier__factory.DomainNotifier__factory.md)

#### Overrides

ContractFactory.connect

___

### deploy

▸ **deploy**(`ens`, `overrides?`): `Promise`<[`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ens` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`Promise`<[`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)\>

#### Overrides

ContractFactory.deploy

___

### getDeployTransaction

▸ **getDeployTransaction**(`ens`, `overrides?`): `TransactionRequest`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ens` | `string` |
| `overrides?` | `Overrides` & { `from?`: `string` \| `Promise`<`string`\>  } |

#### Returns

`TransactionRequest`

#### Overrides

ContractFactory.getDeployTransaction

___

### connect

▸ `Static` **connect**(`address`, `signerOrProvider`): [`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `signerOrProvider` | `Signer` \| `Provider` |

#### Returns

[`DomainNotifier`](../interfaces/ethers_DomainNotifier.DomainNotifier.md)

___

### createInterface

▸ `Static` **createInterface**(): [`DomainNotifierInterface`](../interfaces/ethers_DomainNotifier.DomainNotifierInterface.md)

#### Returns

[`DomainNotifierInterface`](../interfaces/ethers_DomainNotifier.DomainNotifierInterface.md)
