import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusListVerifiableCredentialDto } from './status-list-verifiable-credential.dto';

export class SignRevokeOptionsDto {}

export class SignRevokeInputDto {
  @Type(() => StatusListVerifiableCredentialDto)
  @ValidateNested()
  @ApiProperty({ type: StatusListVerifiableCredentialDto })
  statusListCredential: StatusListVerifiableCredentialDto;

  @IsOptional()
  @Type(() => SignRevokeOptionsDto)
  @ValidateNested()
  @ApiProperty({ type: SignRevokeOptionsDto, required: false })
  options?: SignRevokeOptionsDto;
}
