import { DGraphObject, KeyValue } from '../Interfaces/Types';
import { Identity } from '../identity/IdentityTypes';

export interface ClaimDefinition extends DGraphObject {
  namespace: string;
  title: string;
  owner: string;
  issuer: string;
  attributes: KeyValue[];
}

export interface Claim extends DGraphObject {
  definition: ClaimDefinition,
  data: KeyValue[];
  issuer: Identity;
  owner: Identity;
}