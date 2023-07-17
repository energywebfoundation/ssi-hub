import { HttpStatus } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import request from 'supertest';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { DidStore as DidStoreCluster } from 'didStoreCluster';
import { DidStore as DidStoreGateway } from 'didStoreInfura';
import { app } from '../app.e2e.spec';
import { randomUser } from '../utils';
import { PIN_CLAIM_QUEUE_NAME } from '../../src/modules/ipfs/ipfs.types';

export const ipfsModuleTestSuite = () => {
  let queryRunner: QueryRunner;
  let didStoreCluster: DidStoreCluster;
  let didStoreInfura: DidStoreGateway;
  let pinsQueue: Queue;
  const notPinned = { claimType: 'hello world notpinned' };
  const notPinnedCid =
    'bafkreigj4mi6cnegeh6hh6rxdjb63l4d7dowjcxxeyakgnijvoues3svii';
  const notPersistedCid =
    'bafkreih5pe7r3ucfdebiu7wjx3jr35qpbxqkxm5eneb2s2zu6t7yfqllci'; // CID of { claimType: 'hello world not persisted bafybeicg2rebjoofv4kbyovkw7af3rpiitvnl6i7ckcywaq6xjcxnc2mby' }

  beforeEach(async () => {
    jest.restoreAllMocks();

    didStoreCluster = app.get(DidStoreCluster);
    didStoreInfura = app.get(DidStoreGateway);
    pinsQueue = app.get(getQueueToken(PIN_CLAIM_QUEUE_NAME));
    await pinsQueue.empty();

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

  it('save() should post claim in cluster', async () => {
    const claimData = {
      claimType: 'claim type',
      claimTypeVersion: 1,
      fields: [],
      issuerFields: [],
    };
    const requester = await randomUser();

    const { text: cid } = await request(app.getHttpServer())
      .post(`/v1/ipfs/`)
      .set('Cookie', requester.cookies)
      .send(JSON.stringify(claimData))
      .expect(HttpStatus.CREATED);

    const claimPinned = new Promise<void>((resolve) => {
      pinsQueue.on('completed', () => {
        resolve();
      });
    });
    const didStoreClusterGet = jest.spyOn(didStoreCluster, 'get');
    jest
      .spyOn(didStoreInfura, 'get')
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 24 * 60 * 60 * 1000))
      );
    const { text: stored } = await request(app.getHttpServer())
      .get(`/v1/ipfs/${cid}`)
      .set('Cookie', requester.cookies)
      .expect(HttpStatus.OK);
    await claimPinned;
    expect(didStoreClusterGet).toBeCalledTimes(2); // first in IpfsService.get, second in PinProcessor.pin to check that claim if claim is pinned

    expect(JSON.parse(stored)).toStrictEqual(claimData);
  });

  it('if claim was not persisted in IPFS, get() should respond with 404 status code', async () => {
    const didStoreInfuraGet = jest.spyOn(didStoreInfura, 'get');
    const requester = await randomUser();

    const cid = notPersistedCid;
    didStoreInfuraGet.mockRejectedValueOnce({ response: { status: 504 } });
    await request(app.getHttpServer())
      .get(`/v1/ipfs/${cid}`)
      .set('Cookie', requester.cookies)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('if claim is not found in cluster, get() should save claim in cluster', async () => {
    const didStoreClusterGet = jest.spyOn(didStoreCluster, 'get');
    const didStoreInfuraGet = jest.spyOn(didStoreInfura, 'get');

    const requester = await randomUser();

    const claim = JSON.stringify(notPinned);
    const cid = notPinnedCid;

    const claimPinned = new Promise<void>((resolve) => {
      pinsQueue.on('completed', () => {
        resolve();
      });
    });
    didStoreInfuraGet.mockResolvedValueOnce(claim);
    await request(app.getHttpServer())
      .get(`/v1/ipfs/${cid}`)
      .set('Cookie', requester.cookies);

    await claimPinned;

    expect(didStoreClusterGet).toBeCalledTimes(2);
    expect(didStoreInfuraGet).toBeCalledTimes(1);

    jest
      .spyOn(didStoreInfura, 'get')
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 24 * 60 * 60 * 1000))
      );
    await request(app.getHttpServer())
      .get(`/v1/ipfs/${cid}`)
      .set('Cookie', requester.cookies);

    expect(didStoreClusterGet).toBeCalledTimes(4);
    expect(didStoreInfuraGet).toBeCalledTimes(2);
  });
};
