import { Methods, Chain } from '@ew-did-registry/did';
import { MalformedDIDError } from '../../errors/MalformedDIDErrro';

/**
 * @todo >> ew-did-registry/did
 * matches did:ethr:volta:address, did:ethr:vOLTa:address and did:ethr:address
 */
export const didPattern =
  '^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$';

/**
 * A value object representing EIP-1056 DID
 */
export class DID {
  /**
   * A DID in the format of "did:" method-name ":" method-specific-id
   */
  readonly did: string;

  readonly method: Methods;

  readonly chain: Chain;

  readonly id: string;

  constructor(did: string) {
    const match = did.match(didPattern);
    if (!match) {
      throw new MalformedDIDError(did);
    }
    const { method, id } = match.groups;
    let chain = match.groups.chain;
    if (!chain && method === Methods.Erc1056) {
      chain = process.env.CHAIN_NAME;
    }
    this.method = <Methods>method;
    this.chain = <Chain>chain;
    this.id = id;
    // If an ethr DID is received that doesn't have chain info, then add it.
    // This is because we want to be backwards compatible with EWF code that didn't include the chain info in the DID
    // But we want to add the chain info because the DID resolution is actually occurring from a specific chain
    if (this.chain) {
      this.did = `did:${this.method}:${this.chain}:${this.id}`;
    } else {
      this.did = `did:${this.method}:${this.id}`;
    }
  }
}

export const getDIDFromAddress = (address: string) =>
  `did:ethr:${process.env.CHAIN_NAME}:${address}`;

export const ADD_DID_DOC_QUEUE_NAME = 'addDIDDocument';
export const UPDATE_DID_DOC_QUEUE_NAME = 'refreshDIDDocument';
