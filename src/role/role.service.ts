import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { NamespaceFragments, RoleDTO } from './RoleDTO';

@Injectable()
export class RoleService {
  constructor(
    private readonly dgraph: DgraphService
  ) {}

  public async namespaceExists(namespace: string) {
    const res = await this.dgraph.query(`
    
    query all($i: string){
      Data(func: eq(namespace, $i)) {
         namespace
      }
    }
    `, {
      $i: namespace
    })
    console.log(res.getJson())
    return res.getJson();
  }

  public async getAll() {
    const res =  await this.dgraph.query(`
    {roles(func: eq(type, "role")) {
      uid
      metadata {
         key
         value
      }
      address
      namespace
      fields {
         type
         label
         validation
      }
    }}`)
    return res.getJson();
  }

  public async getByNamespace(id: string) {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(type, "role")) {
        uid
        metadata {
           key
           value
        }
        address
        namespace
        fields {
           type
           label
           validation
        }
        children
      }
    }`, {$i: id})
    return res.getJson();
  }

  public async create(newRole: RoleDTO) {

    const data: RoleDTO = {
      ...newRole,
      uid: "_:new",
      type: "role",
      ...this.splitNamespace(newRole.namespace),
    }

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }

  public async updateById(id: string, data: RoleDTO) {
    let patch: RoleDTO = {
      ...data,
      uid: id,
      type: "role",
    }

    if(data.namespace) {
      patch = {
        ...patch,
        ...this.splitNamespace(data.namespace)
      }
    }

    const res = await this.dgraph.mutate(patch);

    return res.getUidsMap().get('new');
  }

  private splitNamespace(namespace: string): NamespaceFragments {
    const fragments: NamespaceFragments = {
      apps: null,
      roles: null,
      org: null,
      ewc: null,
    };

    const nsf = namespace.split('.');

    fragments.roles = nsf[0];

    for(let i = 1; i < nsf.length; i+=2) {
      fragments[nsf[i+1]] = nsf[i];
    }

    return fragments;
  }
}
