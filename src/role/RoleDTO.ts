import { Equals, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KeyValue, KeyValueAPIDefinition } from '../Interfaces/Types';
import { Role, RoleDefinition } from './RoleTypes';

export class RoleDefinitionDTO implements RoleDefinition {
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        label: { type: 'string' },
        validation: { type: 'string' },
      },
    },
  })
  fields: { fieldType: string; label: string; validation: string }[];

  @IsArray()
  @ApiProperty(KeyValueAPIDefinition)
  metadata: KeyValue[];

  issuer: { issuerType: string; did: string[] };
  roleName: string;

  roleType: string;
  version: string;
}

export class RoleDTO implements Role {
  @ValidateNested()
  definition: RoleDefinitionDTO;
  @IsString()
  name: string;
  @IsString()
  namespace: string;
  @IsString()
  owner: string;
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
