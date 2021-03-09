import { CreateOrganizationDefinition } from '../organization/organization.dto';
import { CreateApplicationDefinition } from '../application/application.dto';
import { CreateRoleDefinition } from '../role/role.types';

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
    required
    minLength
    maxLength
    pattern
    minValue
    maxValue
    minDate
    maxDate
  }
  metadata {
    uid
    key
    value
  }
  enrolmentPreconditions {
    uid
    type
    conditions
  }
}`;
