import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
  constructor(private readonly tokenService: TokenService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => this.tokenService.handleOriginCheck(req, res, next))
      .exclude(
        { path: '/login', method: RequestMethod.ALL },
        { path: '/refresh_token', method: RequestMethod.ALL }
      )
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
