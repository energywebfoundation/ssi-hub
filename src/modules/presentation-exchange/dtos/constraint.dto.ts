import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FieldDto } from './field.dto';

export class ConstraintDto {
  @ApiProperty({ type: [FieldDto], required: false })
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => FieldDto)
  fields?: FieldDto[];

  @ApiProperty({ enum: ['required', 'preferred'] })
  @IsOptional()
  @IsString()
  @IsEnum(['required', 'preferred'])
  limit_disclosure?: 'required' | 'preferred';
}
