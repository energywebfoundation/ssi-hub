import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const setupSwagger = (app: INestApplication, config: ConfigService) => {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Cache Server API documentation')
    .setVersion(readVersion());

  if (config.get<boolean>('ENABLE_AUTH')) {
    options.addBearerAuth();
  }

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, options.build())
  );
};

function readVersion(): string {
  let pkg;

  try {
    pkg = JSON.parse(
      readFileSync(resolve(__dirname, '../package.json')).toString('utf8')
    );
  } catch (err) {
    console.log(`error reading/parsing package.json: ${err}`);
    return '';
  }

  return pkg.version;
}
