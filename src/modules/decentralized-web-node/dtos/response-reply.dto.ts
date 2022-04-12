import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ResponseStatusDto } from './response-status.dto';

export class ResponseReplyDto {
  @ApiProperty()
  @IsString()
  messageId: string;

  @ApiProperty({ type: ResponseStatusDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ResponseStatusDto)
  status?: ResponseStatusDto;

  @ApiProperty()
  @IsOptional()
  entries?: unknown;
}
