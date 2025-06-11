import { config } from 'dotenv';
// although it is called in app.module, it is added here to be able to override DID_REGISTRY_ADDRESS. When config() is called next time it will not change variables alredy presented in env
config();
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ethers, network } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { appConfig } from '../src/common/test.utils';
import { authTestSuite } from './auth';
import { claimTestSuite } from './claim';
import { statusList2021TestSuite } from './status-list';
import { shutdownIpfsCluster, spawnIpfsCluster } from './setupIpfsCluster';
import { EthereumDIDRegistry } from '../src/ethers/EthereumDIDRegistry';
import { EthereumDIDRegistry__factory } from '../src/ethers/factories/EthereumDIDRegistry__factory';
import { didModuleTestSuite } from './did/did-service';
import { Provider } from '../src/common/provider';
import { ChildProcess } from 'child_process';

export let app: INestApplication;

jest.setTimeout(600_000);
describe('iam-cache-server E2E tests', () => {
  const provider = ethers.provider;
  const deployer = provider.getSigner(0);
  let didRegistry: EthereumDIDRegistry;
  network.config.chainId = 73799;
  let consoleLogSpy: jest.SpyInstance;
  let cluster: ChildProcess;

  async function deployDidRegistry() {
    const didRegistry = await new EthereumDIDRegistry__factory()
      .connect(deployer)
      .deploy();
    return didRegistry;
  }

  beforeAll(async () => {
    await import('../src/scripts/truncate-db');
    consoleLogSpy = jest.spyOn(global.console, 'log');

    didRegistry = await loadFixture(deployDidRegistry);
    process.env.DID_REGISTRY_ADDRESS = didRegistry.address;

    cluster = await spawnIpfsCluster();
    process.env.IPFS_CLUSTER_ROOT = 'http://localhost:8080';

    process.env.IPFS_CLIENT_URL = 'http://mocked'; // CID resolved incorrectly through gateway exposed on cluster. TODO: instead of gateway try to expose IPFS API

    // have to import dynamically to have opportunity to deploy DID registry before environment configuration validation
    const { AppModule } = await import('../src/app.module');
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
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
    shutdownIpfsCluster(cluster);
  }, 60_000); // 1min

  describe('Modules v1', () => {
    describe('Auth module', authTestSuite);
    describe('Claim module', claimTestSuite);
    describe('StatusList2021 module', statusList2021TestSuite);
    describe('Did module', didModuleTestSuite);
  });
});
