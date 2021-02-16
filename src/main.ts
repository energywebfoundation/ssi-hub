import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());

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
