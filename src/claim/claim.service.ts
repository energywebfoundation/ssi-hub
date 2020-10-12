import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { ClaimDefinitionDTO } from './ClaimDTO';
import { ClaimDefinition } from './ClaimTypes';

@Injectable()
export class ClaimService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getClaimById(id: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      ClaimDefinition(func: uid($i)) {
         uid
         title
         owner
         issuer
         attributes {
            uid
            key
            value
         }
      }
    }`,
      { $i: id },
    );
    console.log(res);
    return res.getJson();
  }

  public async addClaim(data: ClaimDefinitionDTO) {
    const p: ClaimDefinition = {
      uid: '_:new',
      type: 'claimDefinition',
      namespace: data.namespace,
      title: data.title,
      owner: data.owner,
      issuer: data.issuer,
      attributes: [],
    };

    const res = await this.dgraph.mutate(p);

    return res.getUidsMap().get('new');
  }

  public async addAttributes(id: string, attrs: [string, string][]) {
    const p = {
      uid: id,
      attributes: attrs.map(([key, value]) => ({ key, value })),
    };

    const res = await this.dgraph.mutate(p);

    return res.getUidsMap();
  }
}
