import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication, config: ConfigService) => {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Cache Server API documentation')
    .setVersion('1.0');

  if (config.get<boolean>('ENABLE_AUTH')) {
    options.addBearerAuth();
  }

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, options.build())
  );
};
