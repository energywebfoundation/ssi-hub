import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { AppDefinition, RoleDefinition, roleDefinitionFullQuery } from '../Interfaces/Types';

@Injectable()
export class ApplicationService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(type, "app")) {
        uid
        name
        namespace
        definition ${roleDefinitionFullQuery}
      }
    }`);
    return res.getJson();
  }

  public async getRoles(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        namespace
        roles {
          name
          namespace
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    return res.getJson();
  }

  public async getByNamespace(name: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        uid
        name
        namespace
        definition ${roleDefinitionFullQuery}
      }
    }`,
      { $i: name },
    );
    return res.getJson();
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)).Data.length > 0;
  }

  public async create(
    name: string,
    definition: AppDefinition,
    namespace: string,
    owner: string,
  ) {
    const data = {
      uid: '_:new',
      type: 'app',
      name,
      definition,
      namespace,
      owner,
      roles: [],
    };

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }

  public async addRole(id: string, roleDefinitionId: string) {
    const data = {
      uid: id,
      roles: [
        {
          uid: roleDefinitionId,
        },
      ],
    };

    await this.dgraph.mutate(data);

    return id;
  }
}
