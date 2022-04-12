import request from 'supertest';
import { app } from '../../app.e2e.spec';
import {
  createRequest,
  createWriteMessage,
} from '../../decentralized-web-node/utils';
import { TestUser } from '../../utils';

/**
 * @description add credential to storage
 */
export const addCredential = async (
  credentials: Record<string, unknown>[],
  holder: TestUser
) => {
  const messages = await Promise.all([
    ...credentials.map(
      async (credential) => await createWriteMessage(credential)
    ),
  ]);
  const requestObj = await createRequest(messages, holder.did);

  return await request(app.getHttpServer())
    .post(`/v1/webnode`)
    .set('Cookie', holder.cookies)
    .send(requestObj)
    .expect(201);
};
