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

const MockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'ENABLE_AUTH') {
      return 'true';
    }
    return null;
  }),
};

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
      useValue: MockConfigService,
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
        this.tokenService.checkAccessTokenOrigin(req, res, next)
      )
      .exclude(
        { path: '/login', method: RequestMethod.ALL },
        { path: '/refresh_token', method: RequestMethod.ALL }
      )
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}

describe('TokenService', () => {
  let app: INestApplication;

  const mockRequest = (
    method: string,
    origin: string = undefined,
    status = 200
  ) => {
    const token = jwt.sign(
      {
        origin: 'https://switchboard-dev.energyweb.org',
      },
      'testToken'
    );

    const req = request(app.getHttpServer())
      [method]('/test')
      .set({ Authorization: `Bearer ${token}` });

    if (origin) req.set({ origin });
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

  it('should authorize if token origin matches request origin', async () => {
    return mockRequest('get', 'https://switchboard-dev.energyweb.org');
  });

  it('should not authorize if token origin does not matches request origin ', async () => {
    return mockRequest('post', 'https://hacked-website.com', 401);
  });

  it('should authorize when login origin is set and request origin is not', async () => {
    return mockRequest('get');
  });

  it('should pass auth check if ENABLE_AUTH is disabled', async () => {
    MockConfigService.get = jest.fn().mockImplementationOnce((key: string) => {
      if (key === 'ENABLE_AUTH') {
        return 'false';
      }
      return null;
    });
    request(app.getHttpServer()).get(`test`).expect(200);
  });
});
