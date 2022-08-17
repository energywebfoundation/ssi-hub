import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusListVerifiableCredentialDto } from './status-list-verifiable-credential.dto';

export class FinalizeUpdateOptionsDto {}

export class FinalizeUpdateInputDto {
  @Type(() => StatusListVerifiableCredentialDto)
  @ValidateNested()
  @ApiProperty({ type: StatusListVerifiableCredentialDto })
  statusListCredential: StatusListVerifiableCredentialDto;

  @IsOptional()
  @Type(() => FinalizeUpdateOptionsDto)
  @ValidateNested()
  @ApiProperty({ type: FinalizeUpdateOptionsDto, required: false })
  options?: FinalizeUpdateOptionsDto;
}
