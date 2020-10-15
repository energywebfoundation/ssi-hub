import { KeyValue, KeyValueAPIDefinition } from '../Interfaces/Types';
import { IsOptional, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Organization, OrgDefinition } from './OrganizationTypes';
import { RoleDefinition } from '../role/RoleTypes';
import { AppDefinition } from '../application/ApplicationTypes';

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
}

export class OrganizationDTO implements Organization {
  @ValidateNested()
  definition: OrganizationDefinitionDTO;

  @IsString()
  name: string;

  @IsString()
  owner: string;

  @IsString()
  namespace: string;

  @IsArray()
  roles: RoleDefinition[] = [];

  @IsArray()
  apps: AppDefinition[] = [];
}
