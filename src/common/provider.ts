import { providers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Provider extends providers.JsonRpcProvider {
  constructor(configService: ConfigService) {
    super(configService.get('ENS_URL'));
  }
}
