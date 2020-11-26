import { KeyValue, KeyValueAPIDefinition, RecordToKeyValue } from '../Interfaces/Types';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppDefinition, Application } from './ApplicationTypes';
import { RoleDTO } from '../role/RoleDTO';

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

  constructor(data: CreateApplicationDefinition) {
    this.description = data.description;
    this.logoUrl = data.logoUrl;
    this.websiteUrl = data.websiteUrl;
    this.others = RecordToKeyValue(data.others);
    this.appName = data.appName;
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

interface ApplicationDTOParams {
  name: string,
  owner: string,
  namespace: string,
  roles?: RoleDTO[]
}

export class ApplicationDTO implements Application {

  public uid?: string

  constructor(data: ApplicationDTOParams, definition: ApplicationDefinitionDTO) {
    this.name = data.name;
    this.owner = data.owner;
    this.namespace = data.namespace;

    if(data.roles)
      this.roles = data.roles;

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
