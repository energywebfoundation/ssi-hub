import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appConfig } from '../src/common/test.utils';
import { AppModule } from '../src/app.module';
import { authTestSuite } from './auth';

export let app: INestApplication;

jest.setTimeout(200000);
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
      expect.stringMatching(/^error \[.+\] : .+/),
    );
    await app.close();
  }, 60_000); // 1min

  describe('Auth module', authTestSuite);
});