import request from 'supertest';
import waitForExpect from 'wait-for-expect';
import { Wallet, providers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';
import { SiweMessage } from 'siwe';
import { URL } from 'url';

export const authLoginTestSuite = () => {
  let consoleLogSpy: jest.SpyInstance;
  let provider: providers.Provider;
  let wallet: Wallet;

  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    provider = new providers.JsonRpcProvider(process.env.ENS_URL);
    wallet = Wallet.createRandom().connect(provider);
  });

  describe('Login (version: 1)', () => {
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
      let loginResponse;

      beforeEach(async () => {
        const identityToken = await getIdentityToken(provider, wallet);

        loginResponse = await request(app.getHttpServer())
          .post('/v1/login')
          .send({
            identityToken,
          })
          .expect(201);
      });

      it(`should authorize, if request has no origin`, async () => {
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

      it(`should not authorize, if request has origin`, async () => {
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
        it('should authenticate allowed origin', async () => {
          const identityToken = await getIdentityToken(provider, wallet);
          await request(app.getHttpServer())
            .post('/v1/login')
            .set('origin', allowedOrigins[0])
            .send({
              identityToken,
            })
            .expect(201);
        });

        it('should not authenticate not allowed origin', async () => {
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

        it('should not authorize user if request does not matches authentication token', async () => {
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
    const signSiweMessage = async (nonce: string) => {
      const uri = new URL(
        '/v1/login/siwe/verify',
        new URL(
          app.get(ConfigService).get<string>('STRATEGY_CACHE_SERVER')
        ).origin
      ).href;
      const message = new SiweMessage({
        domain: 'localhost',
        address: wallet.address,
        uri,
        version: '1',
        chainId: (await wallet.provider.getNetwork()).chainId,
        nonce,
      }).prepareMessage();
      const signature = await wallet.signMessage(message);
      return { message, signature };
    };

    it('should be able to login', async () => {
      const { text } = await request(app.getHttpServer())
        .post('/v1/login/siwe/initiate')
        .expect(201);
      const nonce = JSON.parse(text).nonce;
      const { message, signature } = await signSiweMessage(nonce);

      const loginResponse = await request(app.getHttpServer())
        .post('/v1/login/siwe/verify')
        .send({
          message,
          signature,
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

    it('same nonce can not be used for two logins', async () => {
      const { text } = await request(app.getHttpServer())
        .post('/v1/login/siwe/initiate')
        .expect(201);
      const nonce = JSON.parse(text).nonce;
      const { message, signature } = await signSiweMessage(nonce);

      const loginResponses = await Promise.all([
        request(app.getHttpServer()).post('/v1/login/siwe/verify').send({
          message,
          signature,
        }),
        request(app.getHttpServer()).post('/v1/login/siwe/verify').send({
          message,
          signature,
        }),
      ]);

      expect(loginResponses.filter((r) => r.status === 201).length).toBe(1);
      expect(loginResponses.filter((r) => r.status === 401).length).toBe(1);
    });

    it('should not verify unprepared message', async () => {
      const { text } = await request(app.getHttpServer())
        .post('/v1/login/siwe/initiate')
        .expect(201);
      const nonce = JSON.parse(text).nonce;
      const { message, signature } = await signSiweMessage(nonce);

      await request(app.getHttpServer())
        .post('/v1/login/siwe/verify')
        .send({
          message: new SiweMessage(message),
          signature,
        })
        .expect(400);
    });
  });
};
