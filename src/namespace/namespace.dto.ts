import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { NamespaceEntities } from './namespace.types';

export class SearchDTO {
  constructor({
    search,
    types,
  }: {
    types?: NamespaceEntities[];
    search: string;
  }) {
    this.search = search;
    this.types = types;
  }

  @IsOptional()
  @IsArray()
  @IsEnum(NamespaceEntities, { each: true })
  types?: NamespaceEntities[];

  @IsString()
  search: string;
}
