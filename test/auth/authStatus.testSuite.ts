import request from 'supertest';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';

export const authStatusTestSuite = () => {
  describe('Auth status (version: 1)', () => {
    let provider: providers.Provider;
    let wallet: Wallet;

    beforeAll(async () => {
      provider = new providers.JsonRpcProvider(process.env.ENS_URL);
      wallet = new Wallet(
        '779907598c747ff45a4f8e1b7e0fde0756585a9f936aecc95c1c738a3d85bbc4',
        provider
      );
    });

    it(`should not throw error if user is not logged in`, () => {
      return request(app.getHttpServer()).get('/v1/auth/status').expect(200);
    });

    it(`should return negative logged in status`, () => {
      return request(app.getHttpServer()).get('/v1/auth/status').expect(200, {
        user: null,
      });
    });

    it(`should return positive logged in status for cookies session`, async () => {
      const identityToken = await getIdentityToken(provider, wallet);

      const loginResponse = await request(app.getHttpServer())
        .post('/v1/login')
        .send({
          identityToken,
        })
        .expect(201);

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

    it(`should return positive logged in status for authorization header`, async () => {
      const identityToken = await getIdentityToken(provider, wallet);

      const loginResponse = await request(app.getHttpServer())
        .post('/v1/login')
        .send({
          identityToken,
        })
        .expect(201);

      return request(app.getHttpServer())
        .get('/v1/auth/status')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200, {
          user: `did:ethr:volta:${wallet.address}`,
        });
    });
  });
};
