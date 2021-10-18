import { INestApplication, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

export function appConfig(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());
}
