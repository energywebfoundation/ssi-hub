import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import {
  Claim,
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
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
  acceptedBy
  type
`;

interface QueryFilters {
  accepted?: boolean;
  namespace?: string;
}

@Injectable()
export class ClaimService {
  constructor(private readonly dgraph: DgraphService) {}

  /**
   * Handles claims saving and updates
   * @param data Raw claim data
   */
  public async saveOrUpdate(
    data: IClaimIssuance | IClaimRejection | IClaimRequest,
  ): Promise<string> {
    const claim: Claim = await this.getById(data.id);
    if (!claim && 'token' in data) {
      return await this.saveClaim(data);
    }
    if (claim && !claim.isAccepted && 'isRejected' in data) {
      const patch: Claim = {
        ...claim,
        isRejected: data.isRejected,
        uid: claim.uid,
      };
      await this.dgraph.mutate(patch);
      return claim.uid;
    }

    if (claim && !claim.isRejected && 'issuedToken' in data) {
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

  /**
   * Saves claim to database
   * @param data Raw claim data
   */
  public async saveClaim(data: IClaimRequest): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const decodedData: DecodedClaimToken = jwt_decode(data.token);

    const namespace = decodedData.claimData.claimType;

    const parent = namespace
      .split('.')
      .slice(2)
      .join('.');

    const claim: Claim = {
      ...data,
      id: data.id,
      isAccepted: false,
      isRejected: false,
      createdAt: Date.now().toString(),
      claimType: decodedData.claimData.claimType,
      parentNamespace: parent,
      uid: '_:new',
      'dgraph.type': 'Claim',
    };
    const res = await this.dgraph.mutate(claim);
    return res.getUidsMap().get('new');
  }

  /**
   * returns claim with matching ID
   * @param id claim ID
   */
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

  /**
   * returns claims with matching parent namespace
   * eg: passing "A.app" will return all roles in this namespace like "admin.roles.A.app", "user.roles.A.app"
   * @param namespace target parent namespace
   */
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

  /**
   * Get claims requested or issued by user with matching DID
   * @param did user DID
   */
  async getByUserDid(did: string) {
    const res = await this.dgraph.query(
      `
      query all($did: string) {
        claim(func: type(Claim) @filter(eq(issuedToken, $did) OR eq(requester, $did)) {
          ${claimQuery}
        }
      }`,
      { $did: did },
    );

    return res.getJson();
  }

  /**
   * Get claims issued by user with matching DID
   * @param did issuer's DID
   * @param filters additional filters
   */
  async getByIssuer(did: string, filters: QueryFilters = {}) {
    const filter = this.getFilters(filters);
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

  /**
   * Get claims requested by user with matching DID
   * @param did requester's DID
   * @param filters additional filters
   */
  async getByRequester(did: string, filters: QueryFilters = {}) {
    const filter = this.getFilters(filters);
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

  /**
   * delete claim with matching ID
   * @param id claim ID
   */
  public async removeById(id: string) {
    const claim = await this.getById(id);
    if (claim && claim.uid) {
      try {
        this.dgraph.delete(claim.uid);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  /**
   * Returns dgraph filter string based on passed options object
   * @param options config object
   * @return string
   * @private
   */
  private getFilters(options: QueryFilters): string {
    const filters: string[] = [];
    if (options.accepted !== undefined) {
      filters.push(`eq(isAccepted, ${options.accepted})`);
    }
    if (options.namespace) {
      filters.push(`eq(parentNamespace, ${options.namespace})`);
    }
    return ` @filter(${filters.join(' AND ')}) `;
  }

  /**
   * get all DID of requesters of given namespace
   * @param namespace target claim namespace
   * @param accepted flag for filtering only accepted claims
   */
  public async getDidOfClaimsOfnamespace(
    namespace: string,
    accepted?: boolean,
  ): Promise<string[]> {
    const filters: string[] = [`eq(claimType, "${namespace}")`];
    if (accepted !== undefined) {
      filters.push(`eq(isAccepted, ${accepted})`);
    }
    const query = `{
      data(func: has(requester)) @filter(${filters.join(' AND ')}) {
        claimType
        requester
      }
    }`;
    const res = await this.dgraph.query(query);
    const json = res.getJson();

    if (json?.data?.length) {
      return json.data.map(c => c.requester);
    }

    return [];
  }
}
