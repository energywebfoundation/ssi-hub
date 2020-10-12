import { CreateOrganizationDefinition } from '../organization/OrganizationDTO';
import { CreateApplicationDefinition } from '../application/ApplicationDTO';
import { CreateRoleDefinition } from '../role/RoleTypes';

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

export interface Definition {
  appName?: string;
  orgName?: string;
  roleName?: string;
}

export type DefinitionData = CreateOrganizationDefinition | CreateApplicationDefinition | CreateRoleDefinition;

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
