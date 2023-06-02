import request from 'supertest';
import waitForExpect from 'wait-for-expect';
import { Wallet, providers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';
import { SiweMessage } from 'siwe';
import { loginWithSiwe, origin, signSiweMessage } from './utils';

export const authLoginTestSuite = () => {
  let consoleLogSpy: jest.SpyInstance;
  let provider: providers.Provider;
  let wallet: Wallet;

  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    provider = new providers.JsonRpcProvider(process.env.ENS_URL);
    wallet = Wallet.createRandom().connect(provider);
  });

  describe('Login with block number', () => {
    let provider: providers.Provider;
    let wallet: Wallet;
    let allowedOrigins: string[];
    const notAllowedOrigin = 'http://not-allowed.com';

    beforeAll(async () => {
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

    describe('Authenticate without specifying origin', () => {
      let loginResponse: request.Response;

      beforeEach(async () => {
        const identityToken = await getIdentityToken(provider, wallet);

        loginResponse = await request(app.getHttpServer())
          .post('/v1/login')
          .send({
            identityToken,
          })
          .expect(201);
      });

      it(`if request has no origin then /search/text should respond with 200 status code`, async () => {
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

      it(`if request has origin then /search/text should respond with 401 status code`, async () => {
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

    describe('Authenticate with specifying origin', () => {
      describe('Request origin is restricted', () => {
        it('if origin is allowed then /login should respond with 201 status code', async () => {
          const identityToken = await getIdentityToken(provider, wallet);
          await request(app.getHttpServer())
            .post('/v1/login')
            .set('origin', allowedOrigins[0])
            .send({
              identityToken,
            })
            .expect(201);
        });

        it('if origin is not allowed then /login should respond with 401 status code', async () => {
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

        it('if request origin does not match access token origin then /search/text should respond with 401 status code', async () => {
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
      });

      // this should be ran with RESTRICT_CORS_ORIGINS = true
      describe.skip('Request origin is reflected', () => {
        it('should authenticate not allowed origin', async () => {
          const identityToken = await getIdentityToken(provider, wallet);
          await request(app.getHttpServer())
            .post('/v1/login')
            .set('origin', notAllowedOrigin)
            .send({
              identityToken,
            })
            .expect(201);
        });

        it('should not authorize user if request does not matches authentication token', async () => {
          const identityToken = await getIdentityToken(provider, wallet);

          const loginResponse = await request(app.getHttpServer())
            .post('/v1/login')
            .set('Origin', notAllowedOrigin)
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
                `Token origin ${notAllowedOrigin} does not matches request origin ${allowedOrigins[1]}`
              );
            });
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
  });

  describe('Login with SIWE', () => {
    describe('POST /login/siwe/verify', () => {
      let message: string;
      let signature: string;
      let loginResponse: request.Response;

      describe('when SIWE message is valid', () => {
        describe('when login origin is set', () => {
          beforeAll(async () => {
            ({ loginResponse } = await loginWithSiwe(wallet, origin));
          });

          it('login response should contain access and refresh tokens', () => {
            expect(loginResponse.status).toBe(201);

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
          });

          it.todo(
            'if request origin is not specified then /search/text should return 401 status code'
          );

          it('if request origin matches origin of access token then /search/text should respond with 200 status code', async () => {
            return request(app.getHttpServer())
              .get('/v1/search/test')
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .set('Origin', origin)
              .expect(200);
          });

          it('if request origin does not match origin of access token then /search/text should respond with 401 status code', async () => {
            return request(app.getHttpServer())
              .get('/v1/search/test')
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .set('Origin', 'https://gp4btc-dev.energyweb.org')
              .expect(401);
          });

          it('POST on /login/siwe/verify with the same nonce should respond with 401 status code', async () => {
            await request(app.getHttpServer())
              .post('/v1/login/siwe/verify')
              .send({
                message,
                signature,
              })
              .expect(401);
          });
        });

        describe('when login origin is not set', () => {
          beforeAll(async () => {
            ({ loginResponse, signature, message } = await loginWithSiwe(
              wallet
            ));
          });

          it('login response should contain access and refresh tokens', () => {
            expect(loginResponse.status).toBe(201);

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
          });

          it('if request origin is not specified then /search/text should respond with 200 status code', async () => {
            return request(app.getHttpServer())
              .get('/v1/search/test')
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200);
          });

          it('if request origin is specified then /search/text should respond with 401 status code', async () => {
            return request(app.getHttpServer())
              .get('/v1/search/test')
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .set('Origin', origin)
              .expect(401);
          });
        });
      });

      describe('when SIWE message is invalid', () => {
        beforeAll(async () => {
          const { text } = await request(app.getHttpServer())
            .post('/v1/login/siwe/initiate')
            .expect(201);
          const nonce = JSON.parse(text).nonce;
          ({ message, signature } = await signSiweMessage(wallet, nonce));
        });

        it('if SIWE message is not prepared then /login/siwe/verify should respond with 400 status code', async () => {
          await request(app.getHttpServer())
            .post('/v1/login/siwe/verify')
            .send({
              message: new SiweMessage(message),
              signature,
            })
            .expect(400);
        });
      });
    });
  });
};
