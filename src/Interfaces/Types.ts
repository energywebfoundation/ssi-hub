export interface DGraphObject {
  uid?: string;
  type?: string;
}

export interface KeyValue {
  key: string;
  value: string;
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
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: KeyValue;
}

export interface AppDefinition extends Definition {
  roleType: 'app';
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: KeyValue;
}

export interface RoleDefinition extends Definition {
  version: string;
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

export type DefinitionData = RoleDefinition | AppDefinition | OrgDefinition;

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

export interface Role {
  name: string;
  definition: RoleDefinition;
}
export interface Application {
  name: string;
  definition: RoleDefinition;
  roles: RoleDefinition[];
}
export interface Organization {
  name: string;
  definition: RoleDefinition;
  apps: RoleDefinition[];
  roles: RoleDefinition[];
}
