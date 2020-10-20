import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import {
  Claim,
  ClaimDataMessage,
  DecodedClaimToken,
} from './ClaimTypes';
import * as jwt_decode from 'jwt-decode';

const claimQuery = `
  uid
  id
  requester
  claimIssuer
  claimType
  token
  issuedToken
  parentNamespace
  isAccepted
  createdAt
`;

interface QueryFilters {
  accepted?: boolean;
  namespace?: string;
}

@Injectable()
export class ClaimService {
  constructor(private readonly dgraph: DgraphService){}

  public async saveOrUpdate(data: ClaimDataMessage): Promise<string> {
    const claim: Claim = await this.getById(data.id);
    if (!claim) {
      return await this.saveClaim(data);
    }

    if (claim && data.issuedToken) {
      const patch: Claim = {
        ...claim,
        issuedToken: data.issuedToken,
        acceptedBy: data.acceptedBy,
        isAccepted: true,
        uid: claim.uid,
      };
      await this.dgraph.mutate(patch);
      return claim.uid;
    }
  }

  public async saveClaim({
    ...data
  }: ClaimDataMessage): Promise<string> {
    const decodedData: DecodedClaimToken = jwt_decode(data.token);

    const namespace = decodedData.claimData.claimType;

    const parent = namespace
      .split('.')
      .slice(2)
      .join('.');

    const claim: Claim = {
      ...data,
      isAccepted: false,
      createdAt: Date.now().toString(),
      claimType: decodedData.claimData.claimType,
      parentNamespace: parent,
      uid: '_:new',
      'dgraph.type': 'Claim',
    };
    const res = await this.dgraph.mutate(claim);
    return res.getUidsMap().get('new');
  }

  public async getById(id: string): Promise<Claim> {
    const res = await this.dgraph.query(
      `
      query all($id: string) {
        claim(func: eq(id, $id)) {
          ${claimQuery}
        }
      }`,
      { $id: id },
    );

    const json = res.getJson();
    return json.claim[0];
  }

  async getByParentNamespace(namespace: string) {
    const res = await this.dgraph.query(
      `
      query all($ns: string) {
        claim(func: eq(parentNamespace, $ns)) {
          ${claimQuery}
        }
      }`,
      { $ns: namespace },
    );

    return res.getJson();
  }

  async getByUserDid(did: string) {
    const res = await this.dgraph.query(
      `
      query all($did: string) {
        claim(func: eq(type, "claim")) @filter(eq(issuedToken, $did) OR eq(requester, $did)) {
          ${claimQuery}
        }
      }`,
      { $did: did },
    );

    return res.getJson();
  }

  async getByIssuer(did: string, filters: QueryFilters = {}) {
    const filter = this.getIsAccepterFilter(filters);
    const res = await this.dgraph.query(
      `
      query all($did: string) {
        claim(func: eq(claimIssuer, $did)) ${filter} {
          ${claimQuery}
        }
      }`,
      { $did: did },
    );

    return res.getJson();
  }
  async getByRequester(did: string, filters: QueryFilters = {}) {
    const filter = this.getIsAccepterFilter(filters);
    const res = await this.dgraph.query(
      `
      query all($did: string) {
        claim(func: eq(requester, $did)) ${filter} {
          ${claimQuery}
        }
      }`,
      { $did: did },
    );

    return res.getJson();
  }

  public async removeById(id: string) {
    const claim = await this.getById(id)
    console.log(claim);
    if(claim && claim.uid) {
      try {
        this.dgraph.delete(claim.uid);
        return true;
      } catch(err) {
        return false
      }
    }
    return false;
  }

  private getIsAccepterFilter(options: QueryFilters) {
    const filters: string[] = [];
    if (options.accepted !== undefined) {
      filters.push(`eq(isAccepted, ${options.accepted})`);
    }
    if (options.namespace) {
      filters.push(`eq(parentNamespace, ${options.namespace})`);
    }
    return ` @filter(${filters.join(' AND ')}) `;
  }
}
