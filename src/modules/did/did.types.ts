import { Methods } from '@ew-did-registry/did';
import { MalformedDIDError } from '../../errors/MalformedDIDErrro';

// did-reg Chain is lowercase
export enum Chain {
  VOLTA = 'VOLTA',
  EWC = 'EWC',
}
/**
 * @todo >> ew-did-registry/did
 * matches did:ethr:volta:address and did:ethr:address
 */
export const didPattern =
  '^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-zA-Z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$';

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
    const { method, chain = process.env.CHAIN_NAME, id } = <
      { method: Methods; chain?: string; id: string }
    >match.groups;
    this.method = method;
    this.chain = <Chain>chain.toUpperCase();
    this.id = id;
    this.did = `did:${this.method}:${this.chain}:${this.id}`;
  }
}

export const getDIDFromAddress = (address: string) =>
  `did:ethr:${process.env.CHAIN_NAME}:${address}`;

export const ADD_DID_DOC_QUEUE_NAME = 'addDIDDocument';
export const UPDATE_DID_DOC_QUEUE_NAME = 'refreshDIDDocument';
