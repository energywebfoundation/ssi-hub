import { Chance } from 'chance';
import { utils } from 'ethers';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

const { namehash } = utils;
const chance = new Chance();

export const organizationFixture = async (
  repo: Repository<Organization>,
  owner:string,
  count = 1
) => {
  const parentOrg = Organization.create({
    name: 'parentOrg',
    namespace: `parentOrg.iam.ewc`,
    owner,
    definition: {
      orgName: 'parentOrg.iam.ewc',
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    },
    namehash: namehash('parentOrg.iam.ewc'),
  });

  await repo.save(parentOrg);

  const organizations = [];
  for (let i = 0; i < count; i++) {
    const name = `testOrg${i}`;
    const namespace = `testOrg${i}.iam.ewc`;
    const namespacehash = namehash(namespace);

    const definition = {
      orgName: name,
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    };
    const org = Organization.create({
      name,
      namespace,
      owner,
      definition,
      parentOrg,
      namehash: namespacehash,
    });
    organizations.push(org);
  }
  return repo.save(organizations);
};
