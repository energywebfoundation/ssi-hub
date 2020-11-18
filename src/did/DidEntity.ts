import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { DGraphObject } from 'src/Interfaces/Types';

export const DID_DgraphType = 'DID';

/**
 * DID Document as persisted to DGraph
 */
export class DIDEntity implements IDIDEntity {

  constructor(data: IDIDDocument, uid?: string) {
    this.id = data.id;
    this.document = JSON.stringify(data);
    this.uid = uid ?? '_:new';
  }

  id: string;
  document: string;
  uid: string;
  readonly 'dgraph.type' = DID_DgraphType;
}

export interface IDIDEntity extends DGraphObject {
  id: string;
  document: string;
}