import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { BullHealthCheckIndicatorService } from './bull-health-check-indicator.service';
import { HealthCheckService } from './health-check.service';
import { TerminusModule } from '@nestjs/terminus';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TerminusModule,
    BullModule.registerQueue({
      name: 'dids',
    }),
    BullModule.registerQueue({
      name: 'claims',
    }),
  ],
  providers: [HealthCheckService, BullHealthCheckIndicatorService],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
