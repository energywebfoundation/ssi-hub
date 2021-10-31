import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class DIDContactDTO {
  @IsString()
  @ApiProperty()
  did: string;

  @IsString()
  @ApiProperty()
  label: string;
}

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
