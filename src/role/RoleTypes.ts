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
  };
}

export interface RoleDefinition extends Definition {
  roleType: 'custom';
  roleName: string;
  fields: {
    fieldType: string;
    label: string;
    validation: string;
  }[];
  metadata: KeyValue[];
  issuer: {
    issuerType: string;
    did: string[];
  };
}

export interface Role extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: RoleDefinition;
}