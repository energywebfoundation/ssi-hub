import { DGraphObject, RoleDefinition } from '../Interfaces/Types';

export interface Organization extends DGraphObject {
  name: string;
  definition: RoleDefinition;
  apps: RoleDefinition[];
  roles: RoleDefinition[];
}