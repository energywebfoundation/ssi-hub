import { Role } from '../role/role.types';
import { KeyValue } from '../interfaces/KeyValue';
import { DGraphObject } from '../interfaces/DGraphObject';

/**
 * Interface describing generic Application model
 */
export interface Application extends DGraphObject {
  name: string;
  owner: string;
  namespace: string;
  definition: AppDefinition;
  roles: Role[];
}

/**
 * Interface describing generic Application's Definition model
 */
export interface AppDefinition extends DGraphObject {
  appName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: KeyValue[];
}
