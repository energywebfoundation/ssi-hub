import { IsString } from 'class-validator';

interface DGraphObject {
  uid: string;
}

export type KeyValue = {key: string, value: string}

export interface ClaimDefinition extends DGraphObject {
  namespace: string;
  title: string;
  owner: string;
  issuer: string;
  attributes: KeyValue[];
}

export class ClaimDefinitionDTO implements ClaimDefinition {
  attributes: KeyValue[];

  @IsString()
  issuer: string;

  @IsString()
  namespace: string;

  @IsString()
  owner: string;

  @IsString()
  title: string;

  uid: string;
}

export interface ClaimData extends DGraphObject {}
export interface Role extends DGraphObject {}
export interface Organization extends DGraphObject {}
export interface Application extends DGraphObject {}

export interface Identity extends DGraphObject {
  did: any;
}

export interface Claim extends DGraphObject {
  definition: ClaimDefinition,
  data: ClaimData;
  issuer: Identity;
  owner: Identity;
}