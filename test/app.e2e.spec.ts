import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { setCacheConfig, VOLTA_CHAIN_ID } from 'iam-client-lib';
import { appConfig } from '../src/common/test.utils';
import { AppModule } from '../src/app.module';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { decentralizedWebNodeTestSuite } from './decentralized-web-node';

export let app: INestApplication;

setCacheConfig(VOLTA_CHAIN_ID, {
  url: process.env.STRATEGY_CACHE_SERVER,
});

jest.setTimeout(20000000);
describe('iam-cache-server E2E tests', () => {
  let consoleLogSpy: jest.SpyInstance;
  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testingModule.createNestApplication();
    appConfig(app);
    await app.listen(3000);
  });

  afterAll(async () => {
    expect(consoleLogSpy).not.toBeCalledWith(
      expect.stringMatching(/^error \[.+\] : .+/)
    );
    await app.close();
  }, 60_000); // 1min

  describe('Modules v1', () => {
    describe('Auth module', authTestSuite);
    describe('Claim module', claimTestSuite);
    describe('Decentralized web node module', decentralizedWebNodeTestSuite);
  });
});
