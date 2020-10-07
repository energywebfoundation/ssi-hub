import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KeyValue } from '../Interfaces/Types';
import { Role } from './RoleTypes';

export class RoleDTO implements Role {
  @IsString()
  @ApiProperty()
  address: string;

  @IsArray()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        label: { type: 'string' },
        validation: { type: 'string' },
      },
    },
  })
  fields: { type: string; label: string; validation: string }[];

  @IsArray()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        value: { type: 'string' },
      },
    },
  })
  metadata: KeyValue[];

  @IsString()
  @ApiProperty()
  namespace: string;

  uid?: string;
  type?: string;

  children?: RoleDTO[];
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
