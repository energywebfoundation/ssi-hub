import { Injectable, Logger } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import { Role } from '../role/RoleTypes';
import { Organization } from '../organization/OrganizationTypes';
import { Application } from '../application/ApplicationTypes';

@Injectable()
export class OwnerService {
  private logger: Logger;
  constructor(private readonly dgraph: DgraphService) {
    this.logger = new Logger('OwnerService');
  }

  /**
   * returns Roles owned by given user
   * @param owner Owner DID
   */
  public async getRolesByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'Role');
  }
  /**
   * returns Apps owned by given user
   * @param owner Owner DID
   */
  public async getAppsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'App');
  }
  /**
   * returns Orgs owned by given user
   * @param owner Owner DID
   */
  public async getOrgsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'Org');
  }

  /**
   * returns any Role/App/Org with matching owner
   * @param owner Owner DID
   * @param type
   * @private
   */
  private async getTypeByOwner(owner: string, type: 'App' | 'Org' | 'Role') {
    const res = await this.dgraph.query(`
    {${type.toLocaleLowerCase()}s(func: eq(owner, "${owner}")) @filter(type(${type})) {
      uid
      name
      owner
      namespace
      definition ${roleDefinitionFullQuery}
      ${
        type === 'Org'
          ? `
      subOrgs: ~parentOrg {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
      }
      `
          : ''
      }
    }}`);
    return res.getJson();
  }

  /**
   * Completely deletes namespace with all sub namespaces
   * @param namespace
   */
  public async deleteNamespace(namespace: string) {
    const res = await this.dgraph.query(`{
      res(func: eq(namespace, "${namespace}")) {
        uid
        expand(_all_) {
          uid
          expand(_all_) {
            uid
            expand(_all_) {
              uid
              expand(_all_) {
                uid
                expand(_all_)
              }
            }
          }
        }
      }
    }`);

    const json = res.getJson();

    const ns: Role & Organization & Application = json.res[0];
    if (!ns) {
      return;
    }

    const getIds = node =>
      [
        node?.uid,
        node?.definition?.uid,
        ...(node?.definition?.fields?.map(f => f.uid) ?? []),
        ...(node?.definition?.metadata?.map(f => f.uid) ?? []),
        ...(node?.definition?.others?.map(f => f.uid) ?? []),
        node?.definition?.issuer?.uid,
        node?.definition?.uid,
      ].filter(u => u !== undefined);

    let ids: string[] = [...getIds(ns)];

    ns?.apps?.forEach(app => {
      ids = ids.concat(getIds(app));

      app.roles?.forEach(role => {
        ids = ids.concat(getIds(role));
      });
    });

    ns?.roles?.forEach(role => {
      ids = ids.concat(getIds(role));
    });

    await this.dgraph.delete(ids);
  }

  /**
   * Changes owner of given namespace
   * @param namespace Target namespace
   * @param newOwner New Owner DID
   */
  public async changeOwner(namespace: string, newOwner: string) {
    const res = await this.dgraph.query(`{
      res(func: eq(namespace, "${namespace}")) {
        uid
        expand(_all_) {
          uid
          expand(_all_) {
             uid
             expand(_all_)
          }
        }
      }
    }`);

    const json = res.getJson();
    const ns = json.res[0];

    if (!ns) {
      return;
    }

    const data = {
      uid: ns.uid,
      owner: newOwner,
    };

    await this.dgraph.mutate(data);

    return ns.uid;
  }
}
