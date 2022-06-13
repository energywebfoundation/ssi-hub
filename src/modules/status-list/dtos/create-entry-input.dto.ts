import { Type } from 'class-transformer';
import {
  IsDefined,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CredentialDto } from './credential.dto';

export class CreateEntryOptionsDto {}

export class CreateEntryInputDto {
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => CredentialDto)
  @ApiProperty({ type: CredentialDto })
  credential: CredentialDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateEntryOptionsDto)
  @ApiProperty({ type: CreateEntryOptionsDto, required: false })
  options?: CreateEntryOptionsDto;
}
