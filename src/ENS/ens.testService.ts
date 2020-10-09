import { Injectable } from '@nestjs/common';
import { EnsService } from './ens.service';

@Injectable()
export class EnsTestService {
  constructor(
    private ensService: EnsService,
  ) {
  }

  public async testOrgAppRole() {
    await this.ensService.createRole({
      data: JSON.stringify({
        roleType: 'org',
        orgName: 'onion',
        description: '',
        websiteUrl: '',
        logoUrl: '',
        others: {
          a: '1',
          b: '2',
          c: '3',
        },
      }),
      namespace: 'onion.org.iam.ewc',
      owner: 'onion',
    });

    await this.ensService.createRole({
      data: JSON.stringify({
        version: '1',
        roleType: 'custom',
        roleName: 'moderator',
        fields: [],
        metadata: {},
      }),
      namespace: 'admin.roles.onion.org.iam.ewc',
      owner: 'carrot',
    });

    await this.ensService.createRole({
      data: JSON.stringify({
        roleType: 'app',
        appName: 'onionapp',
        description: '',
        websiteUrl: '',
        logoUrl: '',
        others: {
          a: '1',
          b: '2',
          c: '3',
        },
      }),
      namespace: 'onionapp.apps.onion.org.iam.ewc',
      owner: 'onion',
    });

    await this.ensService.createRole({
      data: JSON.stringify({
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
      }),
      namespace: 'admin.roles.onionapp.apps.onion.org.iam.ewc',
      owner: 'carrot',
    });
  }
}