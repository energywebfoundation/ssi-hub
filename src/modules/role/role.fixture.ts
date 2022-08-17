import { Repository } from 'typeorm';
import { namehash } from '../../ethers/utils';
import { Application } from '../application/application.entity';
import { Organization } from '../organization/organization.entity';
import { Role } from './role.entity';

export const roleFixture = async (
  repo: Repository<Role>,
  owner: string,
  organization?: Organization,
  application?: Application,
  count = 1
) => {
  const roles = [];
  for (let i = 0; i < count; i++) {
    const name = `testRole${i}`;
    const namespace = `${name}.roles.testApp${i}.apps.testOrg${i}.iam.ewc`;
    const namespaceHash = namehash(namespace);
    const definition = {
      version: 1.0,
      enrolmentPreconditions: [],
      roleType: '',
      issuerFields: [],
      requestorFields: [],
      issuer: {
        issuerType: 'Role',
        did: [owner],
        roleName: 'testRole',
      },
      revoker: {
        revokerType: 'Role',
        did: [owner],
        roleName: 'testRole',
      },
      roleName: name,
      metadata: {},
    };

    const role = Role.create({
      name,
      namespace: `${name}.roles.testapp.apps.testApp.iam.ewc`,
      owner,
      definition,
      parentOrg: organization || null,
      parentApp: application || null,
      namehash: namespaceHash,
    });

    roles.push(role);
  }
  return repo.save(roles);
};
