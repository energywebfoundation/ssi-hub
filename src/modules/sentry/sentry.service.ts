import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Client, Options } from '@sentry/types';

@Injectable()
export class SentryService {
  private readonly sentryEnabled: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const SENTRY_DNS = this.configService.get<string>('SENTRY_DNS');

    if (!SENTRY_DNS) {
      return;
    }

    this.sentryEnabled = true;

    Sentry.init({
      dsn: SENTRY_DNS,
      environment: this.configService.get<string>('SENTRY_ENV'),
      release: this.configService.get<string>('SENTRY_RELEASE'),
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

  getSentry() {
    return this.sentryEnabled ? Sentry : null;
  }
}
