import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ResponseReplyDto } from './response-reply.dto';
import { ResponseStatusDto } from './response-status.dto';

// https://identity.foundation/decentralized-web-node/spec/#response-objects
export class ResponseObjectDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  requestId: string;

  @ApiProperty({ type: ResponseStatusDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ResponseStatusDto)
  status?: ResponseStatusDto;

  @ApiProperty({ type: [ResponseReplyDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResponseReplyDto)
  replies?: ResponseReplyDto[];
}
