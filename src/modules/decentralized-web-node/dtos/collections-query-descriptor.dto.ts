import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsMimeType,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export type DataSort =
  | 'createdAscending'
  | 'createdDescending'
  | 'publishedAscending'
  | 'publishedDescending';

// https://identity.foundation/decentralized-web-node/spec/#query
export class CollectionsQueryDescriptorDto {
  static methodValue = 'CollectionsQuery' as const;

  @IsString()
  @IsDefined()
  @IsEnum(['CollectionsQuery'])
  @ApiProperty({ type: String, enum: ['CollectionsQuery'] })
  method: typeof CollectionsQueryDescriptorDto.methodValue;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  objectId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  schema?: string;

  @ApiProperty()
  @IsOptional()
  @IsMimeType()
  dataFormat?: string;

  @ApiProperty({
    enum: [
      'createdAscending',
      'createdDescending',
      'publishedAscending',
      'publishedDescending',
    ],
  })
  @IsOptional()
  @IsString()
  @IsEnum([
    'createdAscending',
    'createdDescending',
    'publishedAscending',
    'publishedDescending',
  ])
  dateSort?: DataSort;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cid?: string;
}
