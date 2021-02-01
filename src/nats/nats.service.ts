import { Injectable } from '@nestjs/common';
import { Client, connect } from 'nats';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NatsService {
  public connection: Client;
  constructor(private config: ConfigService) {
    const NATS_CLIENTS_URL = this.config.get<string>('NATS_CLIENTS_URL');
    this.connection = connect(`nats://${NATS_CLIENTS_URL}`);
  }
}
