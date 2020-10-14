import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { Claim, ClaimData, NATS_EXCHANGE_TOPIC } from './ClaimTypes';
import { NatsService } from '../nats/nats.service';

const claimQuery = `
  id
  requester
  issuer
  claimType
  token
  issuedToken
  isAccepted
  createdAt
`;

@Injectable()
export class ClaimService {
  constructor(
    private readonly dgraph: DgraphService,
    private readonly nats: NatsService
  ) {
    this.nats.connection.subscribe(`*.${NATS_EXCHANGE_TOPIC}`, data => {
      const json = JSON.parse(data);
      this.saveOrUpdate(json)
    });
  }

  public async saveOrUpdate(data: ClaimData): Promise<string> {
    const claim: Claim = await this.getById(data.id);
    if(claim == null) {
      this.saveClaim(data);
    } else {
      const patch: Claim = {
        ...claim,
        ...data,
        uid: claim.uid,
      }
      await this.dgraph.mutate(patch);
      return claim.uid;
    }
  }

  public async saveClaim(data: ClaimData): Promise<string> {
    const claim: Claim = {
      ...data,
      isAccepted: false,
      createdAt: Date.now().toString(),
      claimType: '',
      uid: '_:new',
      type: 'claim',
    }
    const res = await this.dgraph.mutate(claim);
    const id = res.getUidsMap().get('new');
    return id;
  }

  public async getById(id: string): Promise<Claim> {
    const res = await this.dgraph.query(`
      query all($id: string) {
        claim(func: eq(id, $id)) {
          ${claimQuery}
        }
      }`, {$id: id})

    const json = res.getJson();
    return json.claim[0];
  }

  async getByIssuer(did: string) {
    const res = await this.dgraph.query(`
      query all($did: string) {
        claim(func: eq(issuer, $did)) {
          ${claimQuery}
        }
      }`, {$did: did})

    return res.getJson();
  }
  async getByRequester(did: string, status: 'pending' | 'accepted' | null = null) {
    let filter = '';
    if(status != null) {
      filter = ` @filter(eq(isAccepted, ${status == 'accepted' ? 'true' : 'false'})) `
    }
    else if(status == 'pending') {}
    const res = await this.dgraph.query(`
      query all($did: string) {
        claim(func: eq(requester, $did)) ${filter} {
          ${claimQuery}
        }
      }`, {$did: did})

    return res.getJson();
  }
}
