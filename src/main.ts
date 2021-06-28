import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { Request } from 'express';
const Tokens = require('csrf')
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

  app.use((req,res,next) => {
    if(!req.cookies['csrf-token']){
      const tokens = new Tokens({cookie: true})
      res.cookie('csrf-token', tokens.create(tokens.secretSync()));
    }
    next();
  })

  const builtOptions = options.build();
  
  const documentCustom = SwaggerModule.createDocument(app, builtOptions);
  SwaggerModule.setup('api', app, documentCustom, {
    swaggerOptions: {
      requestInterceptor: (req: Request) => {
        req.headers['csrf-token'] = document.cookie?.split(';')[1]?.split('=')[1]
        return req
      }
    }
  });

  app.enableCors({ credentials: true, origin: true });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
