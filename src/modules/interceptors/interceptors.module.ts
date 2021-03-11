import { Module } from '@nestjs/common';
import { SentryModule } from '../sentry/sentry.module';
import { NotFoundInterceptor } from './not-found.interceptor';
import { SentryErrorInterceptor } from './sentry-error-interceptor';

@Module({
  imports: [SentryModule],
  providers: [NotFoundInterceptor, SentryErrorInterceptor],
  exports: [NotFoundInterceptor],
})
export class InterceptorsModule {}
