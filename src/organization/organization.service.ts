import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly dgraph: DgraphService
  ) {}

  public async getAll() {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(type, "org")) {
        uid
      }
    }`)
    return res.getJson();
  }

  public async getById(id: string) {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: uid($i)) @filter(eq(type, "org")) {

      }
    }`, {$i: id})
    return res.getJson();
  }

  public async create() {
    const data = {
      uid: "_:new",
      type: "org"
    }

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }
}
