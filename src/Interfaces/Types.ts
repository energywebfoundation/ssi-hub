import { CreateOrganizationDefinition } from '../organization/OrganizationDTO';
import { CreateApplicationDefinition } from '../application/ApplicationDTO';
import { CreateRoleDefinition } from '../role/RoleTypes';

export type DefinitionData =
  | CreateOrganizationDefinition
  | CreateApplicationDefinition
  | CreateRoleDefinition;

/**
 * Query fragment for retrieving role/app/org with definition
 */
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
    roleName
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
