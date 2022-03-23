import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilterDto } from './filter.dto';

export class FieldDto {
  @ApiProperty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  path: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  purpose?: string;

  @ApiProperty({ type: FilterDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => FilterDto)
  filter?: FilterDto;
}
