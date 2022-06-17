import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CredentialWithStatusDto } from './credential-status.dto';

export class VerifiableCredentialProofDto {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: string | string[] | any;

  @IsDefined()
  '@context': string | string[];

  @IsString()
  type: string;

  @IsString()
  proofPurpose: string;

  @IsString()
  @IsOptional()
  proofValue: string;

  @IsString()
  verificationMethod: string;

  @IsDateString()
  created: string;

  @IsObject()
  eip712Domain: Record<string, unknown>;

  @IsString()
  @IsOptional()
  challenge?: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsString()
  @IsOptional()
  jws?: string;

  @IsString()
  @IsOptional()
  nonce?: string;

  @IsString({ each: true })
  @IsOptional()
  requiredRevealStatements?: string[];
}

export class VerifiableCredentialDto extends CredentialWithStatusDto {
  @Type(() => VerifiableCredentialProofDto)
  @ValidateNested()
  @ApiProperty({ type: VerifiableCredentialProofDto })
  proof: VerifiableCredentialProofDto;
}
