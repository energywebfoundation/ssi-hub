import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VerifiableCredential } from '@ew-did-registry/credentials-interface';
import {
  StatusListCredentialDto,
  StatusListCredentialSubjectDto,
} from './status-list-credential.dto';
import { VerifiableCredentialProofDto } from './verifiable-credential.dto';

export class StatusListVerifiableCredentialDto
  extends StatusListCredentialDto
  implements VerifiableCredential<StatusListCredentialSubjectDto>
{
  @Type(() => VerifiableCredentialProofDto)
  @ValidateNested()
  @ApiProperty({ type: VerifiableCredentialProofDto })
  proof: VerifiableCredentialProofDto;
}
