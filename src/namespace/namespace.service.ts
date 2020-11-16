import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { Organization } from '../organization/OrganizationTypes';
import { Application } from '../application/ApplicationTypes';
import { Role } from '../role/RoleTypes';

const expand = `
      expand(_all_) {
       expand(_all_) {
        expand(_all_)
       }
      }
    `

@Injectable()
export class NamespaceService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getByNamespace(namespace: string, full = false, types?: string[]): Promise<Organization | Application | Role> {

    let filters = '';
    if(types) {
      if(!Array.isArray(types)) {
        types = [types];
      }
      filters = `@filter(eq(dgraph.type, [${types.map(a => `"${a}"`).join(',')}]))`
    }

    const res = await this.dgraph.query(`
    {data(func: eq(namespace, "${namespace}")) ${filters} {
      uid
      ${full?expand:''}
    }}`);
    const json = res.getJson();
    return json.data[0];
  }
  public async namespaceExists(namespace: string): Promise<boolean> {
    const res = await this.getByNamespace(namespace)
    return Boolean(res?.uid);
  }

  public async searchByText(text: string): Promise<(Application | Organization)[]> {
    const res = await this.dgraph.query(`{
       data(func: eq(dgraph.type, ["App", "Org"])) {
          uid
          ${expand}
       }
    }`)
    const json = res.getJson() as {data: (Application | Organization)[]};

    if(json?.data?.length > 0) {
      return json.data.filter(orgApp => {
        return orgApp?.namespace?.indexOf(text) >= 0
          || orgApp?.definition?.description?.indexOf(text) >= 0;
      })
    }

    return [];

  }
}
