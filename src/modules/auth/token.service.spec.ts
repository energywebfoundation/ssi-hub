import { Controller, Get, INestApplication, Injectable, InternalServerErrorException, MiddlewareConsumer, Module, Post, RequestMethod, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { NextFunction } from 'express-serve-static-core';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from './token.service';

// Mock token service class
@Injectable()
class TokenService {

    handleOriginCheck = async (req: Request, res: Response, next: NextFunction) => {
        let token = null;
        if (req.headers['authorization']) {
            token = req.headers['authorization'].replace('Bearer ', '');
        } else {
            token = req?.cookies?.token
        }

        if (token) {
            const decodedToken = jwt.decode(token) as TokenPayload;
            const isBrowserRequestFromAuthenticatedOrigin = decodedToken.origin === req.headers['origin']
            const isServerRequestOrGETFromSameDomain = req.headers['origin'] === undefined
            if (isBrowserRequestFromAuthenticatedOrigin || isServerRequestOrGETFromSameDomain) {
                next()
            } else {
                throw new InternalServerErrorException('Something went wrong');
            }
        } else {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}

// mock controller
@Controller()
class TestController {
    @Get('test')
    test() {
        return "RETURN_VALUE";
    }

    @Post('test')
    testPost() {
        return "RETURN_VALUE";
    }
}

// mock the middleware
@Module({ providers: [TokenService], exports: [TokenService] })
class TestModule {
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
};


describe('TokenService', () => {
    let app: INestApplication;
    
    const mockRequest = (method: string, origin: string = undefined, status: number = 200) => {
        const token = jwt.sign({
            origin: 'https://switchboard-dev.energyweb.org'
        }, 'testToken');
        
        const req = request(app.getHttpServer())
            [method]('/test')
            .set({ "Authorization": `Bearer ${token}` });
        
        if(origin) req.set({ "origin": origin });    
        return req.expect(status);
    }

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
        return mockRequest('post', 'https://hacked-website.com', 500);
    });

    it('should NOT have origin in request headers', async () => {
        return mockRequest('get');
    });
})