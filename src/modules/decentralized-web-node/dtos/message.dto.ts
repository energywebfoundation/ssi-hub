import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CollectionsQueryDescriptorDto } from './collections-query-descriptor.dto';
import { CollectionsWriteDescriptorDto } from './collections-write-descriptor.dto';

// https://identity.foundation/decentralized-web-node/spec/#messages
export class MessageDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsBase64()
  data?: string;

  @ApiProperty({
    discriminator: {
      propertyName: 'method',
      mapping: {
        CollectionsQuery: 'CollectionsQueryDescriptorDto',
        CollectionsWrite: 'CollectionsWriteDescriptorDto',
      },
    },
  })
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CollectionsQueryDescriptorDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'method',
      subTypes: [
        {
          value: CollectionsQueryDescriptorDto,
          name: CollectionsQueryDescriptorDto.methodValue,
        },
        {
          value: CollectionsWriteDescriptorDto,
          name: CollectionsWriteDescriptorDto.methodValue,
        },
      ],
    },
  })
  descriptor: CollectionsQueryDescriptorDto | CollectionsWriteDescriptorDto;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  attestation?: unknown; // TODO

  @ApiProperty()
  @IsObject()
  @IsOptional()
  authorization?: unknown; // TODO
}
