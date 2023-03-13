import request from 'supertest';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { loginWithSiwe } from './utils';

export const authStatusSiweTestSuite = () => {
  describe('Auth status when login with Siwe', () => {
    let provider: providers.Provider;
    let wallet: Wallet;

    beforeAll(async () => {
      provider = new providers.JsonRpcProvider(process.env.ENS_URL);
      wallet = Wallet.createRandom().connect(provider);
    });

    describe('when not logged in', () => {
      it(`should not throw error`, () => {
        return request(app.getHttpServer()).get('/v1/auth/status').expect(200);
      });

      it('should return negative logged in status', () => {
        return request(app.getHttpServer()).get('/v1/auth/status').expect(200, {
          user: null,
        });
      });
    });

    describe('when logged in', () => {
      let loginResponse: request.Response;
      const origin = 'https://switchboard-dev.energyweb.org';

      describe('when login origin is set', () => {
        beforeAll(async () => {
          ({ loginResponse } = await loginWithSiwe(wallet, origin));
          expect(loginResponse.status).toBe(201);
        });

        describe('when request origin is set', () => {
          it('should return positive logged in status for cookies session if request origin matches login origin', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', origin)
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200, {
                user: `did:ethr:volta:${wallet.address}`,
              });
          });

          it('should return negative logged in status for cookies session if request origin does not matches login origin', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', 'https://gp4btc-ui-dev.energyweb.org/') // origin enabled in CORS settings
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200, {
                user: null,
              });
          });

          it('should return positive logged in status for authorization header if request origin matches login origin', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', origin)
              .set('Authorization', `Bearer ${loginResponse.body.token}`)
              .expect(200, {
                user: `did:ethr:volta:${wallet.address}`,
              });
          });

          it('should return negative logged in status for authorization header if request origin does not matches login origin', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', 'https://gp4btc-ui-dev.energyweb.org/') // origin enabled in CORS settings
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200, {
                user: null,
              });
          });
        });

        describe('when request origin is not set', () => {
          it.todo(
            'should return negative logged in status for cookies session'
          );

          it.todo(
            'should return negative logged in status for authorization header'
          );
        });
      });

      describe('when login origin is not set', () => {
        beforeAll(async () => {
          ({ loginResponse } = await loginWithSiwe(wallet));
          expect(loginResponse.status).toBe(201);
        });

        describe('when request origin is set', () => {
          it('should return negative logged in status for cookies session', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', origin)
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200, {
                user: null,
              });
          });

          it('should return negative logged in status for authorization header', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Origin', origin)
              .set('Authorization', `Bearer ${loginResponse.body.token}`)
              .expect(200, {
                user: null,
              });
          });
        });

        describe('when request origin is not set', () => {
          it('should return positive logged in status for cookies session', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')
              .set('Cookie', [
                loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
                loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
              ])
              .expect(200, {
                user: `did:ethr:volta:${wallet.address}`,
              });
          });

          it('should return positive logged in status for authorization header', async () => {
            return request(app.getHttpServer())
              .get('/v1/auth/status')

              .set('Authorization', `Bearer ${loginResponse.body.token}`)
              .expect(200, {
                user: `did:ethr:volta:${wallet.address}`,
              });
          });
        });
      });
    });
  });
};
