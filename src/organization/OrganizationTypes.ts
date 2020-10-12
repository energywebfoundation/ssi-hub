import { Definition, DGraphObject, KeyValue } from '../Interfaces/Types';
import { RoleDefinition } from '../role/RoleTypes';
import { AppDefinition } from '../application/ApplicationTypes';

export interface OrgDefinition extends Definition {
  roleType: 'org';
  orgName: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  others: KeyValue[];
}

export interface Organization extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: OrgDefinition;
  apps: AppDefinition[];
  roles: RoleDefinition[];
}
