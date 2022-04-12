import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ResponseStatusDto {
  @ApiProperty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
