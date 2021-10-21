import { Injectable } from '@nestjs/common';
import {
  HealthCheckService as TerminusHealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { BullHealthCheckIndicatorService } from './bull-health-check-indicator.service';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly terminusHealthCheckService: TerminusHealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly redisHealthCheckIndicatorService: BullHealthCheckIndicatorService,
  ) {}

  async checkLiveness() {
    return this.terminusHealthCheckService.check([
      () => this.db.pingCheck('postgres'),
      () => this.redisHealthCheckIndicatorService.check('bull'),
    ]);
  }

  async checkReadiness() {
    return this.terminusHealthCheckService.check([]);
  }
}
