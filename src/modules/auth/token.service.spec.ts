// import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
// import request from 'supertest';
import { AuthModule } from './auth.module';
import { LoginController } from './login.controller';
import { TokenService } from './token.service';

const MockJwtService = {
    decode: jest.fn().mockImplementation((originDomain: string) => {
        return {
            origin: originDomain,
        };
    }),
};

xdescribe('TokenService', () => {
    let tokenService: TokenService;
    // let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
            controllers: [LoginController],
            providers: [TokenService, {
                provide: JwtService,
                useValue: MockJwtService,
            },],
        }).compile();

        tokenService = module.get<TokenService>(TokenService);
        // app = module.createNestApplication();
        // await app.init();
    });

    // const testOrigin = async (method: string) => {
    //     const initReq = await request(app.getHttpServer())[method]('/*')
    //     const { origin } = MockJwtService.decode(initReq.headers['origin'])
    //     expect(initReq.headers['origin']).toBe(origin)
    // }

    it('should be defined', () => {
        expect(tokenService).toBeDefined();
    });

    // it('should have same GET request ORIGIN header as stored in JWT token ', async () => {
    //     testOrigin('get')
    // });

    // it('should have same POST request ORIGIN header as stored in JWT token ', async () => {
    //     testOrigin('post')
    // });
})