import { Connection, EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import request from 'supertest';
import { app } from '../app.e2e.spec';
import { randomUser } from '../utils';
import { addCredential } from './utils/add-credential';
import { getCredential } from './utils/get-credential';

export const vcMatchTestSuite = () => {
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

  it(`should match one credential`, async () => {
    const holder = await randomUser();
    const credentials = [
      getCredential({
        subject: holder.did,
        issuerFields: [],
        namespace: 'valid.iam.ewc',
        version: '2',
      }),
      getCredential({
        subject: holder.did,
        issuerFields: [],
        namespace: 'valid.iam.ewc',
        version: '1',
      }),
      getCredential({
        subject: holder.did,
        issuerFields: [],
        namespace: 'another.wrong.iam.ewc',
        version: '1',
      }),
    ];

    await addCredential(credentials, holder);

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [
        {
          id: 'valid_credential',
          name: 'Required valid credential',
          constraints: {
            fields: [
              {
                path: ['$.credentialSubject.role.namespace'],
                filter: {
                  type: 'string',
                  const: 'valid.iam.ewc',
                },
              },
              {
                path: ['$.credentialSubject.role.version'],
                filter: {
                  type: 'string',
                  const: '1',
                },
              },
            ],
          },
        },
      ],
    };

    const { body } = await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(201);

    expect(body).toEqual({
      errors: expect.any(Array),
      matches: [
        {
          name: 'Required valid credential',
          rule: 'all',
          vc_path: expect.any(Array),
        },
      ],
      areRequiredCredentialsPresent: 'info',
      verifiableCredential: [credentials[1]],
      warnings: expect.any(Array),
    });
  });

  it(`should match two credential by issuer fields`, async () => {
    const holder = await randomUser();
    const credentials = [
      getCredential({
        subject: holder.did,
        issuerFields: [{ key: 'foo', value: 'valid' }],
        namespace: 'org.iam.ewc',
        version: '1',
      }),
      getCredential({
        subject: holder.did,
        issuerFields: [{ key: 'foo', value: 'valid' }],
        namespace: 'app.iam.ewc',
        version: '1',
      }),
      getCredential({
        subject: holder.did,
        issuerFields: [{ key: 'foo', value: 'wrong' }],
        namespace: 'role.iam.ewc',
        version: '1',
      }),
    ];

    await addCredential(credentials, holder);

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [
        {
          id: 'valid_credential',
          name: 'Required valid credential',
          constraints: {
            fields: [
              {
                path: ['$.credentialSubject.issuerFields[*].value'],
                filter: {
                  type: 'string',
                  const: 'valid',
                },
              },
            ],
          },
        },
      ],
    };

    const { body } = await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(201);

    expect(body).toEqual({
      errors: expect.any(Array),
      matches: [
        {
          name: 'Required valid credential',
          rule: 'all',
          vc_path: expect.any(Array),
        },
      ],
      areRequiredCredentialsPresent: 'info',
      verifiableCredential: [credentials[0], credentials[1]],
      warnings: expect.any(Array),
    });
  });

  it(`should not match any credential`, async () => {
    const holder = await randomUser();
    const credentials = [
      getCredential({
        subject: holder.did,
        issuerFields: [],
        namespace: 'org.iam.ewc',
        version: '1',
      }),
    ];

    await addCredential(credentials, holder);

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [
        {
          id: 'valid_credential',
          name: 'Required valid credential',
          constraints: {
            fields: [
              {
                path: ['$.credentialSubject.issuerFields[*].value'],
                filter: {
                  type: 'string',
                  const: 'valid',
                },
              },
            ],
          },
        },
      ],
    };

    const { body } = await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(201);

    expect(body).toEqual({
      errors: expect.any(Array),
      matches: [],
      areRequiredCredentialsPresent: 'error',
      verifiableCredential: [],
      warnings: expect.any(Array),
    });
  });

  it(`should result with error when holder doesn't have credential`, async () => {
    const holder = await randomUser();

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [
        {
          id: 'valid_credential',
          name: 'Required valid credential',
          constraints: {
            fields: [
              {
                path: ['$.credentialSubject.issuerFields[*].value'],
                filter: {
                  type: 'string',
                  const: 'valid',
                },
              },
            ],
          },
        },
      ],
    };

    const { body } = await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(201);

    expect(body).toEqual({
      errors: expect.any(Array),
      matches: [],
      areRequiredCredentialsPresent: 'error',
      verifiableCredential: [],
      warnings: expect.any(Array),
    });
  });

  it(`should result with error when holder doesn't have credential and presentation definition is empty`, async () => {
    const holder = await randomUser();

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [],
    };

    const { body } = await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(201);

    expect(body).toEqual({
      errors: expect.any(Array),
      matches: [],
      areRequiredCredentialsPresent: 'error',
      verifiableCredential: [],
      warnings: expect.any(Array),
    });
  });

  it(`should result with error when presentation definition object is malformed`, async () => {
    const holder = await randomUser();

    const presentationDefinition = {
      id: v4(),
      input_descriptors: [
        {
          id: 'valid_credential',
          name: 'Required valid credential',
          constraints: {
            fields: [
              {
                filter: {
                  type: 'string',
                  const: 'valid',
                },
              },
            ],
          },
        },
      ],
    };

    await request(app.getHttpServer())
      .post(`/v1/vp/match`)
      .set('Cookie', holder.cookies)
      .send(presentationDefinition)
      .expect(400);
  });
};
