import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { RoleDTO } from './RoleDTO';

@Injectable()
export class RoleService {
  constructor(
    private readonly dgraph: DgraphService
  ) {}

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

  public async getById(id: string) {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: uid($i)) @filter(eq(type, "role")) {
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
      }
    }`, {$i: id})
    return res.getJson();
  }

  public async create(newRole: RoleDTO) {
    const data: RoleDTO = {
      ...newRole,
      uid: "_:new",
      type: "role",
    }

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }

  public async updateById(id: string, data: RoleDTO) {
    const patch: RoleDTO = {
      ...data,
      uid: id,
      type: "role",
    }

    const res = await this.dgraph.mutate(patch);

    return res.getUidsMap().get('new');
  }
}
