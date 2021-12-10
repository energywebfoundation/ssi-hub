import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client, connect } from 'nats';
import { Logger } from '../logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NatsWrapper implements OnModuleDestroy {
  private _connection: Client;
  constructor(private readonly config: ConfigService, private logger: Logger) {
    this._connection = this.initializeConnection();
  }

  async onModuleDestroy() {
    this._connection.close();
  }

  public publish<T>(subject: string, data: T) {
    this._connection.publish(subject, JSON.stringify(data));
    this._connection.flush();
    this.logger.debug(`published nats message with "${subject}" subject`);
  }

  private initializeConnection(): Client {
    const NATS_CLIENTS_URL = this.config.get<string>('NATS_CLIENTS_URL');
    try {
      return connect(`nats://${NATS_CLIENTS_URL}`, {
        pingInterval: 5000,
        maxReconnectAttempts: -1,
        reconnectDelayHandler: () => {
          this.logger.log(`Reconnecting to NATS server...`);
          return 1000;
        },
      });
    } catch (err) {
      this.logger.error(err, NatsWrapper.name);
    }
  }
}
