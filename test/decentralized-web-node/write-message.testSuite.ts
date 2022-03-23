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

export const decentralizedWebNodeWriteMessageTestSuite = () => {
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

  it('should result in error status when request object is invalid', async () => {
    const holder = await randomUser();
    const requestObj = await createRequest([], holder.did);

    delete requestObj.messages;

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObj)
      .expect(400);

    expect(body).toEqual({
      requestId: requestObj.requestId,
      status: {
        code: 400,
        message: 'The request object was malformed or improperly constructed',
      },
    });
  });

  it('should write a valid message', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC);
    const requestObj = await createRequest([message], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestObj.requestId,
      replies: [
        {
          messageId: await generateCid(message),
          status: {
            code: 201,
            message: 'OK',
          },
          entries: [message],
        },
      ],
    });
  });

  it('should result in error status when message in request object is invalid', async () => {
    const holder = await randomUser();
    const requestObj = await createRequest(
      [{ ...validVC } as never],
      holder.did
    );

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestObj.requestId,
      replies: [
        {
          messageId: await generateCid(validVC),
          status: {
            code: 400,
            message: 'The message was malformed or improperly constructed',
          },
        },
      ],
    });
  });

  it('should not affect message if another is invalid', async () => {
    const holder = await randomUser();
    const message = await createWriteMessage(validVC);
    const requestObj = await createRequest(
      [message, validVC as never],
      holder.did
    );

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObj)
      .expect(201);

    expect(body).toEqual({
      requestId: requestObj.requestId,
      replies: [
        {
          messageId: await generateCid(message),
          status: {
            code: 201,
            message: 'OK',
          },
          entries: [message],
        },
        {
          messageId: await generateCid(validVC),
          status: {
            code: 400,
            message: 'The message was malformed or improperly constructed',
          },
        },
      ],
    });

    const queryMessage = await createQueryMessage({});
    const requestObjQuery = await createRequest([queryMessage], holder.did);

    const { body: queryBody } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObjQuery)
      .expect(201);

    expect(queryBody).toEqual({
      requestId: requestObjQuery.requestId,
      replies: [
        {
          entries: [message],
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
        },
      ],
    });
  });

  it("should invalid message shouldn't be saved", async () => {
    const holder = await randomUser();
    const requestObjWrite = await createRequest([validVC as never], holder.did);

    await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObjWrite)
      .expect(201);

    const queryMessage = await createQueryMessage({});
    const requestObjQuery = await createRequest([queryMessage], holder.did);

    const { body } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder.cookies)
      .send(requestObjQuery)
      .expect(201);

    expect(body).toEqual({
      requestId: requestObjQuery.requestId,
      replies: [
        {
          entries: [],
          messageId: await generateCid(queryMessage),
          status: {
            code: 200,
            message: 'OK',
          },
        },
      ],
    });
  });

  it('should be able to save the same message by two different holders', async () => {
    const [holder1, holder2] = await Promise.all([randomUser(), randomUser()]);
    const message = await createWriteMessage(validVC);
    const requestObj1 = await createRequest([message], holder1.did);
    const requestObj2 = await createRequest([message], holder2.did);

    const reply = {
      messageId: await generateCid(message),
      status: {
        code: 201,
        message: 'OK',
      },
      entries: [message],
    };

    const { body: body1 } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder1.cookies)
      .send(requestObj1)
      .expect(201);

    expect(body1).toEqual({
      requestId: requestObj1.requestId,
      replies: [reply],
    });

    const { body: body2 } = await request(app.getHttpServer())
      .post(`/v1/webnode`)
      .set('Cookie', holder2.cookies)
      .send(requestObj2)
      .expect(201);

    expect(body2).toEqual({
      requestId: requestObj2.requestId,
      replies: [reply],
    });
  });
};
