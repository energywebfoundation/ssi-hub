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
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
    minDate?: Date;
    maxDate?: Date;
  }[];
  metadata?: Record<string, string>;
  issuer: {
    uid?: string;
    issuerType: string;
    did: string[];
    roleName: string;
  };
  enrolmentPreconditions?: {
    type: string;
    conditions: string[];
    'dgraph.type': string;
  }[];
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
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
    minDate?: Date;
    maxDate?: Date;
    uid?: string;
  }[];
  metadata?: KeyValue[];
  issuer: {
    issuerType: string;
    did: string[];
    uid?: string;
    roleName?: string;
  };
  version: string;
  enrolmentPreconditions?: {
    type: string;
    conditions: string[];
    'dgraph.type': string;
    uid?: string;
  }[];
}
