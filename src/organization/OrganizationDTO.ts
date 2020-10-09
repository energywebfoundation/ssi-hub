import { KeyValue, KeyValueAPIDefinition } from '../Interfaces/Types';
import { Equals, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Organization, OrgDefinition } from './OrganizationTypes';
import { RoleDefinition } from '../role/RoleTypes';
import { AppDefinition } from '../application/ApplicationTypes';

export interface CreateOrganizationData {
  roleType: 'org';
  orgName: string;
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: Record<string, string>;
}

export class OrganizationDefinitionDTO implements OrgDefinition {
  @IsString()
  description: string;
  @IsString()
  websiteUrl: string;
  @IsString()
  logoUrl: string
  @IsString()
  orgName: string

  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others: KeyValue[] = [];

  @Equals("org")
  readonly roleType = "org";
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
