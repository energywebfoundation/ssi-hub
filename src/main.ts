import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { SentryService } from './modules/sentry/sentry.service';
import * as SentryNode from '@sentry/node';

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
    }),
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

  app.enableCors({ credentials: true, origin: true });

  app.use(SentryNode.Handlers.errorHandler());
  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
