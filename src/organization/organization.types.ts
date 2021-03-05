import { Role } from '../role/role.types';
import { Application } from '../application/application.types';
import { KeyValue } from '../Interfaces/KeyValue';
import { DGraphObject } from '../Interfaces/DGraphObject';

/**
 * Interface describing generic Organization model
 */
export interface OrgDefinition extends DGraphObject {
  orgName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: KeyValue[];
}

/**
 * Interface describing generic Organization's Definition model
 */
export interface Organization extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: OrgDefinition;
  apps: Application[];
  roles: Role[];
  parentOrg?: Organization;
  subOrgs?: Organization[];
}
