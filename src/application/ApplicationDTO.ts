import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppDefinition, Application } from './ApplicationTypes';
import { RoleDTO } from '../role/RoleDTO';
import {
  KeyValue,
  KeyValueAPIDefinition,
  RecordToKeyValue,
} from '../Interfaces/KeyValue';

/**
 * Interface describing raw data required for creation of Application DTO
 */
export interface CreateApplicationData {
  name: string;
  namespace: string;
  owner: string;
  definition: CreateApplicationDefinition;
}

/**
 * Interface describing raw data required for creation of Application's Definition DTO
 */
export interface CreateApplicationDefinition {
  uid?: string;
  appName: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  others?: Record<string, string> | KeyValue[];
}

/**
 * Application's Definition DTO providing validation and API schema for swagger UI
 */
export class ApplicationDefinitionDTO implements AppDefinition {
  constructor(data: CreateApplicationDefinition) {
    this.uid = data.uid;
    this.description = data.description;
    this.logoUrl = data.logoUrl;
    this.websiteUrl = data.websiteUrl;
    this.others = Array.isArray(data.others)
      ? data.others
      : RecordToKeyValue(data.others);
    this.appName = data.appName;
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
  appName: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: KeyValueAPIDefinition,
  })
  others?: KeyValue[] = [];

  readonly 'dgraph.type' = 'AppDefinition';
}

/**
 * interface describing required params for creating Application DTO instance
 */
interface ApplicationDTOParams {
  name: string;
  owner: string;
  namespace: string;
  roles?: RoleDTO[];
}

/**
 * Application DTO providing validation and API schema for swagger UI
 */
export class ApplicationDTO implements Application {
  public uid?: string;

  constructor(
    data: ApplicationDTOParams,
    definition: ApplicationDefinitionDTO,
  ) {
    this.name = data.name;
    this.owner = data.owner;
    this.namespace = data.namespace;

    if (data.roles) this.roles = data.roles;

    this.definition = definition;
  }

  @ValidateNested()
  @ApiProperty()
  definition: ApplicationDefinitionDTO;

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
  @ApiProperty()
  roles: RoleDTO[] = [];

  readonly 'dgraph.type' = 'App';
}
