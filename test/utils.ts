import { Signer, providers, utils, Wallet } from 'ethers';
import base64url from 'base64url';
import request from 'supertest';
import { app } from './app.e2e.spec';
import { RoleService } from '../src/modules/role/role.service';
import { RoleDTO } from '../src/modules/role/role.dto';

export const provider = new providers.JsonRpcProvider(process.env.ENS_URL);

export const getIdentityToken = async (
  provider: providers.Provider,
  signer: Signer
) => {
  const [address, blockNumber] = await Promise.all([
    signer.getAddress(),
    provider.getBlockNumber(),
  ]);

  const { arrayify, keccak256 } = utils;
  const header = {
    alg: 'ES256',
    typ: 'JWT',
  };

  const payload = {
    iss: `did:ethr:volta:${address}`,
    claimData: {
      blockNumber,
    },
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const msg = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString(
    'hex'
  )}`;
  const sig = await signer.signMessage(arrayify(keccak256(msg)));
  const encodedSignature = base64url(sig);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

export interface TestUser {
  wallet: Wallet;
  did: string;
  didHex: string;
  cookies: string[];
}
export const randomUser = async (Origin?: string): Promise<TestUser> => {
  let wallet = Wallet.createRandom();
  wallet = wallet.connect(provider);

  const identityToken = await getIdentityToken(provider, wallet);
  const loginResponse = await request(app.getHttpServer())
    .post('/v1/login')
    .send({
      identityToken,
    })
    .set(Origin ? { Origin } : {})
    .expect(201);

  return {
    wallet: wallet,
    did: `did:ethr:volta:${wallet.address}`,
    didHex: `did:ethr:0x12047:${wallet.address}`,
    cookies: [
      loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
      loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
    ],
  };
};

export const createRole = async (
  {
    roleName,
    issuerDid,
    revokerDid,
    name,
    ownerAddr,
  }: {
    ownerAddr: string;
    roleName?: string;
    issuerDid?: string[];
    revokerDid?: string[];
    name: string;
  },
  roleService: RoleService
) => {
  const roleNamespace = `${name}.roles.e2e.iam.ewc`;
  return roleService.create(
    await RoleDTO.create({
      name: name,
      namespace: roleNamespace,
      namehash: utils.namehash(roleNamespace),
      owner: ownerAddr,
      definition: {
        requestorFields: [],
        issuerFields: [],
        metadata: {},
        issuer: {
          issuerType: issuerDid ? 'DID' : 'ROLE',
          did: issuerDid
            ? issuerDid.map((did) => `did:ethr:volta:${did}`)
            : undefined,
          roleName,
        },
        revoker: {
          revokerType: revokerDid ? 'DID' : 'ROLE',
          did: revokerDid
            ? revokerDid.map((did) => `did:ethr:volta:${did}`)
            : undefined,
          roleName,
        },
        enrolmentPreconditions: [],
        roleName: name,
        roleType: 'org',
        version: 1,
      },
    })
  );
};
