import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { Claim, ClaimDataMessage, DecodedClaimToken, NATS_EXCHANGE_TOPIC } from './ClaimTypes';
import { NatsService } from '../nats/nats.service';
import jwt_decode from "jwt-decode";


type StatusQueryFilter = 'pending' | 'accepted' | null;

const claimQuery = `
  id
  requester
  issuer
  claimType
  token
  issuedToken
  parentNamespace
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

  public async saveOrUpdate(data: ClaimDataMessage): Promise<string> {
    const claim: Claim = await this.getById(data.id);
    if(claim == null) {
      return await this.saveClaim(data);
    } else if(data.issuedToken) {
      const patch: Claim = {
        ...claim,
        ...data,
        isAccepted: true,
        uid: claim.uid,
      }
      await this.dgraph.mutate(patch);
      return claim.uid;
    }
  }

  public async saveClaim(data: ClaimDataMessage): Promise<string> {
    const decodedData: DecodedClaimToken = jwt_decode(data.token);

    const namespace = decodedData.claimData.claimType;

    const parent = namespace.split('.').slice(2).join('.')

    const claim: Claim = {
      ...data,
      isAccepted: false,
      createdAt: Date.now().toString(),
      claimType: decodedData.claimData.claimType,
      parentNamespace: parent,
      uid: '_:new',
      type: 'claim',
    }
    const res = await this.dgraph.mutate(claim);
    return res.getUidsMap().get('new');
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

  async getByParentNamespace(namespace: string) {
    const res = await this.dgraph.query(`
      query all($ns: string) {
        claim(func: eq(parentNamespace, $ns)) {
          ${claimQuery}
        }
      }`, {$ns: namespace})

    return res.getJson();
  }

  async getByUserDid(did: string) {
    const res = await this.dgraph.query(`
      query all($did: string) {
        claim(func: eq(type, "claim")) @filter(eq(issuedToken, $did) OR eq(requester, $did)) {
          ${claimQuery}
        }
      }`, {$did: did})

    return res.getJson();
  }

  async getByIssuer(did: string, status: StatusQueryFilter = null) {
    const filter = this.getIsAccepterFilter(status);
    const res = await this.dgraph.query(`
      query all($did: string) {
        claim(func: eq(issuer, $did)) ${filter} {
          ${claimQuery}
        }
      }`, {$did: did})

    return res.getJson();
  }
  async getByRequester(did: string, status: StatusQueryFilter = null) {
    const filter = this.getIsAccepterFilter(status);
    const res = await this.dgraph.query(`
      query all($did: string) {
        claim(func: eq(requester, $did)) ${filter} {
          ${claimQuery}
        }
      }`, {$did: did})

    return res.getJson();
  }

  private getIsAccepterFilter(status: StatusQueryFilter = null) {
    let filter = '';
    if(status != null) {
      filter = ` @filter(eq(isAccepted, ${status == 'accepted' ? 'true' : 'false'})) `
    }
    return filter;
  }
}
