import { Injectable } from '@nestjs/common';
import { EnsService } from './ens.service';

export const ORG_MOCK_DATA = JSON.stringify({
  orgName: 'onion',
  description: '',
  websiteUrl: '',
  logoUrl: '',
  others: {
    a: '1',
    b: '2',
    c: '3',
  },
});

export const APP_MOCK_DATA = JSON.stringify({
  appName: 'onionapp',
  description: '',
  websiteUrl: '',
  logoUrl: '',
  others: {
    a: '1',
    b: '2',
    c: '3',
  },
});

export const ROLE_MOCK_DATA = JSON.stringify({
  version: '1',
  roleType: 'custom',
  roleName: 'admin',
  fields: [
    {
      fieldType: 'a',
      label: 'bb',
      validation: 'ccc',
    },
  ],
  metadata: {
    a: '1',
    b: '2',
    c: '3',
  },
  issuer: {
    issuerType: 'issuer',
    did: ['did_0000000'],
  },
});

@Injectable()
export class EnsTestService {
  constructor(private ensService: EnsService) {}

  public async testOrgAppRole() {
    await this.ensService.createRole({
      data: ORG_MOCK_DATA,
      namespace: 'onion.iam.ewc',
      owner: 'onion',
    });

    await this.ensService.createRole({
      data: ROLE_MOCK_DATA,
      namespace: 'admin.roles.onion.iam.ewc',
      owner: 'carrot',
    });

    await this.ensService.createRole({
      data: APP_MOCK_DATA,
      namespace: 'onionapp.apps.onion.iam.ewc',
      owner: 'onion',
    });

    await this.ensService.createRole({
      data: ROLE_MOCK_DATA,
      namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
      owner: 'carrot',
    });
  }
}
