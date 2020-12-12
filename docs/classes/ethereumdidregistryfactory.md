**[iam-cache-server](../README.md)**

# Class: EthereumDidRegistryFactory

## Hierarchy

* ContractFactory

  ↳ **EthereumDidRegistryFactory**

## Index

### Constructors

* [constructor](ethereumdidregistryfactory.md#constructor)

### Properties

* [bytecode](ethereumdidregistryfactory.md#bytecode)
* [interface](ethereumdidregistryfactory.md#interface)
* [signer](ethereumdidregistryfactory.md#signer)

### Methods

* [attach](ethereumdidregistryfactory.md#attach)
* [connect](ethereumdidregistryfactory.md#connect)
* [deploy](ethereumdidregistryfactory.md#deploy)
* [getDeployTransaction](ethereumdidregistryfactory.md#getdeploytransaction)
* [connect](ethereumdidregistryfactory.md#connect)
* [fromSolidity](ethereumdidregistryfactory.md#fromsolidity)

## Constructors

### constructor

\+ **new EthereumDidRegistryFactory**(`signer?`: Signer): [EthereumDidRegistryFactory](ethereumdidregistryfactory.md)

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`signer?` | Signer |

**Returns:** [EthereumDidRegistryFactory](ethereumdidregistryfactory.md)

## Properties

### bytecode

• `Readonly` **bytecode**: string

*Inherited from [PublicResolverFactory](publicresolverfactory.md).[bytecode](publicresolverfactory.md#bytecode)*

___

### interface

• `Readonly` **interface**: Interface

*Inherited from [PublicResolverFactory](publicresolverfactory.md).[interface](publicresolverfactory.md#interface)*

___

### signer

• `Readonly` **signer**: Signer

*Inherited from [PublicResolverFactory](publicresolverfactory.md).[signer](publicresolverfactory.md#signer)*

## Methods

### attach

▸ **attach**(`address`: string): EthereumDidRegistry

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** EthereumDidRegistry

___

### connect

▸ **connect**(`signer`: Signer): [EthereumDidRegistryFactory](ethereumdidregistryfactory.md)

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`signer` | Signer |

**Returns:** [EthereumDidRegistryFactory](ethereumdidregistryfactory.md)

___

### deploy

▸ **deploy**(`overrides?`: TransactionOverrides): Promise<EthereumDidRegistry\>

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`overrides?` | TransactionOverrides |

**Returns:** Promise<EthereumDidRegistry\>

___

### getDeployTransaction

▸ **getDeployTransaction**(`overrides?`: TransactionOverrides): UnsignedTransaction

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`overrides?` | TransactionOverrides |

**Returns:** UnsignedTransaction

___

### connect

▸ `Static`**connect**(`address`: string, `signerOrProvider`: Signer \| Provider): EthereumDidRegistry

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |
`signerOrProvider` | Signer \| Provider |

**Returns:** EthereumDidRegistry

___

### fromSolidity

▸ `Static`**fromSolidity**(`compilerOutput`: any, `signer?`: Signer): ContractFactory

*Inherited from [PublicResolverFactory](publicresolverfactory.md).[fromSolidity](publicresolverfactory.md#fromsolidity)*

#### Parameters:

Name | Type |
------ | ------ |
`compilerOutput` | any |
`signer?` | Signer |

**Returns:** ContractFactory
