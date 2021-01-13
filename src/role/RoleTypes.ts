import { KeyValue } from '../Interfaces/KeyValue';
import { DGraphObject } from '../Interfaces/DGraphObject';

/**
 * Interface describing raw data required for creation of Role DTO
 */
export interface CreateRoleData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateRoleDefinition;
}

/**
 * Interface describing raw data required for creation of Role's Definition DTO
 */
export interface CreateRoleDefinition {
  version: string;
  roleType: 'custom';
  roleName: string;
  fields?: {
    fieldType: string;
    label: string;
    validation: string;
  }[];
  metadata?: Record<string, string>;
  issuer: {
    uid?: string;
    issuerType: string;
    did: string[];
    roleName: string;
  };
}

/**
 * Interface describing generic Role model
 */
export interface Role extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: RoleDefinition;
}

/**
 * Interface describing generic Role's Definition model
 */
export interface RoleDefinition extends DGraphObject {
  roleType: string;
  roleName: string;
  fields?: {
    fieldType: string;
    label: string;
    validation: string;
    uid?: string;
  }[];
  metadata?: KeyValue[];
  issuer: {
    issuerType: string;
    did: string[];
    uid?: string;
  };
}
