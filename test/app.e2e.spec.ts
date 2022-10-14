import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appConfig } from '../src/common/test.utils';
import { AppModule } from '../src/app.module';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { statusList2021TestSuite } from './status-list';
import { shutDownIpfsDaemon, spawnIpfsDaemon } from './setup-ipfs';

export let app: INestApplication;

jest.setTimeout(20000000);
describe('iam-cache-server E2E tests', () => {
  let consoleLogSpy: jest.SpyInstance;
  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('IPFSClientConfig')
      .useValue(await spawnIpfsDaemon())
      .compile();
    app = testingModule.createNestApplication();
    appConfig(app);
    await app.listen(3000);
  });

  afterAll(async () => {
    expect(consoleLogSpy).not.toBeCalledWith(
      expect.stringMatching(/^error \[.+\] : .+/)
    );
    await app.close();
    await shutDownIpfsDaemon();
  }, 60_000); // 1min

  describe('Modules v1', () => {
    describe('Auth module', authTestSuite);
    describe('Claim module', claimTestSuite);
    describe('StatusList2021 module', statusList2021TestSuite);
  });
});
