import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { Organization } from '../organization/organization.types';
import { Application } from '../application/application.types';
import { Role } from '../role/role.types';
import { NamespaceEntities } from './namespace.types';

const expand = `
      expand(_all_) {
       expand(_all_) {
        expand(_all_)
       }
      }
    `;

@Injectable()
export class NamespaceService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getByNamespace(
    namespace: string,
    full = false,
    types?: string[],
  ): Promise<Organization | Application | Role> {
    let filters = '';
    if (types) {
      if (!Array.isArray(types)) {
        types = [types];
      }
      types = types.filter(t => ['App', 'Org', 'Role'].includes(t));
      filters = `@filter(eq(dgraph.type, [${types
        .map(a => `"${a}"`)
        .join(',')}]))`;
    }

    const res = await this.dgraph.query(`
    {data(func: eq(namespace, "${namespace}")) ${filters} {
      uid
      ${full ? expand : ''}
    }}`);
    const json = res.getJson();

    return json.data[0];
  }
  public async namespaceExists(namespace: string): Promise<boolean> {
    const res = await this.getByNamespace(namespace);
    return Boolean(res?.uid);
  }

  /**
   * returns App/Org with namespace matching or similar to provided text
   * @param text fragment of namespace string
   * @return Array of Apps and Orgs
   */
  public async searchByText(
    text: string,
    types?: NamespaceEntities[],
  ): Promise<(Application | Organization | Role)[]> {
    const { typeDefinitionFilters, typeFilters } = (types || []).reduce(
      (filters, type, index) => {
        if (index > 0) {
          filters.typeFilters += ` OR `;
          filters.typeDefinitionFilters += ` OR `;
        }
        filters.typeFilters += `type(${type})`;
        filters.typeDefinitionFilters += `type(${type}Definition)`;
        return filters;
      },
      { typeFilters: '', typeDefinitionFilters: '' } as {
        typeFilters: string;
        typeDefinitionFilters: string;
      },
    );
    const typeQuery = `{
        data(
          func: has(namespace))
          @filter(
            ${typeFilters ? `(${typeFilters}) AND` : ''}
            (regexp(namespace, /${text}/i) OR
            regexp(name, /${text}/i))
          ) {
            uid
            name
            definition {
              uid
              expand(_all_)
            }
            owner
            namespace
        }
      }`;

    const directNamespacesPromise = this.dgraph.query(typeQuery);

    const typeDefinitionQuery = `{
      data(func:has(description)) 
        @filter(
          ${typeDefinitionFilters ? `(${typeDefinitionFilters}) AND` : ''}
          (regexp(websiteUrl, /${text}/) OR regexp(description, /${text}/))
          AND has(~definition)
        ) {
        ~definition {
          uid
          name
          definition {
            uid
            expand(_all_)
          }
          owner
          namespace
        }
      }
      }`;

    const reverseNamespacesPromise = this.dgraph.query(typeDefinitionQuery);
    const [
      directNamespacesResponse,
      reverseNamespacesResponse,
    ] = await Promise.all([directNamespacesPromise, reverseNamespacesPromise]);
    const reverseNamespaces = reverseNamespacesResponse.getJson() as {
      data: {
        '~definition': (Application | Organization | Role)[];
      }[];
    };
    const namespaces = reverseNamespaces.data.reduce(
      (acc, { '~definition': def }) => {
        acc.push(...def);
        return acc;
      },
      [] as (Application | Organization | Role)[],
    );
    const { data: directNamespaces } = directNamespacesResponse.getJson() as {
      data: (Application | Organization | Role)[];
    };
    const unique: Record<string, Application | Organization | Role> = {};
    for (const { uid, ...rest } of [...directNamespaces, ...namespaces]) {
      if (unique[uid]) continue;
      unique[uid] = { uid, ...rest };
    }
    return Object.values(unique);
  }
}
