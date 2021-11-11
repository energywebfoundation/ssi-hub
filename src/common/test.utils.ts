import {
  ExecutionContext,
  INestApplication,
  VersioningType,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';

export function appConfig(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // add cookie parser to read jwt token cookie
  app.use(cookieParser());
}

export const MockJWTAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      did: 'did:ethr:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
    };
    return true;
  },
};
