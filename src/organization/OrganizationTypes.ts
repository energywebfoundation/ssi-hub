import { Definition, DGraphObject, KeyValue } from '../Interfaces/Types';
import { Role, RoleDefinition } from '../role/RoleTypes';
import { AppDefinition, Application } from '../application/ApplicationTypes';

export interface OrgDefinition extends Definition {
  orgName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: KeyValue[];
}

export interface Organization extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: OrgDefinition;
  apps: Application[];
  roles: Role[];
}
