import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthCheckService } from './health-check.service';

@Controller({ path: 'health', version: '1' })
export class HealthCheckController {
  constructor(protected readonly healthCheckService: HealthCheckService) {}

  @Get('ready')
  @HealthCheck()
  checkReadiness() {
    return this.healthCheckService.checkReadiness();
  }

  @HealthCheck()
  @Get('live')
  checkLiveness() {
    return this.healthCheckService.checkLiveness();
  }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.checkReadiness();
  }
}
