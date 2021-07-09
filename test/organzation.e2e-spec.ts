import { INestApplication } from "@nestjs/common";
import { OrganizationDTO } from "../src/modules/organization/organization.dto";
import { OrganizationService } from "../src/modules/organization/organization.service";
import { bootstrapTestInstance } from "./iam-cache-server";

const getOrganization = (): OrganizationDTO => ({
  definition: { orgName: 'orgName' },
  name: 'orgName',
  namespace: 'orgs.ewc.iam',
  owner: 'ownerAddr',
  parentOrg: 'ewc.iam'
});

describe('Organization e2e tests', () => {
  let app: INestApplication;
  let organizationService: OrganizationService;

  beforeAll(async () => {
    try {
      ({ app, organizationService } =
        await bootstrapTestInstance());

      await app.init();
    } catch (e) {
      console.error(e);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow to add organization', async () => {
    await organizationService.create(getOrganization());
  });

});