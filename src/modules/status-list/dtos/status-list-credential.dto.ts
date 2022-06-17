import {
  IsArray,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Credential } from '@ew-did-registry/credentials-interface';

export class StatusListCredentialSubjectDto {
  [key: string]: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  statusPurpose: string;

  @IsString()
  @ApiProperty()
  encodedList: string;
}

export class StatusListCredentialDto
  implements Credential<StatusListCredentialSubjectDto>
{
  [x: string]: unknown;

  @IsArray()
  @ApiProperty()
  '@context': string[];

  @IsString()
  @ApiProperty()
  id: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  type: string[];

  @IsString()
  @ApiProperty()
  issuer: string;

  @IsDateString()
  @ApiProperty()
  issuanceDate: string;

  @Type(() => StatusListCredentialSubjectDto)
  @ValidateNested()
  @ApiProperty({ type: StatusListCredentialSubjectDto })
  credentialSubject: StatusListCredentialSubjectDto;
}
