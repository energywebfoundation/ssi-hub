import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DIDContactDTO {
  @IsString()
  @ApiProperty()
  did: string;

  @IsString()
  @ApiProperty()
  label: string;
}
