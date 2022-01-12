import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryService } from './sentry.service';
import { SentryTracingService } from './sentry-tracing.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SentryService, SentryTracingService],
  exports: [SentryService, SentryTracingService],
})
export class SentryModule {}
