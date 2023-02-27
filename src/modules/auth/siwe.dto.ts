import { IsString } from 'class-validator';

export class SiweReqPayloadDTO {
  @IsString()
  message: string;

  @IsString()
  signature: string;
}
