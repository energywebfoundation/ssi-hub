import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { corsConfig } from './cors.config';

export function appConfig(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  corsConfig(app);
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
