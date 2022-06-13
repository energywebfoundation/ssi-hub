import {
  IsArray,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class StatusListCredentialSubjectDto {
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

export class StatusListCredentialDto {
  @IsArray()
  @ApiProperty()
  '@context': Array<string | Record<string, unknown>>;

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
