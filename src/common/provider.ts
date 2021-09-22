import { JsonRpcProvider } from '@ethersproject/providers';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Provider extends JsonRpcProvider {
  constructor(configService: ConfigService) {
    super(configService.get('ENS_URL'));
  }
}
