import { ConfigService } from '@nestjs/config';
import { Wallet } from 'ethers';
import { SiweMessage } from 'siwe';
import request from 'supertest';
import { URL } from 'url';
import { app } from '../app.e2e.spec';

export const origin = 'https://switchboard-dev.energyweb.org';

export const signSiweMessage = async (
  wallet: Wallet,
  nonce: string,
  domain?: string
) => {
  if (!domain) {
    domain = new URL(origin).hostname;
  }
  const uri = new URL(
    '/v1/login/siwe/verify',
    new URL(app.get(ConfigService).get<string>('STRATEGY_CACHE_SERVER')).origin
  ).href;
  const message = new SiweMessage({
    domain,
    address: wallet.address,
    uri,
    version: '1',
    chainId: (await wallet.provider.getNetwork()).chainId,
    nonce,
  }).prepareMessage();
  const signature = await wallet.signMessage(message);
  return { message, signature };
};

export const loginWithSiwe = async (
  wallet: Wallet,
  origin?: string
): Promise<{
  loginResponse: request.Response;
  signature: string;
  message: string;
}> => {
  const { text } = await request(app.getHttpServer())
    .post('/v1/login/siwe/initiate')
    .expect(201);
  const nonce = JSON.parse(text).nonce;
  const { message, signature } = await signSiweMessage(wallet, nonce);
  const req = request(app.getHttpServer()).post('/v1/login/siwe/verify').send({
    message,
    signature,
  });

  if (origin) {
    req.set('Origin', origin);
  }
  const loginResponse = await req;

  return { loginResponse, signature, message };
};
