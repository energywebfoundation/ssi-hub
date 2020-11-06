import { Injectable } from '@nestjs/common';
import { EnsService } from './ens.service';
import { DgraphService } from '../dgraph/dgraph.service';

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
    did: ['did_0000000']
  }
});

interface Res {
  uid: string;
  type: string;
  'dgraph.type': string[];
  definition: {
    uid: string;
    'dgraph.type': string[];
    issuer: {
      uid: string;
      'dgraph.type': string[];
    }
    others?: {
      uid: string;
      'dgraph.type': string[];
    }[]
    metadata?: {
      uid: string;
      'dgraph.type': string[];
    }[]
    fields?: {
      uid: string;
      'dgraph.type'?: string;
    }[]
  }
}

@Injectable()
export class EnsTestService {
  constructor(
    private ensService: EnsService,
    private readonly dgraph: DgraphService
  ) {}

  private async query<T>(query: string): Promise<T> {
    const res = await this.dgraph.query(query)
    const json = res.getJson();
    return json.old;
  }

  public async TypesFix(): Promise<number> {
    const typesMap = {
      role: 'Role',
      org: 'Org',
      app: 'App',
    }
    const a = await this.query<Res[]>(`{
      old(func: has(type)) {
        uid
        type
        dgraph.type
        definition {
          uid
          dgraph.type
          issuer {
            uid
            dgraph.type
          }
          others {
            uid
            dgraph.type
          }
          metadata {
            uid
            dgraph.type
          }
          fields {
            uid
            dgraph.type
          }
        }
      }
    }`);

    console.log(JSON.stringify(a, null, 2));

    const idTypePairs: [string,string,string[]][] = [];

    a.forEach(node => {
      if(node?.type) {
        const dtype = typesMap[node.type];
        if(!dtype) {
          console.log('unknown type ' + node.type);
        } else {
          idTypePairs.push([node.uid, dtype, node['dgraph.type']]);

          if(node?.definition) {
            idTypePairs.push([node.definition.uid, dtype + "Definition", node.definition['dgraph.type']]);
          }
        }
      }

      if(node?.definition) {
        if(node.definition.issuer) {
          idTypePairs.push([node.definition.issuer.uid, "RoleIssuer", node.definition.issuer['dgraph.type']])
        }

        if(node.definition.others) {
          node.definition.others.forEach(other => {
            idTypePairs.push([other.uid, "KeyValue", other['dgraph.type']])
          })
        }
        if(node.definition.metadata) {
          node.definition.others.forEach(md => {
            idTypePairs.push([md.uid, "KeyValue", md['dgraph.type']])
          })
        }
        if(node.definition.fields) {
          node.definition.others.forEach(field => {
            idTypePairs.push([field.uid, "Field", field['dgraph.type']])
          })
        }
      }
    })

    const mutationArray = [];

    idTypePairs.forEach(([uid, dtype, currentType]) => {
      if(currentType === undefined || dtype !== currentType[0]) {
        mutationArray.push({
          uid,
          'dgraph.type': dtype
        })
      }
    })

    await this.dgraph.mutate(mutationArray);

    return mutationArray.length

  }

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
