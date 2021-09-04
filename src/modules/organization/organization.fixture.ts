import { Chance } from 'chance';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

const chance = new Chance();

export const organizationFixture = async (
  repo: Repository<Organization>,
  count = 1,
) => {
  const parentOrg = Organization.create({
    name: 'parentOrg',
    namespace: `parentOrg.iam.ewc`,
    owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
    definition: {
      orgName: 'parentOrg.iam.ewc',
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    },
  });

  await repo.save(parentOrg);

  const organizations = [];
  for (let i = 0; i < count; i++) {
    const name = chance
      .string({ pool: 'abcdefghijklmnopqrstuvwxyz' })
      .toLowerCase();
    const definition = {
      orgName: name,
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    };
    const org = Organization.create({
      name,
      namespace: `${name}.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition,
      parentOrg,
    });
    organizations.push(org);
  }
  return repo.save(organizations);
};
