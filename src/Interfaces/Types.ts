import { CreateOrganizationData } from '../role/OrganizationDTO';
import { CreateApplicationData } from '../role/ApplicationDTO';
import { CreateRoleData } from '../role/RoleTypes';

export interface DGraphObject {
  uid?: string;
  type?: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export function RecordToKeyValue(record: Record<string, string>): KeyValue[] {
  return Object.entries(record).map(([key,value]) => ({ key, value}))
}

export const KeyValueAPIDefinition = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
    },
  },
}

type roleType = 'custom' | 'org' | 'app';

export interface Definition {
  roleType: roleType;
  appName?: string;
  orgName?: string;
  roleName?: string;
}

export interface OrgDefinition extends Definition {
  roleType: 'org';
  orgName: string;
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: KeyValue[];
}

export interface AppDefinition extends Definition {
  roleType: 'app';
  appName: string;
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: KeyValue[];
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

export type DefinitionData = CreateOrganizationData | CreateApplicationData | CreateRoleData;

export const roleDefinitionFullQuery = `
{
  version
  roleType
  roleName
  appName
  orgName
  description
  websiteUrl
  logoUrl
  others {
    key
    value
  }
  fields {
    fieldType
    label
    validation
  }
  metadata {
    key
    value
  }
}`;

export interface Role extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: RoleDefinition;
}
export interface Application extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: AppDefinition;
  roles: RoleDefinition[];
}
export interface Organization extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: OrgDefinition;
  apps: RoleDefinition[];
  roles: RoleDefinition[];
}
