import { Definition, DGraphObject, KeyValue } from '../Interfaces/Types';

export interface CreateRoleData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateRoleDefinition;
}
export interface CreateRoleDefinition {
  version: string;
  roleType: 'custom';
  roleName: string;
  fields: {
    fieldType: string;
    label: string;
    validation: string;
  }[];
  metadata: Record<string, string>;
  issuer: {
    issuerType: string;
    did: string[];
    roleName: string;
  };
}

export interface RoleDefinition extends Definition {
  uid?: string;
  roleType: string;
  roleName: string;
  fields: {
    fieldType: string;
    label: string;
    validation: string;
    uid?: string
  }[];
  metadata: KeyValue[];
  issuer: {
    issuerType: string;
    did: string[];
    uid?: string
  };
}

export interface Role extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: RoleDefinition;
}
