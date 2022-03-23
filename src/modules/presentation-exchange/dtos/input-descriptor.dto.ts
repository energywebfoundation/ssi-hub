import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConstraintDto } from './constraint.dto';

// https://identity.foundation/presentation-exchange/#input-descriptor-object
export class InputDescriptorDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  purpose?: string;

  @ApiProperty()
  @IsOptional()
  format?: unknown;

  @ApiProperty({ type: ConstraintDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ConstraintDto)
  constraints?: ConstraintDto;
}
