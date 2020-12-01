import { CreateOrganizationDefinition } from '../organization/OrganizationDTO';
import { CreateApplicationDefinition } from '../application/ApplicationDTO';
import { CreateRoleDefinition } from '../role/RoleTypes';

export interface DGraphObject {
  uid?: string;
  'dgraph.type'?: string;
}

export interface KeyValue {
  key: string;
  value: string;
  uid?: string
}

export function RecordToKeyValue(
  record: Record<string, string> | undefined,
): KeyValue[] {
  return (
    record && Object.entries(record).map(([key, value]) => ({
      key,
      value,
      'dgraph.type': 'KeyValue'
    }))
  );
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
};

export interface Definition {
  appName?: string;
  orgName?: string;
  roleName?: string;
}

export type DefinitionData =
  | CreateOrganizationDefinition
  | CreateApplicationDefinition
  | CreateRoleDefinition;

export const roleDefinitionFullQuery = `
{
  uid
  version
  roleType
  roleName
  appName
  orgName
  description
  websiteUrl
  logoUrl
  issuer {
    uid
    issuerType
    did
  }
  others {
    uid
    key
    value
  }
  fields {
    uid
    fieldType
    label
    validation
  }
  metadata {
    uid
    key
    value
  }
}`;
