import { KeyValue, KeyValueAPIDefinition, RecordToKeyValue } from '../Interfaces/Types';
import { IsOptional, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Organization, OrgDefinition } from './OrganizationTypes';
import { RoleDTO } from '../role/RoleDTO';
import { ApplicationDTO } from '../application/ApplicationDTO';

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
  others: KeyValue[] = [];

  readonly 'dgraph.type' = 'OrgDefinition';
}

interface OrganizationDTOParams {
  name: string,
  owner: string,
  namespace: string,
  roles?: RoleDTO[]
  apps?: ApplicationDTO[]
}

export class OrganizationDTO implements Organization {

  public uid?: string

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

  readonly 'dgraph.type' = 'Org';
}
