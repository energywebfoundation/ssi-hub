import { KeyValue, KeyValueAPIDefinition } from '../Interfaces/Types';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppDefinition, Application } from './ApplicationTypes';
import { RoleDefinition } from '../role/RoleTypes';

export interface CreateApplicationData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateApplicationDefinition;
}

export interface CreateApplicationDefinition {
  appName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: Record<string, string>;
}

export class ApplicationDefinitionDTO implements AppDefinition {
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
  appName: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others?: KeyValue[] = [];
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
