/**
 * Interface with fields held by every Dgraph node
 */
export interface DGraphObject {
  uid?: string;
  'dgraph.type'?: string;
}
