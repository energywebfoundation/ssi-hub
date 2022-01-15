import request from 'supertest';
import waitForExpect from 'wait-for-expect';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';

export const authLoginTestSuite = () => {
  describe('Login (version: 1)', () => {
    let consoleLogSpy: jest.SpyInstance;
    let provider: providers.Provider;
    let wallet: Wallet;

    beforeAll(async () => {
      consoleLogSpy = jest.spyOn(global.console, 'log');

      provider = new providers.JsonRpcProvider(process.env.ENS_URL);
      wallet = new Wallet(
        '779907598c747ff45a4f8e1b7e0fde0756585a9f936aecc95c1c738a3d85bbc4',
        provider
      );
    });

    it(`should throw 401 error when user not logged in`, () => {
      return request(app.getHttpServer()).get('/v1/search/test').expect(401);
    });

    it(`should login user`, async () => {
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
