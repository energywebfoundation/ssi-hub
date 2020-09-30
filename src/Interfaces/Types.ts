export interface DGraphObject {
  uid?: string;
  type?: string;
}

export interface KeyValue {
  key: string
  value: string
}

export interface RoleDefinition {
  version: string
  roleType: 'custom' | 'org' | 'app',
  roleName: string,
  fields: [{
    fieldType: string,
    label: string,
    validation: string
  }],
  metadata: KeyValue[],
  issuer: {
    issuerType: string,
    did: unknown[],
  }
}
export interface Role {
  name: string
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