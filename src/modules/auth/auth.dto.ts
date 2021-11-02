import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class RequestUserDTO {
  @IsString()
  @ApiProperty()
  did: string;

  @IsArray({ each: true })
  @ApiProperty()
  verifiedRole: verifiedRoleDTO[];
}

export class verifiedRoleDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  namespace: string;
}
