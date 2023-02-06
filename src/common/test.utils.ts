import {
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isURL } from 'class-validator';
import cookieParser from 'cookie-parser';

export function appConfig(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

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

export const MockJWTAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      did: 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
    };
    return true;
  },
};
