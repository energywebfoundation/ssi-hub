import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KeyValue, KeyValueAPIDefinition, RecordToKeyValue } from '../Interfaces/Types';
import { Role, RoleDefinition } from './RoleTypes';

export class RoleDefinitionDTO implements RoleDefinition {

  constructor(data: RoleDTODefinitionData) {
    this.metadata = RecordToKeyValue(data.metadata);
    this.roleName = data.roleName;
    this.fields = data?.fields?.map(f => {
      f['dgraph.type'] = 'Field'
      return f;
    });
    this.version = data.version;
    this.issuer = data.issuer;
    this.issuer['dgraph.type'] = 'RoleIssuer'
    this.roleType = data.roleType;
  }

  @IsOptional()
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

  @IsOptional()
  @IsArray()
  @ApiProperty(KeyValueAPIDefinition)
  metadata: KeyValue[];

  issuer: { issuerType: string; did: string[] };

  @IsString()
  @ApiProperty()
  roleName: string;

  @IsString()
  @ApiProperty()
  roleType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  version: string;

  readonly 'dgraph.type' = 'RoleDefinition'
}

interface RoleDTOData {
  name: string;
  owner: string;
  namespace: string;
}

interface RoleDTODefinitionData {
  metadata: Record<string, string>;
  roleName: string;
  fields: { fieldType: string; label: string; validation: string }[]
  version: string;
  issuer: { issuerType: string; did: string[] };
  roleType: string;
}

export class RoleDTO implements Role {

  public uid?: string

  constructor(data: RoleDTOData, definition: RoleDefinitionDTO) {
    this.name = data.name;
    this.owner = data.owner;
    this.namespace = data.namespace;
    this.definition = definition;
  }

  @ValidateNested()
  @ApiProperty()
  definition: RoleDefinitionDTO;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  namespace: string;
  @IsString()
  @ApiProperty()
  owner: string;

  readonly 'dgraph.type' = 'Role'
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
