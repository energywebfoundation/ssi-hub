import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { NamespaceFragments } from './RoleDTO';
import { RoleDefinition, roleDefinitionFullQuery } from '../Interfaces/Types';

@Injectable()
export class RoleService {
  constructor(
    private readonly dgraph: DgraphService
  ) {}

  public async getAll() {
    const res =  await this.dgraph.query(`
    {roles(func: eq(type, "role")) {
      uid
      name
      namespace
      definition ${roleDefinitionFullQuery}
    }}`)
    return res.getJson();
  }

  public async getByNamespace(namespace: string) {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(type, "role")) {
        uid
        name
        namespace
        definition ${roleDefinitionFullQuery}
      }
    }`, {$i: namespace})
    return res.getJson();
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)).Data.length > 0;
  }

  public async create(name: string, definition: RoleDefinition, namespace: string) {

    const data = {
      uid: "_:new",
      type: "role",
      name,
      namespace,
      definition,
    }

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }

  public splitNamespace(namespace: string): NamespaceFragments {
    const fragments: NamespaceFragments = {
      apps: null,
      roles: null,
      org: null,
      ewc: null,
    };

    const nsf = namespace.split('.');

    for(let i = 0; i < nsf.length; i+=2) {
      fragments[nsf[i+1]] = nsf[i];
    }

    return fragments;
  }

  public getNamespaceOf(fragment: 'org' | 'app' | 'role' = 'org', fragments: NamespaceFragments): string {
    const f = fragments;
    let ns = `${f.org}.org.${f.ewc}.ewc`;

    if(fragment == 'app' || fragment == 'role') {
      if(f.apps == null) {
        return null;
      }
      ns = `${f.apps}.apps.${ns}`
    }
    if(fragment == 'role') {
      if(f.roles == null) {
        return null;
      }
      ns = `${f.roles}.roles.${ns}`
    }

    return ns;
  }
}
