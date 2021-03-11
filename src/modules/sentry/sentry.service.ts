import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Client, Options } from '@sentry/types';

@Injectable()
export class SentryService {
  private readonly sentryEnabled: boolean = false;
  constructor(configService: ConfigService) {
    const SENTRY_DNS = configService.get<string>('SENTRY_DNS');
    if (SENTRY_DNS) {
      this.sentryEnabled = true;
    }
    this.sentryEnabled &&
      Sentry.init({
        dsn: SENTRY_DNS,
        environment: configService.get<string>('SENTRY_ENV'),
        release: configService.get<string>('SENTRY_RELEASE'),
        integrations: [
          new RewriteFrames({
            root: global.__rootdir__,
          }),
          new Sentry.Integrations.OnUncaughtException({
            onFatalError: async err => {
              if (err.name === 'SentryError') {
                return console.log(err);
              }
              (Sentry.getCurrentHub().getClient<Client<Options>>() as Client<
                Options
              >).captureException(err);
              process.exit(1);
            },
          }),
          new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' }),
        ],
      });
  }

  captureException(error: Error | string) {
    this.sentryEnabled && Sentry.captureException(error);
  }

  captureMessage(message: string) {
    this.sentryEnabled && Sentry.captureMessage(message);
  }

  getSentry() {
    return this.sentryEnabled ? Sentry : null;
  }
}
