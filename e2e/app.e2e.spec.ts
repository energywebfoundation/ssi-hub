import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ethers, network } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { appConfig } from '../src/common/test.utils';
import { AppModule } from '../src/app.module';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { statusList2021TestSuite } from './status-list';
import { shutDownIpfsDaemon, spawnIpfsDaemon } from './setup-ipfs';
import { EthereumDIDRegistry } from '../src/ethers/EthereumDIDRegistry';
import { EthereumDIDRegistry__factory } from '../src/ethers/factories/EthereumDIDRegistry__factory';
import { didModuleTestSuite } from './did/did-service';
import { Provider } from '../src/common/provider';
import { ConfigService } from '@nestjs/config';

export let app: INestApplication;

jest.setTimeout(20000000);
describe('iam-cache-server E2E tests', () => {
  const provider = ethers.provider;
  const deployer = provider.getSigner(0);
  let didRegistry: EthereumDIDRegistry;
  network.config.chainId = 73799;
  let consoleLogSpy: jest.SpyInstance;

  async function deployDidRegistry() {
    const didRegistry = await new EthereumDIDRegistry__factory()
      .connect(deployer)
      .deploy();
    return didRegistry;
  }

  beforeAll(async () => {
    consoleLogSpy = jest.spyOn(global.console, 'log');

    didRegistry = await loadFixture(deployDidRegistry);
    process.env.DID_REGISTRY_ADDRESS = didRegistry.address;
    const configService = new ConfigService(); // this is necessary to have values updated in the ConfigService provider

    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('IPFSClientConfig')
      .useValue(await spawnIpfsDaemon())
      .overrideProvider(Provider)
      .useValue(provider)
      .overrideProvider(ConfigService)
      .useValue(configService)
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
    describe('Did module', didModuleTestSuite);
  });
});
