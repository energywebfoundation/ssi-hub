import {
  IsNumberString,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CredentialDto } from './credential.dto';

export class StatusList2021EntryDto {
  @IsString()
  @IsUrl({ require_tld: false })
  id: string;

  @IsString()
  @ApiProperty({ enum: ['StatusList2021Entry'] })
  type: string;

  @IsString()
  @ApiProperty({ enum: ['revocation', 'suspension'] })
  statusPurpose: string;

  @IsNumberString()
  @ApiProperty()
  statusListIndex: string;

  @IsUrl({ require_tld: false })
  @ApiProperty()
  statusListCredential: string;
}

export class CredentialWithStatusDto extends CredentialDto {
  @Type(() => StatusList2021EntryDto)
  @ValidateNested()
  @ApiProperty({ type: StatusList2021EntryDto })
  credentialStatus: StatusList2021EntryDto;
}
