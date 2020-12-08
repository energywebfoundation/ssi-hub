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
      types = types.filter(t => ["App", "Org", "Role"].includes(t))
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

  /**
   * returns App/Org with namespace matching or similar to provided text
   * @param text fragment of namespace string
   * @return Array of Apps and Orgs
   */
  public async searchByText(text: string): Promise<(Application | Organization)[]> {
    const res = await this.dgraph.query(`{
       data(func: match(namespace, "${text}", 32)) @filter(eq(dgraph.type, ["App", "Org"])) {
          uid
          ${expand}
       }
    }`)
    const json = res.getJson() as {data: (Application | Organization)[]};

    return json.data;

  }
}
