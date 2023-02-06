import request from 'supertest';
import waitForExpect from 'wait-for-expect';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';
import { ConfigService } from '@nestjs/config';

export const authLoginTestSuite = () => {
  describe('Login (version: 1)', () => {
    let consoleLogSpy: jest.SpyInstance;
    let provider: providers.Provider;
    let wallet: Wallet;
    let allowedOrigins: string[];
    const notAllowedOrigin = 'http://not-allowed.com';

    beforeAll(async () => {
      consoleLogSpy = jest.spyOn(global.console, 'log');

      provider = new providers.JsonRpcProvider(process.env.ENS_URL);
      wallet = Wallet.createRandom().connect(provider);
      allowedOrigins = app.get(ConfigService).get('ALLOWED_ORIGINS').split(',');
    });

    it(`should throw 401 error when user not logged in`, () => {
      return request(app.getHttpServer())
        .get('/v1/search/test')
        .expect(401)
        .expect(function (res) {
          expect(res.text).toContain('Access token was not set');
        });
    });

    describe('Request without origin', () => {
      it(`should authorize, if origin matches origin of token`, async () => {
        const identityToken = await getIdentityToken(provider, wallet);

        const loginResponse = await request(app.getHttpServer())
          .post('/v1/login')
          .send({
            identityToken,
          })
          .expect(201);

        expect(loginResponse.headers['set-cookie']).toHaveLength(2);
        expect(loginResponse.headers['set-cookie']).toEqual(
          expect.arrayContaining([
            expect.stringMatching(
              /(?:token|refreshToken)=.+\..+\..+; Path=\/; HttpOnly; Secure; SameSite=None/
            ),
          ])
        );
        expect(loginResponse.headers['set-cookie'][0]).toContain(
          loginResponse.body.token
        );
        expect(loginResponse.headers['set-cookie'][1]).toContain(
          loginResponse.body.refreshToken
        );
        return request(app.getHttpServer())
          .get('/v1/search/test')
          .set('Cookie', [
            loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
            loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
          ])
          .expect(200);
      });

      it(`should not authorize, if origin does not matches origin of token`, async () => {
        const identityToken = await getIdentityToken(provider, wallet);

        const loginResponse = await request(app.getHttpServer())
          .post('/v1/login')
          .send({
            identityToken,
          })
          .expect(201);

        expect(loginResponse.headers['set-cookie']).toHaveLength(2);
        expect(loginResponse.headers['set-cookie']).toEqual(
          expect.arrayContaining([
            expect.stringMatching(
              /(?:token|refreshToken)=.+\..+\..+; Path=\/; HttpOnly; Secure; SameSite=None/
            ),
          ])
        );
        expect(loginResponse.headers['set-cookie'][0]).toContain(
          loginResponse.body.token
        );
        expect(loginResponse.headers['set-cookie'][1]).toContain(
          loginResponse.body.refreshToken
        );
        return request(app.getHttpServer())
          .get('/v1/search/test')
          .set('Cookie', [
            loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
            loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
          ])
          .set('Origin', allowedOrigins[0])
          .expect(401)
          .expect(function (res) {
            expect(res.text).toContain(
              `Token origin undefined does not matches request origin ${allowedOrigins[0]}`
            );
          });
      });
    });

    describe('Request with origin', () => {
      it('should not authorize user if request origin does not matches origin of token', async () => {
        const identityToken = await getIdentityToken(provider, wallet);

        const loginResponse = await request(app.getHttpServer())
          .post('/v1/login')
          .set('Origin', allowedOrigins[0])
          .send({
            identityToken,
          })
          .expect(201);

        return request(app.getHttpServer())
          .get('/v1/search/test')
          .set('Origin', allowedOrigins[1])
          .set('Cookie', [
            loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
            loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
          ])
          .expect(401)
          .expect(function (res) {
            expect(res.text).toContain(
              `Token origin ${allowedOrigins[0]} does not matches request origin ${allowedOrigins[1]}`
            );
          });
      });

      it('should not login from not allowed origin', async () => {
        const identityToken = await getIdentityToken(provider, wallet);
        await request(app.getHttpServer())
          .post('/v1/login')
          .set('origin', notAllowedOrigin)
          .send({
            identityToken,
          })
          .expect(401)
          .expect(function (res) {
            expect(res.text).toContain(
              `Origin ${notAllowedOrigin} is not allowed`
            );
          });
      });

      it('should login from allowed origin', async () => {
        const identityToken = await getIdentityToken(provider, wallet);
        await request(app.getHttpServer())
          .post('/v1/login')
          .set('origin', allowedOrigins[0])
          .send({
            identityToken,
          })
          .expect(201);
      });
    });

    it('passport-did-auth should be able to login', async () => {
      await waitForExpect(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'DID Login Strategy is now logged into cache server'
          )
        );
      }, 400000);
    });
  });
};
