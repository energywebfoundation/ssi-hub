import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Handlers } from '@sentry/node';
import { tap } from 'rxjs/operators';
import { SentryService } from '../sentry/sentry.service';

@Injectable()
export class SentryErrorInterceptor implements NestInterceptor {
  constructor(private readonly sentryService: SentryService) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap({
        error: (exception) => {
          const { withScope, captureException } =
            this.sentryService.getSentry() || {};

          if (!withScope || !captureException) return;

          withScope((scope) => {
            const data = Handlers.parseRequest(
              {},
              context.switchToHttp().getRequest(),
              {}
            );

            scope.setExtra('req', data.request);

            if (data.extra) scope.setExtras(data.extra);
            if (data.user) scope.setUser(data.user);

            this.sentryService.captureException(exception);
          });
        },
      })
    );
  }
}
