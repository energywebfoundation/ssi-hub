import { providers, utils, Wallet } from 'ethers';
import request from 'supertest';
import { RoleDTO } from '../../src/modules/role/role.dto';
import { RoleService } from '../../src/modules/role/role.service';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';

export const provider = new providers.JsonRpcProvider(process.env.ENS_URL);

export const createRole = async (
  {
    roleName,
    did,
    name,
    ownerAddr,
  }: {
    ownerAddr: string;
    roleName?: string;
    did?: string;
    name: string;
  },
  roleService: RoleService
) => {
  const roleNamespace = `${name}.roles.e2e.iam.ewc`;
  roleService.create(
    await RoleDTO.create({
      name: name,
      namespace: roleNamespace,
      namehash: utils.namehash(roleNamespace),
      owner: ownerAddr,
      definition: {
        fields: [],
        metadata: {},
        issuer: {
          issuerType: did ? 'DID' : 'ROLE',
          did: did ? [`did:ethr:volta:${did}`] : undefined,
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

export const randomUser = async () => {
  let wallet = Wallet.createRandom();
  wallet = wallet.connect(provider);

  const identityToken = await getIdentityToken(provider, wallet);
  const loginResponse = await request(app.getHttpServer())
    .post('/v1/login')
    .send({
      identityToken,
    })
    .expect(201);

  return {
    wallet: wallet,
    did: `did:ethr:volta:${wallet.address}`,
    cookies: [
      loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
      loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
    ],
  };
};
