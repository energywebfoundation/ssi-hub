import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly dgraph: DgraphService
  ) {}

  public async getById(id: string) {
    const res =  await this.dgraph.query(`
    query all($i: string){
      Data(func: uid($i)) {

      }
    }`, {$i: id})
    return res.getJson();
  }

  public async create() {
    const data = {
      uid: "_:new"
    }

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
  }
}
