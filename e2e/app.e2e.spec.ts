import d from 'dotenv';
d.config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ethers, network } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { appConfig } from '../src/common/test.utils';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { statusList2021TestSuite } from './status-list';
import { shutDownIpfsDaemon, spawnIpfsDaemon } from './setup-ipfs';
import { EthereumDIDRegistry } from '../src/ethers/EthereumDIDRegistry';
import { EthereumDIDRegistry__factory } from '../src/ethers/factories/EthereumDIDRegistry__factory';
import { didModuleTestSuite } from './did/did-service';
import { Provider } from '../src/common/provider';

export let app: INestApplication;

jest.setTimeout(600_000);
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
    process.env.IPFS_CLUSTER_ROOT = 'http://localhost:8080';
    process.env.IPFS_CLUSTER_USER = 'not-required-locally';
    process.env.IPFS_CLUSTER_PASSWORD = 'not-required-locally';

    // have to import dynamically to have opportunity to deploy DID registry before environment configuration validation
    const { AppModule } = await import('../src/app.module');
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('IPFSClientConfig')
      .useValue(await spawnIpfsDaemon())
      .overrideProvider(Provider)
      .useValue(provider)
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
