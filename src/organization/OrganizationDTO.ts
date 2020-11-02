import { KeyValue, KeyValueAPIDefinition, RecordToKeyValue } from '../Interfaces/Types';
import { IsOptional, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Organization, OrgDefinition } from './OrganizationTypes';
import { Role, RoleDefinition } from '../role/RoleTypes';
import { AppDefinition, Application } from '../application/ApplicationTypes';

export interface CreateOrganizationData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateOrganizationDefinition;
}

export interface CreateOrganizationDefinition {
  orgName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: Record<string, string>;
}

export class OrganizationDefinitionDTO implements OrgDefinition {

  constructor(data: CreateOrganizationDefinition) {
    this.description = data.description;
    this.logoUrl = data.logoUrl;
    this.websiteUrl = data.websiteUrl;
    this.others = RecordToKeyValue(data.others);
    this.orgName = data.orgName;
  }

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsString()
  orgName: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others: KeyValue[] = [];

  readonly 'dgraph.type' = 'OrgDefinition';
}

interface OrganizationDTOParams {
  name: string,
  owner: string,
  namespace: string,
  roles?: Role[]
  apps?: Application[]
}

export class OrganizationDTO implements Organization {

  constructor(data: OrganizationDTOParams, definition: OrganizationDefinitionDTO) {
    this.name = data.name;
    this.owner = data.owner;
    this.namespace = data.namespace;

    if(data.roles)
      this.roles = data.roles;
    if(data.apps)
      this.apps = data.apps;

    this.definition = definition;
  }

  @ValidateNested()
  definition: OrganizationDefinitionDTO;

  @IsString()
  name: string;

  @IsString()
  owner: string;

  @IsString()
  namespace: string;

  @IsArray()
  roles: Role[] = [];

  @IsArray()
  apps: Application[] = [];

  readonly 'dgraph.type' = 'Org';
}
