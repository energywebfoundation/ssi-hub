import { Chance } from 'chance';
import { Repository } from 'typeorm';
import { Organization } from '../organization/organization.entity';
import { Application } from './application.entity';

const chance = new Chance();

export const applicationFixture = async (
  repo: Repository<Application>,
  organization: Organization,
  count = 1,
) => {
  const apps = [];
  for (let i = 0; i < count; i++) {
    const name = chance
      .string({ pool: 'abcdefghijklmnopqrstuvwxyz' })
      .toLowerCase();
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
    });
    apps.push(app);
  }
  return repo.save(apps);
};