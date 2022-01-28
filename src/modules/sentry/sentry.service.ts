import {
  ForbiddenException,
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Application } from 'express';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import * as SentryTracing from '@sentry/tracing';
import { Client, Options } from '@sentry/types';

@Injectable()
export class SentryService implements OnModuleDestroy, OnApplicationShutdown {
  private sentryEnabled = false;

  constructor(protected readonly configService: ConfigService) {}

  async onApplicationShutdown(): Promise<void> {
    await this.drain();
  }

  async onModuleDestroy(): Promise<void> {
    await this.drain();
  }

  getSentry() {
    return Sentry;
  }

  init(app: Application) {
    const dsn = this.configService.get<string>('SENTRY_DNS');

    if (!dsn) {
      return;
    }

    this.sentryEnabled = true;

    const [env, release] = [
      this.configService.get<string>('SENTRY_ENV'),
      this.configService.get<string>('SENTRY_RELEASE'),
    ];

    Sentry.init({
      dsn: dsn,
      environment: env,
      release: release,
      tracesSampleRate: this.configService.get<number>(
        'SENTRY_TRACES_SAMPLE_RATE',
        1
      ),
      tracesSampler: (samplingContext) => {
        if (
          samplingContext.transactionContext.name.startsWith('GET /v1/health')
        ) {
          // Drop this transaction, by setting its sample rate to 0%
          return 0;
        } else {
          // Default sample rate for all others (replaces tracesSampleRate)
          return 0.2;
        }
      },
      integrations: [
        new RewriteFrames({
          root: global.__rootdir__,
        }),
        new Sentry.Integrations.Http({ tracing: true }),
        new SentryTracing.Integrations.Express({
          app,
        }),
        new Sentry.Integrations.OnUncaughtException({
          onFatalError: async (err) => {
            if (this.shouldSkipException(err)) {
              return;
            }

            (
              Sentry.getCurrentHub().getClient<
                Client<Options>
              >() as Client<Options>
            ).captureException(err);
          },
        }),
        new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' }),
      ],
      beforeSend(event) {
        const request = event.request;
        if (request) {
          delete request.cookies;
          delete request.data?.identityToken;
          request.url.replace(/refresh_token=.*/, 'refresh_token=[Filtered]');
          const headers = request.headers;
          if (headers) {
            delete headers['Authorization'];
            delete headers.cookie;
          }
        }
        return event;
      },
    });
  }

  captureException(error: Error | string) {
    this.sentryEnabled && Sentry.captureException(error);
  }

  captureMessage(message: string) {
    this.sentryEnabled && Sentry.captureMessage(message);
  }

  private shouldSkipException(error: Error) {
    const errorNames: string[] = [ForbiddenException.name, 'SentryError'];

    return errorNames.includes(error.name);
  }

  private async drain(): Promise<void> {
    await Sentry.close(
      this.configService.get<number>('SENTRY_DRAIN_TIMEOUT', 2000)
    );
  }
}
