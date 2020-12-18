import { Definition } from '../Interfaces/Types';
import { Role } from '../role/RoleTypes';
import { Application } from '../application/ApplicationTypes';
import { KeyValue } from '../Interfaces/KeyValue';
import { DGraphObject } from '../Interfaces/DGraphObject';

/**
 * Interface describing generic Organization model
 */
export interface OrgDefinition extends Definition {
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
}
