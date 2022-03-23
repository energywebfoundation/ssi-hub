import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { InputDescriptorDto } from './input-descriptor.dto';

// https://identity.foundation/presentation-exchange/#presentation-definition
export class PresentationDefinitionDto {
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

  @ApiProperty({ type: [InputDescriptorDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InputDescriptorDto)
  input_descriptors: InputDescriptorDto[];
}
