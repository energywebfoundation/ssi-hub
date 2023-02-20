import {
  IsArray,
  IsDateString,
  IsEthereumAddress,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { SiweMessage } from 'siwe';

export class VerifySiweDto {
  message: SiweMessageDto;

  signature: string;
}

export class SiweMessageDto extends SiweMessage {
  @IsUrl()
  domain: string;

  @IsEthereumAddress()
  address: string;

  @IsString()
  @IsOptional()
  statement?: string;

  @IsString()
  uri: string;

  @IsNumberString()
  version: string;

  @IsNumberString()
  chainId: number;

  @IsUUID()
  nonce: string;

  @IsDateString()
  issuedAt: string;

  @IsDateString()
  @IsOptional()
  expirationTime?: string;

  @IsDateString()
  @IsOptional()
  notBefore?: string;

  @IsString()
  @IsOptional()
  requestId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsUrl({}, { each: true })
  @IsOptional()
  resources?: Array<string>;
}
