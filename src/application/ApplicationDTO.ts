import { KeyValue, KeyValueAPIDefinition } from '../Interfaces/Types';
import { Equals, IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppDefinition, Application } from './ApplicationTypes';
import { RoleDefinition } from '../role/RoleTypes';

export interface CreateApplicationData {
  roleType: 'app';
  appName: string;
  description: string
  websiteUrl: string;
  logoUrl: string;
  others: Record<string, string>;
}

export class ApplicationDefinitionDTO implements AppDefinition {
  @IsString()
  description: string;
  @IsString()
  websiteUrl: string;
  @IsString()
  logoUrl: string
  @IsString()
  appName: string;
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others: KeyValue[] = [];

  @Equals("app")
  readonly roleType: "app" = "app";
}

export class ApplicationDTO implements Application {
  @ValidateNested()
  definition: ApplicationDefinitionDTO;

  @IsString()
  name: string;

  @IsString()
  owner: string;

  @IsString()
  namespace: string;

  @IsArray()
  roles: RoleDefinition[] = [];
}
