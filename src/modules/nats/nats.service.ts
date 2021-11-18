import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client, connect } from 'nats';
import { ConfigService } from '@nestjs/config';
import { Logger } from '../logger/logger.service';

@Injectable()
export class NatsService implements OnModuleDestroy {
  public connection: Client;
  constructor(private config: ConfigService, private readonly logger: Logger) {
    const NATS_CLIENTS_URL = this.config.get<string>('NATS_CLIENTS_URL');
    try {
      this.connection = connect(`nats://${NATS_CLIENTS_URL}`, {
        pingInterval: 5000,
        maxReconnectAttempts: -1,
        reconnectDelayHandler: () => {
          this.logger.log(`Reconnecting to NATS server...`);
          return 1000;
        },
      });
    } catch (err) {
      this.logger.error(err, NatsService.name);
    }
  }

  async onModuleDestroy() {
    this.connection.close();
  }
}
