import { utils } from 'ethers';
import { RoleDTO } from '../../src/modules/role/role.dto';
import { RoleService } from '../../src/modules/role/role.service';

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
