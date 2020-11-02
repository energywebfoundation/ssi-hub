import { Definition, DGraphObject, KeyValue } from '../Interfaces/Types';
import { Role, RoleDefinition } from '../role/RoleTypes';

export interface Application extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: AppDefinition;
  roles: Role[];
}

export interface AppDefinition extends Definition {
  appName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: KeyValue[];
}
