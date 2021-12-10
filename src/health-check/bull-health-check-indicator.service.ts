import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BullHealthCheckIndicatorService extends HealthIndicator {
  constructor(
    @InjectQueue('claims')
    private readonly claimQueue: Queue<string>,
    @InjectQueue('dids')
    private readonly didQueue: Queue<string>,
  ) {
    super();
  }

  async check(key: string): Promise<HealthIndicatorResult> {
    const redisClients = [...this.claimQueue.clients, ...this.didQueue.clients];

    const isHealthy = true;

    try {
      for (const client of redisClients) {
        await client.ping();
      }
    } catch (e) {
      throw new HealthCheckError(e.message, this.getStatus(key, false));
    }

    return this.getStatus(key, isHealthy);
  }
}
