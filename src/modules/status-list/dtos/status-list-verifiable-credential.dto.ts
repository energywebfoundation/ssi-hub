import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StatusListCredentialDto } from './status-list-credential.dto';
import { VerifiableCredentialProofDto } from './verifiable-credential.dto';

export class StatusListVerifiableCredentialDto extends StatusListCredentialDto {
  @Type(() => VerifiableCredentialProofDto)
  @ValidateNested()
  @ApiProperty({ type: VerifiableCredentialProofDto })
  proof: VerifiableCredentialProofDto;
}
