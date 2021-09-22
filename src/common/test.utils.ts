import { INestApplication, VersioningType } from '@nestjs/common';

export function appConfig(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
