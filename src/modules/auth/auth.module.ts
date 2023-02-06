import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { CookiesServices } from './cookies.service';
import { JwtAuthGuard } from './jwt.guard';
import { LoginController } from './login.controller';
import { LoginGuard } from './login.guard';
import { RefreshTokenRepository } from './refreshToken.repository';
import { TokenService } from './token.service';
import { RoleModule } from '../role/role.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthStrategy } from './login.strategy';
import { GqlAuthGuard } from './jwt.gql.guard';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../../jwt/config';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { STATUS_LIST_MODULE_PATH } from '../status-list/status-list.const';

@Global()
@Module({
  imports: [
    RoleModule,
    JwtModule.registerAsync({
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
  ],

  controllers: [LoginController],
  providers: [
    CookiesServices,
    ApplicationService,
    LoginGuard,
    JwtAuthGuard,
    RefreshTokenRepository,
    TokenService,
    JwtStrategy,
    AuthStrategy,
    GqlAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy, GqlAuthGuard],
})
export class AuthModule implements NestModule {
  constructor(private readonly tokenService: TokenService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) =>
        this.tokenService.checkAccessTokenOrigin(req, res, next)
      )
      .exclude(
        { path: '/v1/login', method: RequestMethod.ALL },
        { path: '/v1/refresh_token', method: RequestMethod.ALL },
        { path: '/v1/health/live', method: RequestMethod.GET },
        { path: '/v1/health/ready', method: RequestMethod.GET },
        { path: '/v1/health', method: RequestMethod.GET },
        { path: '/v1/auth/status', method: RequestMethod.GET },
        {
          path: `/v1/${STATUS_LIST_MODULE_PATH}/:credentialId`,
          method: RequestMethod.GET,
        }
      )
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
