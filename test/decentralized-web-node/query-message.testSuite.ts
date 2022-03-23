import request from 'supertest';
import { Connection, EntityManager } from 'typeorm';
import { app } from '../app.e2e.spec';
import { randomUser } from '../utils';
import { validVC } from './fixtures/valid-vc';
import {
  createQueryMessage,
  createRequest,
  createWriteMessage,
  generateCid,
} from './utils';

export const decentralizedWebNodeQueryMessageSuite = () => {
  let queryRunner;

  beforeEach(async () => {
    const manager = app.get(EntityManager);
    const dbConnection = app.get(Connection);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  });

  it('should return only messages related to holder', async () => {
    const [holder, user] = await Promise.all([randomUser(), randomUser()]);
    const message = await createWriteMessage(validVC);
    const message2 = await createWriteMessage(validVC);

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(await createRequest([message, message2], holder.did))
        .expect(201),
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', user.cookies)
        .send(
          await createRequest([await createWriteMessage(validVC)], user.did)
        )
        .expect(201),
    ]);

    const queryMessage = await createQueryMessage({});
    const requestQueryObj = await createRequest([queryMessage], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message, message2],
        },
      ],
    });
  });

  it('should find a message by object id', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC);
    const message2 = await createWriteMessage(validVC);
    const requestObject = await createRequest([message, message2], holder.did);

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(requestObject)
        .expect(201),
    ]);

    const queryMessage = await createQueryMessage({
      objectId: message.descriptor.objectId,
    });
    const requestQueryObj = await createRequest([queryMessage], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message],
        },
      ],
    });
  });

  it('should find a messages by schema', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC);
    const message2 = await createWriteMessage(validVC);
    const message3 = await createWriteMessage(validVC, {
      schema: 'https://schema.org/Person',
    });
    const requestObject = await createRequest(
      [message, message2, message3],
      holder.did
    );

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(requestObject)
        .expect(201),
    ]);

    const queryMessage = await createQueryMessage({
      schema: 'https://www.w3.org/2018/credentials#VerifiableCredential',
    });
    const requestQueryObj = await createRequest([queryMessage], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message, message2],
        },
      ],
    });
  });

  it('should find a messages by data format', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC);
    const message2 = await createWriteMessage(validVC);
    const message3 = await createWriteMessage(validVC, {
      dataFormat: 'application/json',
    });
    const requestObject = await createRequest(
      [message, message2, message3],
      holder.did
    );

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(requestObject)
        .expect(201),
    ]);

    const queryMessage = await createQueryMessage({
      dataFormat: 'application/json',
    });
    const requestQueryObj = await createRequest([queryMessage], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message3],
        },
      ],
    });
  });

  it('should sort by date of creation', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC, {
      dateCreated: Date.now(),
    });
    const message2 = await createWriteMessage(validVC, {
      dateCreated: Date.now() - 10000,
    });
    const requestObject = await createRequest([message, message2], holder.did);

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(requestObject)
        .expect(201),
    ]);

    const queryMessage1 = await createQueryMessage({
      dateSort: 'createdAscending',
    });
    const requestQueryObj = await createRequest([queryMessage1], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage1),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message2, message],
        },
      ],
    });

    const queryMessage2 = await createQueryMessage({
      dateSort: 'createdDescending',
    });
    const requestQueryOb2 = await createRequest([queryMessage2], holder.did);

    const { body: body2 } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryOb2)
      .expect(201);

    expect(body2).toEqual({
      requestId: requestQueryOb2.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage2),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message, message2],
        },
      ],
    });
  });

  it('should sort by date of publishing', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC, {
      datePublished: Date.now(),
    });
    const message2 = await createWriteMessage(validVC, {
      datePublished: Date.now() - 10000,
    });
    const requestObject = await createRequest([message, message2], holder.did);

    await Promise.all([
      request(app.getHttpServer())
        .post(`/v1/webnode`)
        .set('Cookie', holder.cookies)
        .send(requestObject)
        .expect(201),
    ]);

    const queryMessage1 = await createQueryMessage({
      dateSort: 'publishedAscending',
    });
    const requestQueryObj = await createRequest([queryMessage1], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestQueryObj.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage1),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message2, message],
        },
      ],
    });

    const queryMessage2 = await createQueryMessage({
      dateSort: 'publishedDescending',
    });
    const requestQueryOb2 = await createRequest([queryMessage2], holder.did);

    const { body: body2 } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestQueryOb2)
      .expect(201);

    expect(body2).toEqual({
      requestId: requestQueryOb2.requestId,
      replies: [
        {
          messageId: await generateCid(queryMessage2),
          status: {
            code: 200,
            message: 'OK',
          },
          entries: [message, message2],
        },
      ],
    });
  });
};
