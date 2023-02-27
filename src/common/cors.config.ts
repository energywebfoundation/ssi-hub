import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isURL } from 'class-validator';

export function corsConfig(app: INestApplication) {
  const configService = app.get(ConfigService);
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
}
