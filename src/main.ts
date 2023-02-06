import { config as loadEnvVars } from 'dotenv';
loadEnvVars(); // this is required by the Auth decorator depending on process.env.ENABLE_AUTH

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  UnauthorizedException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { SentryService } from './modules/sentry/sentry.service';
import * as SentryNode from '@sentry/node';
import { isURL } from 'class-validator';

// This allows TypeScript to detect our global value and properly assign maps for sentry
// See more here: https://docs.sentry.io/platforms/node/typescript/
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = process.cwd();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const sentryService = new SentryService(configService);

  sentryService.init(app.getHttpAdapter().getInstance());

  app.use(SentryNode.Handlers.requestHandler());
  app.use(SentryNode.Handlers.tracingHandler());

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());

  // add security middleware
  app.use(
    helmet({
      /// https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
      contentSecurityPolicy: false,
    })
  );

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());

  // add compression for the API responses
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Cache Server API documentation')
    .setVersion('1.0');

  if (process.env.ENABLE_AUTH === 'true') {
    options.addBearerAuth();
  }

  const builtOptions = options.build();

  const document = SwaggerModule.createDocument(app, builtOptions);
  SwaggerModule.setup('api', app, document);

  const allowedOrigins = configService.get('ALLOWED_ORIGINS').split(',');
  for (const origin of allowedOrigins) {
    if (!isURL(origin)) {
      throw new Error(`Origin ${origin} is not a valid URL`);
    }
  }
  const restrictCorsOrigins = configService.get<boolean>(
    'RESTRICT_CORS_ORIGINS'
  );
  app.enableCors({
    credentials: true,
    origin: restrictCorsOrigins
      ? function (origin, callback) {
          if (origin) {
            if (allowedOrigins.includes(origin)) {
              callback(undefined, origin);
            } else {
              callback(
                new UnauthorizedException(`Origin ${origin} is not allowed`),
                false
              );
            }
          } else {
            callback(undefined, true);
          }
        }
      : true,
  });

  app.use(SentryNode.Handlers.errorHandler());
  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
