import { IsOptional, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Organization, OrgDefinition } from './organization.types';
import { RoleDTO } from '../role/role.dto';
import { ApplicationDTO } from '../application/application.dto';
import {
  KeyValue,
  KeyValueAPIDefinition,
  RecordToKeyValue,
} from '../interfaces/KeyValue';

/**
 * Interface describing raw data required for creation of Organization DTO
 */
export interface CreateOrganizationData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateOrganizationDefinition;
  parentOrg?: Organization;
  subOrgs?: Organization[];
}

/**
 * Interface describing raw data required for creation of Organization's Definition DTO
 */
export interface CreateOrganizationDefinition {
  uid?: string;
  orgName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: Record<string, string> | KeyValue[];
}

/**
 * Organization's Definition DTO providing validation and API schema for swagger UI
 */
export class OrganizationDefinitionDTO implements OrgDefinition {
  constructor(data: CreateOrganizationDefinition) {
    this.uid = data.uid;
    this.description = data.description;
    this.logoUrl = data.logoUrl;
    this.websiteUrl = data.websiteUrl;
    this.others = Array.isArray(data.others)
      ? data.others
      : RecordToKeyValue(data.others);
    this.orgName = data.orgName;
  }

  @IsOptional()
  @IsString()
  @ApiProperty()
  uid?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  logoUrl?: string;

  @IsString()
  @ApiProperty()
  orgName: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others?: KeyValue[] = [];

  readonly 'dgraph.type' = 'OrgDefinition';
}

interface OrganizationDTOParams {
  name: string;
  owner: string;
  namespace: string;
  roles?: RoleDTO[];
  apps?: ApplicationDTO[];
  parentOrg?: Organization;
}

/**
 * Organization DTO providing validation and API schema for swagger UI
 */
export class OrganizationDTO implements Organization {
  public uid?: string;

  constructor(
    data: OrganizationDTOParams,
    definition: OrganizationDefinitionDTO,
  ) {
    this.name = data.name;
    this.owner = data.owner;
    this.namespace = data.namespace;

    if (data.roles) this.roles = data.roles;
    if (data.apps) this.apps = data.apps;

    this.definition = definition;
    this.parentOrg = data.parentOrg;
  }

  @ValidateNested()
  @ApiProperty()
  definition: OrganizationDefinitionDTO;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  owner: string;

  @IsString()
  @ApiProperty()
  namespace: string;

  @IsArray()
  roles: RoleDTO[] = [];

  @IsArray()
  @ApiProperty()
  apps: ApplicationDTO[] = [];

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  parentOrg?: Organization;

  @IsOptional()
  subOrgs?: Organization[];

  readonly 'dgraph.type' = 'Org';
}
