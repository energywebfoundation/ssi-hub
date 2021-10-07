import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  validateOrReject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnrolmentPrecondition, Fields, Issuer } from './role.types';
import { BaseEnsEntity } from '../../common/ENSBaseEntity';
import { IRoleDefinition, PreconditionType } from '@energyweb/iam-contracts';

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

/**
 * Role's Definition DTO providing validation and API schema for swagger UI
 */
export class RoleDefinitionDTO implements IRoleDefinition {
  @IsOptional()
  fields: FieldsDTO[];

  @IsOptional()
  @IsObject()
  @ApiProperty()
  metadata: Record<string, unknown>;

  @IsDefined()
  issuer: IssuerDTO;

  @IsOptional()
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
      enrolmentPreconditions = [],
      fields = [],
      version,
      ...definition
    },
    ...data
  }: Partial<RoleDTO>): Promise<RoleDTO> {
    // This way of creating DTO's was enforced by class-validator being not able to whitelist deeply nested objects
    const fieldsDTO = await Promise.all(
      fields?.map(field => FieldsDTO.create(field)),
    );
    const issuerDTO = await IssuerDTO.create(issuer);
    const enrolmentPreconditionsDTO = await Promise.all(
      enrolmentPreconditions?.map(precondition =>
        PreconditionsDTO.create(precondition),
      ),
    );
    // Support for legacy version format
    const versionUnknownType = version as unknown;
    const versionDTO =
      typeof versionUnknownType === 'string' && versionUnknownType.includes('.')
        ? (+versionUnknownType.split('.')[0] as number)
        : (+versionUnknownType as number);
    const definitionDto = {
      ...(definition || {}),
      version,
      fields: fieldsDTO,
      issuer: issuerDTO,
      enrolmentPreconditions: enrolmentPreconditionsDTO,
    };
    const dto = new RoleDTO();
    Object.assign(dto, {
      ...data,
      definition: definitionDto,
      version: versionDTO,
    });
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

  @IsOptional()
  @IsNumber()
  version: number;
}

export interface NamespaceFragments {
  apps?: string;
  roles?: string;
  org?: string;
  ewc?: string;
}
