import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { MessageDto } from './message.dto';

// https://identity.foundation/decentralized-web-node/spec/#request-object
export class RequestObjectDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  requestId: string;

  @ApiProperty()
  @IsString()
  target: string;

  @ApiProperty({ type: [MessageDto] })
  @IsArray()
  messages: MessageDto[];
}
