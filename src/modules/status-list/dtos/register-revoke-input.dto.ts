import { Type } from 'class-transformer';
import {
  IsDefined,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VerifiableCredentialDto } from './verifiable-credential.dto';

export class RegisterRevokeOptionsDto {}

export class RegisterRevokeInputDto {
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => VerifiableCredentialDto)
  @ApiProperty({ type: VerifiableCredentialDto })
  verifiableCredential: VerifiableCredentialDto;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested()
  @Type(() => RegisterRevokeOptionsDto)
  @ApiProperty({ type: RegisterRevokeOptionsDto, required: false })
  options?: RegisterRevokeOptionsDto;
}
