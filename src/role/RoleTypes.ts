import { DGraphObject, KeyValue } from '../Interfaces/Types';

export interface Role extends DGraphObject {
  metadata: KeyValue[];
  address: string;
  namespace: string;
  fields: {
    type: string;
    label: string;
    validation: string;
  }[];
}