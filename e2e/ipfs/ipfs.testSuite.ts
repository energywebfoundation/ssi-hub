import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { app } from '../app.e2e.spec';
import { randomUser } from '../utils';

export const ipfsModuleTestSuite = () => {
  it('should be able to post claim', async () => {
    const requester = await randomUser();

    await request(app.getHttpServer())
      .post(`/v1/ipfs/`)
      .set('Cookie', requester.cookies)
      .send({
        claimData: {
          claimType: 'claim type',
          claimTypeVersion: 1,
          fields: [],
          issuerFields: [],
        },
      })
      .expect(HttpStatus.CREATED);
  });
};
