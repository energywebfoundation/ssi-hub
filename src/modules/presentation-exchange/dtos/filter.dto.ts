import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ArrayUnique,
} from 'class-validator';

// https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6
export class FilterDto {
  @ApiProperty({
    enum: ['null', 'boolean', 'object', 'array', 'number', 'string'],
  })
  @IsString()
  @IsEnum(['null', 'boolean', 'object', 'array', 'number', 'string'])
  type: 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string';

  // Common filters
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  enum?: unknown[];

  @ApiProperty({
    description: 'Property must have a type specified in the `type` property',
  })
  @IsOptional()
  const?: unknown;

  // Number filters
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(1)
  multipleOf?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maximum?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  exclusiveMaximum?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  minimum?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  exclusiveMinimum?: number;

  // string
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  minLength?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxLength?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pattern?: string;

  // array
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxItems?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  minItems?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  uniqueItems?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxContains?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  minContains?: number;

  // object
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxProperties?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  minProperties?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  required?: string[];

  @ApiProperty({ type: Object })
  @IsOptional()
  @IsObject()
  dependentRequired?: Record<string, string[]>;
}
