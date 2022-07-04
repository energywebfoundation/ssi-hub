import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Credential,
  CredentialSubject,
  CredentialType,
} from '@ew-did-registry/credentials-interface';
import { ICredentialContextType } from '@sphereon/pex/dist/main/lib/types/SSI.types';

export class CredentialSubjectIssuerFieldsDto {
  @IsString()
  @ApiProperty()
  key: string;

  @IsDefined()
  @ApiProperty()
  value: string | number;
}

export class CredentialSubjectRoleDto {
  [x: string]: unknown;

  @IsString()
  @ApiProperty()
  namespace: string;

  @IsNumberString()
  @ApiProperty()
  version: string;
}

export class CredentialSubjectDto implements CredentialSubject {
  [x: string]: unknown;

  @IsString()
  @ApiProperty()
  id: string;

  @Type(() => CredentialSubjectRoleDto)
  @ValidateNested()
  @ApiProperty({ type: CredentialSubjectRoleDto })
  role: CredentialSubjectRoleDto;

  @Type(() => CredentialSubjectIssuerFieldsDto)
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CredentialSubjectIssuerFieldsDto] })
  issuerFields: CredentialSubjectIssuerFieldsDto[];
}

export class CredentialDto implements Credential<CredentialSubjectDto> {
  [key: string]: unknown;

  @ApiProperty()
  @IsDefined()
  '@context': ICredentialContextType[];

  @IsString()
  @ApiProperty()
  id: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  type: CredentialType[];

  @IsString()
  @ApiProperty()
  issuer: string;

  @IsDateString()
  @ApiProperty()
  issuanceDate: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  expirationDate?: string;

  @Type(() => CredentialSubjectDto)
  @ValidateNested()
  @ApiProperty({ type: CredentialSubjectDto })
  credentialSubject: CredentialSubjectDto;
}
