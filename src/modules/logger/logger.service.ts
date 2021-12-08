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
  constructor(
    configService: ConfigService,
    private readonly sentryService: SentryService,
    private readonly redactor: SyncRedactor = null,
  ) {
    super();
    const isProduction = configService.get<string>('NODE_ENV') === 'production';
    const logFormat = isProduction
      ? format.combine(format.timestamp(), format.json())
      : format.combine(
          format.timestamp(),
          format.printf(
            ({ level, message, timestamp, context }) =>
              `${level} [${context || ''}] : ${timestamp} - ${message}`,
          ),
          format.colorize(),
        );

    const file = new transports.DailyRotateFile({
      filename: 'iam-cache-server-%DATE%.log',
      zippedArchive: true,
      dirname: configService.get<string>('LOGS_DIRECTORY'),
      maxFiles: '14d',
    });

    this.redactor =
      this.redactor ||
      new SyncRedactor({
        customRedactors: {
          before: [
            {
              regexpPattern: /0x[a-f0-9\-]+/gi,
              replaceWith: '0x***',
            },
          ],
        },
      });

    const console = new transports.Console({ format: logFormat });

    const transport = isProduction ? file : console;

    this.logger = createLogger({
      format: logFormat,
      level: 'debug',
      transports: [transport],
    });
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  error(error: any, trace?: string, context: string = this.context) {
    this.sentryService.captureException(error);
    if (Array.isArray(error)) {
      this.logger.error(
        this.redactor.redact(
          error.map(err => JSON.stringify(err, null, 2)).join(', '),
        ),
      );
      return;
    }
    if (error instanceof Error) {
      const { message, stack, ...meta } = error;
      return this.logger.error(this.redactor.redact(message), {
        context,
        stack: [trace || stack],
        ...meta,
      });
    }
    if ('object' === typeof error) {
      const { message, ...meta } = error as { message: string };
      return this.logger.error(this.redactor.redact(message), {
        context,
        stack: [trace],
        ...meta,
      });
    }
    this.logger.error(this.redactor.redact(error), { context });
  }

  warn(message: any, context: string = this.context) {
    return this.logger.warn(this.redactor.redact(message), { context });
  }

  debug(message: any, context: string = this.context) {
    return this.logger.debug(this.redactor.redact(message), { context });
  }

  verbose(message: any, context: string = this.context) {
    return this.logger.verbose(this.redactor.redact(message), { context });
  }

  info(message: any, context: string = this.context) {
    return this.logger.info(this.redactor.redact(message), { context });
  }
}
