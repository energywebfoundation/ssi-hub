import request from 'supertest';
import { Wallet, providers } from 'ethers';
import { app } from '../app.e2e.spec';
import { TokenService } from '../../src/modules/auth/token.service';

export const authRefreshTokenTestSuite = () => {
  describe('Refresh token (version: 1)', () => {
    const getRefreshToken = async () => {
      const provider = new providers.JsonRpcProvider(process.env.ENS_URL);
      const wallet = new Wallet(
        '779907598c747ff45a4f8e1b7e0fde0756585a9f936aecc95c1c738a3d85bbc4',
        provider
      );
      const userAddress = await wallet.getAddress();
      const tokenService = app.get(TokenService);
      return tokenService.generateRefreshToken({
        userDid: `did:ethr:volta:${userAddress}`,
      });
    };

    const manualBeforeEach = async (refreshTokenResponse: request.Response) => {
      expect(refreshTokenResponse.headers['set-cookie']).toHaveLength(2);
      expect(refreshTokenResponse.headers['set-cookie']).toEqual(
        expect.arrayContaining([
          expect.stringMatching(
            /(?:token|refreshToken)=.+\..+\..+; Path=\/; HttpOnly; Secure; SameSite=None/
          ),
        ])
      );
      expect(refreshTokenResponse.headers['set-cookie'][0]).toContain(
        refreshTokenResponse.body.token
      );
      expect(refreshTokenResponse.headers['set-cookie'][1]).toContain(
        refreshTokenResponse.body.refreshToken
      );

      return request(app.getHttpServer())
        .get('/v1/search/test')
        .set('Cookie', [
          refreshTokenResponse.headers['set-cookie'][0].split(';')[0] + ';',
        ])
        .set('authorization', refreshTokenResponse.body.token)
        .expect(200);
    };

    it(`should refresh token (using query params)`, async () => {
      const refreshToken = await getRefreshToken();
      const refreshTokenResponse = await request(app.getHttpServer())
        .get(`/v1/refresh_token?refresh_token=${refreshToken}`)
        .expect(200);
      return manualBeforeEach(refreshTokenResponse);
    });

    it(`should refresh token (using cookies)`, async () => {
      const refreshToken = await getRefreshToken();
      const refreshTokenResponse = await request(app.getHttpServer())
        .get(`/v1/refresh_token`)
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .expect(200);
      return manualBeforeEach(refreshTokenResponse);
    });
  });
};
