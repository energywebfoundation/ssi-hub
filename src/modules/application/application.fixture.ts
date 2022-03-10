import { Chance } from 'chance';
import { utils } from 'ethers';
import { Repository } from 'typeorm';
import { Organization } from '../organization/organization.entity';
import { Application } from './application.entity';

const { namehash } = utils;
const chance = new Chance();

export const applicationFixture = async (
  repo: Repository<Application>,
  organization: Organization,
  count = 1
) => {
  const apps = [];
  for (let i = 0; i < count; i++) {
    const name = `testApp${i}`;
    const namespace = `${name}.apps.testOrg${i}.iam.ewc`;
    const namespaceHash = namehash(namespace);

    const definition = {
      appName: name,
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    };

    const app = Application.create({
      name,
      namespace: `testapp.apps.${name}.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition,
      parentOrg: organization,
      namehash: namespaceHash,
    });
    apps.push(app);
  }
  return repo.save(apps);
};
