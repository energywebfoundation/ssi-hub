import {
  Injectable,
  Logger as NestLogger,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { SyncRedactor } from 'redact-pii';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';
import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
import { SentryService } from '../sentry/sentry.service';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger implements LoggerService {
  public readonly logger: WinstonLogger;
  private readonly redactor: SyncRedactor;
  constructor(
    configService: ConfigService,
    private readonly sentryService: SentryService,
  ) {
    super();
    this.redactor = new SyncRedactor({
      customRedactors: {
        before: [
          {
            regexpPattern: /(?<=0x[a-f0-9\-]{3})[a-f0-9\-]+/gi,
            replaceWith: '***',
          },
        ],
      },
    });

    const logFormat = format.combine(
      format.timestamp(),
      format.printf(
        ({ level, message, timestamp, context }) =>
          `${level} [${context || ''}] : ${timestamp} - ${this.redactor.redact(
            message,
          )}`,
      ),
      format.colorize(),
    );

    const console = new transports.Console({ format: logFormat });

    this.logger = createLogger({
      format: logFormat,
      level: 'debug',
      transports: [console],
    });
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  error(error: any, trace?: string, context: string = this.context) {
    this.sentryService.captureException(error);
    if (Array.isArray(error)) {
      this.logger.error(
        error.map(err => JSON.stringify(err, null, 2)).join(', '),
      );
      return;
    }
    if (error instanceof Error) {
      const { message, stack, ...meta } = error;
      return this.logger.error(message, {
        context,
        stack: [trace || stack],
        ...meta,
      });
    }
    if ('object' === typeof error) {
      const { message, ...meta } = error as { message: string };
      return this.logger.error(message, {
        context,
        stack: [trace],
        ...meta,
      });
    }
    this.logger.error(error, { context });
  }

  warn(message: any, context: string = this.context) {
    return this.logger.warn(message, { context });
  }

  debug(message: any, context: string = this.context) {
    return this.logger.debug(message, { context });
  }

  verbose(message: any, context: string = this.context) {
    return this.logger.verbose(message, { context });
  }

  info(message: any, context: string = this.context) {
    return this.logger.info(message, { context });
  }
}
