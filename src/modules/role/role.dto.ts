import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  PreconditionType,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
import { IRevokerDefinition } from '@energyweb/credential-governance/dist/src/types/domain-definitions';
import { EnrolmentPrecondition, Fields, Issuer } from './role.types';
import { BaseEnsEntity } from '../../common/ENSBaseEntity';

export class FieldsDTO implements Fields {
  static async create(data: Partial<FieldsDTO>) {
    const dto = new FieldsDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }
  @IsString()
  @ApiProperty()
  fieldType: string;

  @IsString()
  @ApiProperty()
  label: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  required?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  minLength?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  maxLength?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pattern?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  minValue?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  maxValue?: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  minDate?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  maxDate?: Date;
}

export class PreconditionsDTO implements EnrolmentPrecondition {
  static async create(data: Partial<PreconditionsDTO>) {
    const dto = new PreconditionsDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }
  @IsString()
  type: PreconditionType;

  @IsArray()
  conditions: string[];
}

export class IssuerDTO implements Issuer {
  static async create(data: Partial<IssuerDTO>) {
    const dto = new IssuerDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }
  @IsString()
  issuerType: string;

  @IsArray()
  @IsOptional()
  did?: string[];

  @IsString()
  @IsOptional()
  roleName?: string;
}

export class RevokerDTO implements IRevokerDefinition {
  static async create(data: Partial<RevokerDTO>) {
    const dto = new RevokerDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  @IsEnum(['DID', 'ROLE'])
  revokerType: string;

  @IsArray()
  @IsOptional()
  did?: string[];

  @IsString()
  @IsOptional()
  roleName?: string;
}

/**
 * Role's Definition DTO providing validation and API schema for swagger UI
 */
export class RoleDefinitionDTO implements IRoleDefinitionV2 {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldsDTO)
  requestorFields?: FieldsDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldsDTO)
  issuerFields?: FieldsDTO[];

  @IsOptional()
  @IsObject()
  @ApiProperty()
  metadata: Record<string, unknown>;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => IssuerDTO)
  issuer: IssuerDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => RevokerDTO)
  revoker: RevokerDTO;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreconditionsDTO)
  enrolmentPreconditions: PreconditionsDTO[];

  @IsString()
  @ApiProperty()
  roleName: string;

  @IsString()
  @ApiProperty()
  roleType: string;

  @IsString()
  @ApiProperty()
  version: number;
}

/**
 * Role DTO providing validation and API schema for swagger UI
 */
export class RoleDTO implements BaseEnsEntity {
  static async create({
    definition: {
      issuer,
      revoker,
      enrolmentPreconditions = [],
      issuerFields = [],
      requestorFields = [],
      ...definition
    },
    ...data
  }: Partial<RoleDTO>): Promise<RoleDTO> {
    // This way of creating DTO's was enforced by class-validator being not able to whitelist deeply nested objects
    const issuerFieldsDTO = await Promise.all(
      issuerFields?.map((field) => FieldsDTO.create(field))
    );
    const requestorFieldsDTO = await Promise.all(
      requestorFields?.map((field) => FieldsDTO.create(field))
    );
    const issuerDTO = await IssuerDTO.create(issuer);
    const revokerDTO = await RevokerDTO.create(revoker);
    const enrolmentPreconditionsDTO = await Promise.all(
      enrolmentPreconditions?.map((precondition) =>
        PreconditionsDTO.create(precondition)
      )
    );
    const definitionDto = {
      ...(definition || {}),
      issuerFields: issuerFieldsDTO,
      requestorFields: requestorFieldsDTO,
      issuer: issuerDTO,
      revoker: revokerDTO,
      enrolmentPreconditions: enrolmentPreconditionsDTO,
    };
    const dto = new RoleDTO();
    Object.assign(dto, { ...data, definition: definitionDto });
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsDefined()
  definition: RoleDefinitionDTO;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  namespace: string;

  @IsString()
  @ApiProperty()
  namehash: string;

  @IsString()
  @ApiProperty()
  owner: string;

  @IsOptional()
  @IsString()
  orgNamespace?: string;

  @IsOptional()
  @IsString()
  appNamespace?: string;
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
