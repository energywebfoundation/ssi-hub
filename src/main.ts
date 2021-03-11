import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';

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
  app.useGlobalPipes(new ValidationPipe());

  // add security middleware
  app.use(helmet());

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

  const configService = app.get(ConfigService);

  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
