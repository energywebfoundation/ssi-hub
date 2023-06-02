import request from 'supertest';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';

export const authStatusBlockNumTestSuite = () => {
  describe('Auth status when login with block number', () => {
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

      it('/auth/status should respond with null', () => {
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
          const identityToken = await getIdentityToken(provider, wallet);

          loginResponse = await request(app.getHttpServer())
            .post('/v1/login')
            .set('Origin', origin)
            .send({
              identityToken,
            })
            .expect(201);
        });

        describe('when request origin is set', () => {
          describe('when tokens are set in cookies headers', () => {
            it('if request origin matches login origin then /auth/status should respond with DID of logged in user', async () => {
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

            it('if request origin does not match login origin then /auth/status should respond with null', async () => {
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

          describe('when token is set in Authorization header', () => {
            it('if request origin matches login origin then /auth/status should respond with DID of logged in user', async () => {
              return request(app.getHttpServer())
                .get('/v1/auth/status')
                .set('Origin', origin)
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .expect(200, {
                  user: `did:ethr:volta:${wallet.address}`,
                });
            });

            it('if request origin does not match login origin then /auth/status should respond with null', async () => {
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
        });

        describe('when request origin is not set', () => {
          it.todo(
            'if tokens are set in cookies headers then /auth/status should respond with null'
          );

          it.todo(
            'if tokens are set in Authorization header then /auth/status should respond with null'
          );
        });
      });

      describe('when login origin is not set', () => {
        beforeAll(async () => {
          const identityToken = await getIdentityToken(provider, wallet);

          loginResponse = await request(app.getHttpServer())
            .post('/v1/login')
            .send({
              identityToken,
            })
            .expect(201);
        });

        describe('when request origin is set', () => {
          it('if tokens are set in cookies headers then /auth/status should respond with null', async () => {
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

          it('if token is set in Authorization header then /auth/status should respond with null', async () => {
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
          it('if tokens are set in cookies headers then /auth/status should respond with DID of logged in user', async () => {
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

          it('if token is  set in Authorization header then /auth/status should respond with DID of logged in user', async () => {
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
