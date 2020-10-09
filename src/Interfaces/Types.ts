import { CreateOrganizationData } from '../organization/OrganizationDTO';
import { CreateApplicationData } from '../application/ApplicationDTO';
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
