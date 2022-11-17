import {
  IDIDDocument,
  RegistrySettings,
  PubKeyType,
} from '@ew-did-registry/did-resolver-interface';
import { EwSigner, Operator } from '@ew-did-registry/did-ethr-resolver';
import { Methods, Chain } from '@ew-did-registry/did';

import waitForExpect from 'wait-for-expect';
import { ethers } from 'hardhat';
import { Wallet, utils } from 'ethers';
import { DIDService } from '../../src/modules/did/did.service';
import { didPattern } from '../../src/modules/did/did.types';
import { Keys, KeyType } from '@ew-did-registry/keys';
import { DIDDocumentFull } from '@ew-did-registry/did-document';
import { app } from '../app.e2e.spec';
import { Connection, EntityManager } from 'typeorm';

const { parseEther } = utils;

export const didModuleTestSuite = () => {
  const provider = ethers.provider;
  const faucet = provider.getSigner(1);
  let service: DIDService;
  let registrySettings: RegistrySettings;
  let queryRunner;

  beforeEach(async () => {
    service = app.get<DIDService>(DIDService);
    registrySettings = app.get<RegistrySettings>('RegistrySettings');

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

  it('should synchronize not cached document', async () => {
    const identity = Wallet.createRandom().connect(provider);
    const did = `did:${Methods.Erc1056}:${Chain.VOLTA}:${identity.address}`;
    const addCachedDocument = jest.spyOn(service, 'addCachedDocument');
    const doc = await service.getById(did); // add to cache
    expect(addCachedDocument).toHaveBeenNthCalledWith(1, did);
    expect(doc.id).toEqual(did);
  });

  it('getById should return cached document when DID is in lower case', async () => {
    const doc = await service.getById(
      `did:${Methods.Erc1056}:${Chain.VOLTA}:${
        Wallet.createRandom().address
      }`.toLowerCase()
    );
    expectNewDoc(doc);
  });

  it('should update cached document', async () => {
    const identity = Wallet.createRandom().connect(provider);
    await faucet.sendTransaction({
      to: identity.address,
      value: parseEther('1'),
    });
    const did = `did:${Methods.Erc1056}:${Chain.VOLTA}:${identity.address}`;
    await service.getById(did); // add to cache

    const incrementalRefreshCachedDocument = jest.spyOn(
      service,
      'incrementalRefreshCachedDocument'
    );
    const operator = new Operator(
      EwSigner.fromEthersSigner(identity, identity.publicKey),
      registrySettings
    );
    const didDocument = new DIDDocumentFull(did, operator);
    await didDocument.updatePublicKey({
      publicKey: `0x${new Keys().publicKey}`,
      type: PubKeyType.VerificationKey2018,
      algo: KeyType.ED25519,
      tag: '',
    });
    await waitForExpect(() =>
      expect(incrementalRefreshCachedDocument).toHaveBeenNthCalledWith(1, did)
    );
    await incrementalRefreshCachedDocument.mock.results[0].value;
    const doc = await service.getById(did);
    expect(doc.publicKey.length).toBe(1);
  });

  function expectNewDoc({
    id,
    publicKey,
    authentication,
    service,
  }: IDIDDocument) {
    expect(id).toMatch(new RegExp(didPattern));
    expect(publicKey).toHaveLength(0);
    expect(authentication).toHaveLength(1);
    expect(service).toHaveLength(0);
  }
};
