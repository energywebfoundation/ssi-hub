import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsMimeType,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

// https://identity.foundation/decentralized-web-node/spec/#write
export class CollectionsWriteDescriptorDto {
  static methodValue = 'CollectionsWrite' as const;

  @IsString()
  @IsDefined()
  @IsEnum(['CollectionsWrite'])
  @ApiProperty({ type: String, enum: ['CollectionsWrite'] })
  method: typeof CollectionsWriteDescriptorDto.methodValue;

  @ApiProperty()
  @IsUUID()
  objectId: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  schema?: string;

  @ApiProperty()
  @IsNumber()
  dateCreated: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  datePublished?: number;

  @ApiProperty()
  @IsOptional()
  @IsMimeType()
  dataFormat?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cid?: string;
}
