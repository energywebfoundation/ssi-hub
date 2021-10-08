import {
  Controller,
  Get,
  INestApplication,
  MiddlewareConsumer,
  Module,
  Post,
  RequestMethod,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from './refreshToken.repository';

// mock controller
@Controller()
class TestController {
  @Get('test')
  test() {
    return 'RETURN_VALUE';
  }

  @Post('test')
  testPost() {
    return 'RETURN_VALUE';
  }
}

// mock the middleware
@Module({
  providers: [
    TokenService,
    {
      provide: ConfigService,
      useValue: {},
    },
    {
      provide: JwtService,
      useValue: {},
    },
    {
      provide: RefreshTokenRepository,
      useValue: {},
    },
  ],
  exports: [TokenService],
})
class TestModule {
  constructor(private readonly tokenService: TokenService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) =>
        this.tokenService.handleOriginCheck(req, res, next),
      )
      .exclude(
        { path: '/login', method: RequestMethod.ALL },
        { path: '/refresh_token', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}

describe('TokenService', () => {
  let app: INestApplication;

  const mockRequest = (
    method: string,
    origin: string = undefined,
    status = 200,
  ) => {
    const token = jwt.sign(
      {
        origin: 'https://switchboard-dev.energyweb.org',
      },
      'testToken',
    );

    const req = request(app.getHttpServer())
      [method]('/test')
      .set({ Authorization: `Bearer ${token}` });

    if (origin) req.set({ origin: origin });
    return req.expect(status);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
      controllers: [TestController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should have same GET request ORIGIN header as stored in JWT token ', async () => {
    return mockRequest('get', 'https://switchboard-dev.energyweb.org');
  });

  it('should NOT have same POST request ORIGIN header as stored in JWT token ', async () => {
    return mockRequest('post', 'https://hacked-website.com', 401);
  });

  it('should NOT have origin in request headers', async () => {
    return mockRequest('get');
  });
});
