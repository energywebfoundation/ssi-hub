import { ChildProcess } from 'child_process';
import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appConfig } from '../src/common/test.utils';
import { AppModule } from '../src/app.module';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { statusList2021TestSuite } from './status-list';
import { shutdownIpfs, spawnIpfs } from './setUpIpfs';

export let app: INestApplication;

jest.setTimeout(20000000);
describe('iam-cache-server E2E tests', () => {
  let consoleLogSpy: jest.SpyInstance;
  let cluster: ChildProcess;

  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    cluster = await spawnIpfs();

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
    shutdownIpfs(cluster);
  }, 60_000); // 1min

  describe('Modules v1', () => {
    describe('Auth module', authTestSuite);
    describe('Claim module', claimTestSuite);
    describe('StatusList2021 module', statusList2021TestSuite);
  });
});
