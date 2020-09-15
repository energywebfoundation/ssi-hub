import { IsString } from 'class-validator';
import { KeyValue } from '../Interfaces/Types';
import { Claim, ClaimDefinition } from './ClaimTypes';
import { Identity } from '../identity/IdentityTypes';

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
  type: string;
}

export class ClaimDTO implements Claim {
  data: KeyValue[];

  definition: ClaimDefinition;

  issuer: Identity;

  owner: Identity;

  type: string;
  uid: string;
}