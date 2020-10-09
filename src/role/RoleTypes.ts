export interface CreateRoleData {
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