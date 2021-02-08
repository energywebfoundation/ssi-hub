import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, RoleDefinition } from './RoleTypes';
import {
  KeyValue,
  KeyValueAPIDefinition,
  RecordToKeyValue,
} from '../Interfaces/KeyValue';

/**
 * Role's Definition DTO providing validation and API schema for swagger UI
 */
export class RoleDefinitionDTO implements RoleDefinition {
  constructor(data: RoleDTODefinitionData) {
    this.uid = data.uid;
    this.metadata = RecordToKeyValue(data.metadata);
    this.roleName = data.roleName;
    this.fields = data?.fields?.map(f => {
      f['dgraph.type'] = 'Field';
      return f;
    });
    this.version = data.version;
    this.issuer = data.issuer;
    this.issuer['dgraph.type'] = 'RoleIssuer';
    this.roleType = data.roleType;
  }

  @IsOptional()
  @IsString()
  @ApiProperty()
  uid?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        label: { type: 'string' },
        required: { type: 'boolean' },
        minLength: { type: 'integer' },
        maxLength: { type: 'integer' },
        pattern: { type: 'string' },
        minValue: { type: 'integer' },
        maxValue: { type: 'integer' },
        minDate: { type: 'string', format: 'date' },
        maxDate: { type: 'string', format: 'date' },
      },
    },
  })
  fields?: {
    fieldType: string;
    label: string;
    uid?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
    minDate?: Date;
    maxDate?: Date;
  }[];

  @IsOptional()
  @IsArray()
  @ApiProperty(KeyValueAPIDefinition)
  metadata?: KeyValue[];

  issuer: { issuerType: string; did: string[]; roleName: string; uid?: string };

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

  readonly 'dgraph.type' = 'RoleDefinition';
}

interface RoleDTOData {
  name: string;
  owner: string;
  namespace: string;
}

interface RoleDTODefinitionData {
  uid?: string;
  metadata?: Record<string, string>;
  roleName: string;
  fields?: {
    fieldType: string;
    label: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
    minDate?: Date;
    maxDate?: Date;
  }[];
  version: string;
  issuer: { issuerType: string; did: string[]; roleName: string };
  roleType: string;
}

/**
 * Role DTO providing validation and API schema for swagger UI
 */
export class RoleDTO implements Role {
  public uid?: string;

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

  readonly 'dgraph.type' = 'Role';
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
