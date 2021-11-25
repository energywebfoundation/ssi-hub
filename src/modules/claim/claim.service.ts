import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
  DecodedClaimToken,
  NATS_EXCHANGE_TOPIC,
} from './claim.types';
import { RoleService } from '../role/role.service';
import { Logger } from '../logger/logger.service';
import {
  ClaimIssueDTO,
  ClaimRejectionDTO,
  ClaimRequestDTO,
  IssuedClaimDTO,
  NewClaimIssueDTO,
} from './claim.dto';
import { Claim } from './entities/claim.entity';
import { RoleClaim } from './entities/roleClaim.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NatsService } from '../nats/nats.service';
import jwt from 'jsonwebtoken';
import { v5 } from 'uuid';
import { AssetsService } from '../assets/assets.service';
import { Role } from '../role/role.entity';
interface QueryFilters {
  isAccepted?: boolean;
  namespace?: string;
}

export const UUID_NAMESPACE = '5193850c-2367-4ec4-8c22-95dfbd4a2880';

@Injectable()
export class ClaimService {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
    @InjectRepository(RoleClaim)
    private readonly roleClaimRepository: Repository<RoleClaim>,
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
    private readonly assetService: AssetsService,
    @InjectQueue('claims') private readonly claimQueue: Queue<string>,
    private readonly nats: NatsService,
  ) {
    this.logger.setContext(ClaimService.name);
    this.initializeExchangeListener();
  }

  private initializeExchangeListener() {
    this.nats.connection.subscribe(
      `*.${NATS_EXCHANGE_TOPIC}`,
      {
        queue: 'iam_cache_server_exchange_topic',
      },
      async data => {
        this.logger.debug(`Got message ${data}`);
        await this.claimQueue.add('save', data);
      },
    );
  }

  /**
   * Returns dgraph filter string based on passed options object
   * @param options QueryFilters
   * @return QueryFilters
   * @private
   */
  private parseFilters({ isAccepted, namespace }: QueryFilters): QueryFilters {
    const filters: QueryFilters = {};
    if (isAccepted !== undefined) {
      filters.isAccepted = isAccepted;
    }
    if (namespace) {
      filters.namespace = namespace;
    }
    return filters;
  }

  /**
   * Handles claims saving and updates
   * @param data Raw claim data
   */
  public async handleExchangeMessage(
    data: IClaimIssuance | IClaimRejection | IClaimRequest,
  ): Promise<string> {
    try {
      const claim: RoleClaim = await this.getById(data.id);
      if (!claim && 'token' in data) {
        const {
          claimData: { claimType, claimTypeVersion },
        } = jwt.decode(data.token) as DecodedClaimToken;

        const dto = await ClaimRequestDTO.create({
          ...data,
          claimType,
          claimTypeVersion,
        });

        await this.roleService.verifyEnrolmentPrecondition({
          claimType,
          userDID: dto.requester,
        });

        await this.create(dto);
        return;
      }
      if (!claim && 'issuedToken' in data) {
        const {
          claimData: { claimType, claimTypeVersion },
        } = jwt.decode(data.issuedToken) as DecodedClaimToken;

        const dto = await NewClaimIssueDTO.create({
          ...data,
          claimType,
          claimTypeVersion,
        });

        await this.roleService.verifyEnrolmentPrecondition({
          claimType,
          userDID: dto.requester,
        });

        await this.createAndIssue(dto);
        return;
      }
      if (claim && !claim.isAccepted && 'isRejected' in data) {
        const dto = await ClaimRejectionDTO.create(data);

        await this.reject(dto.id);
        return;
      }

      if (
        (claim && !claim.isRejected && 'issuedToken' in data) ||
        'onChainProof' in data
      ) {
        const dto = await ClaimIssueDTO.create(data);

        await this.issue(dto);
        return;
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  /**
   * Saves claim to database
   * @param data Raw claim data
   */
  public async create(data: ClaimRequestDTO): Promise<RoleClaim> {
    const parent = data.claimType
      .split('.')
      .slice(2)
      .join('.');

    const claim = RoleClaim.create({
      id: ClaimService.idOfClaim(data),
      ...data,
      namespace: parent,
    });
    return this.roleClaimRepository.save(claim);
  }

  /**
   * Saves and issue claim to database
   * @param data Raw claim data
   */
  public async createAndIssue(data: NewClaimIssueDTO): Promise<RoleClaim> {
    const parent = data.claimType
      .split('.')
      .slice(2)
      .join('.');

    const claim = RoleClaim.create({
      id: ClaimService.idOfClaim({ ...data, token: data.issuedToken }),
      ...data,
      namespace: parent,
      token: data.issuedToken,
      isAccepted: true,
    });
    return this.roleClaimRepository.save(claim);
  }

  public async reject(id: string) {
    const claim = await this.roleClaimRepository.findOne(id);
    const updatedClaim = RoleClaim.create({ ...claim, isRejected: true });
    return this.roleClaimRepository.save(updatedClaim);
  }

  public async issue(data: ClaimIssueDTO) {
    const claim = await this.roleClaimRepository.findOne(data.id);
    const updatedClaim = RoleClaim.create({
      ...claim,
      ...data,
      isAccepted: true,
    });
    return this.roleClaimRepository.save(updatedClaim);
  }

  /**
   * returns claim with matching ID
   * @param id claim ID
   */
  public async getById(id: string): Promise<RoleClaim> {
    return this.roleClaimRepository.findOne(id);
  }

  /**
   * returns claims requested for given DIDs
   * @param subjects claim subjects DIDs
   */
  public async getBySubjects({
    subjects,
    filters: { isAccepted, namespace } = {},
    currentUser,
  }: {
    subjects: string[];
    filters?: QueryFilters;
    currentUser?: string;
  }): Promise<RoleClaim[]> {
    const qb = this.roleClaimRepository.createQueryBuilder('claim');
    qb.where('claim.subject IN (:...subjects)', { subjects });

    if (currentUser) {
      await this.filterUserRelatedClaims(currentUser, qb);
    }

    if (isAccepted !== undefined) {
      qb.andWhere('claim.isAccepted = :isAccepted', {
        isAccepted,
      });
    }

    if (namespace) {
      qb.andWhere('claim.namespace = :namespace', {
        namespace,
      });
    }

    return qb.getMany();
  }

  /**
   * returns claims with matching parent namespace
   * eg: passing "A.app" will return all roles in this namespace like "admin.roles.A.app", "user.roles.A.app"
   * @param namespace target parent namespace
   */
  async getByParentNamespace(namespace: string) {
    return this.roleClaimRepository.find({
      where: { namespace },
    });
  }

  /**
   * Get claims requested or issued by user with matching DID
   * @param did user DID
   */
  async getByUserDid({
    did,
    filters: { isAccepted, namespace } = {},
    currentUser,
  }: {
    did: string;
    filters?: QueryFilters;
    currentUser?: string;
  }) {
    const qb = this.roleClaimRepository
      .createQueryBuilder()
      .where(':did = requester', { did });

    if (isAccepted !== undefined) {
      qb.andWhere('"isAccepted" = :isAccepted', {
        isAccepted,
      });
    }

    if (namespace) {
      qb.andWhere('"namespace" = :namespace', {
        namespace,
      });
    }

    if (currentUser) {
      qb.andWhere(
        new Brackets(query => {
          query.where(':currentUser = requester', { currentUser });
        }),
      );
    }
    return qb.getMany();
  }

  /**
   * Get claims issued by user with matching DID
   * @param did issuer's DID
   * @param filters additional filters
   */
  async getByIssuer({
    issuer,
    filters: { isAccepted, namespace } = {},
    currentUser,
  }: {
    issuer: string;
    filters?: QueryFilters;
    currentUser?: string;
  }) {
    const rolesByIssuer = (await this.rolesByIssuer(issuer, namespace)).map(
      r => r.namespace,
    );

    if (rolesByIssuer.length === 0) {
      return [];
    }

    const qb = this.roleClaimRepository
      .createQueryBuilder('claim')
      .where('claim.claimType IN (:...rolesByIssuer)', { rolesByIssuer });

    if (isAccepted !== undefined) {
      qb.andWhere('claim.isAccepted = :isAccepted', {
        isAccepted,
      });
    }

    if (currentUser) {
      await this.filterUserRelatedClaims(currentUser, qb);
    }
    return qb.getMany();
  }

  /**
   * Get claims requested by user with matching DID
   * @param did requester's DID
   * @param filters additional filters
   */
  async getByRequester({
    requester,
    filters: { isAccepted, namespace } = {},
    currentUser,
  }: {
    requester: string;
    filters?: QueryFilters;
    currentUser?: string;
  }) {
    const qb = this.roleClaimRepository
      .createQueryBuilder()
      .where(':requester = requester', { requester });

    if (isAccepted !== undefined) {
      qb.andWhere('"isAccepted" = :isAccepted', {
        isAccepted,
      });
    }

    if (namespace) {
      qb.andWhere('"namespace" = :namespace', {
        namespace,
      });
    }

    if (currentUser) {
      qb.andWhere(
        new Brackets(query => {
          query.where(':currentUser = requester', { currentUser });
        }),
      );
    }
    return qb.getMany();
  }

  /**
   * Get claims issued for given subject
   * @param did subjects's DID
   * @param filters additional filters
   */
  async getBySubject({
    subject,
    filters,
    currentUser,
  }: {
    subject: string;
    filters?: QueryFilters;
    currentUser?: string;
  }) {
    return this.getBySubjects({ subjects: [subject], filters, currentUser });
  }

  /**
   * delete claim with matching ID
   * @param id claim ID
   */
  public async removeById(id: string, currentUser?: string) {
    const claim = await this.getById(id);
    if (
      !claim ||
      (currentUser && claim.requester !== currentUser) ||
      claim.isAccepted ||
      claim.isRejected
    ) {
      throw new ForbiddenException();
    }
    await this.roleClaimRepository.delete(claim.id);
  }

  /**
   * get all DID of requesters of given namespace
   * @param namespace target claim namespace
   * @param isAccepted flag for filtering only accepted claims
   */
  public async getDidOfClaimsOfNamespace(
    namespace: string,
    isAccepted?: boolean,
  ): Promise<string[]> {
    const parsedFilters = this.parseFilters({ isAccepted });
    const claims = await this.roleClaimRepository.find({
      where: [{ ...parsedFilters, claimType: namespace }],
    });
    return claims.map(claim => claim.requester);
  }

  /**
   * Save issued claim
   * @param {IssuedClaimDTO} claim - Issued claim that we want to save
   * @param {string} claim.issuedToken - Issued token
   */
  public async saveIssuedClaim(claim: IssuedClaimDTO) {
    const { issuedToken } = claim;
    const newIssuedClaim = Claim.create({ issuedToken });
    const issuedClaim = await this.claimRepository.findOne({
      where: {
        subject: newIssuedClaim.subject,
        issuedToken,
      },
    });

    if (issuedClaim) return;
    return this.claimRepository.save(newIssuedClaim);
  }

  /**
   * Save issued claim
   * @param {Array} claim - DIDs whose issued claims are being requested
   */
  public async getIssuedClaimsBySubjects(subjects: string[]) {
    return this.claimRepository.find({
      where: {
        subject: In(subjects),
      },
      select: ['issuedAt', 'issuedToken', 'subject'],
    });
  }

  static idOfClaim(claimReq: {
    token: string;
    claimType: string;
    claimTypeVersion: string;
  }) {
    const { token, claimType: role, claimTypeVersion: version } = claimReq;
    const { sub: subject } = jwt.decode(token);
    return v5(JSON.stringify({ subject, role, version }), UUID_NAMESPACE);
  }

  public async rolesByIssuer(
    issuer: string,
    namespace?: string,
  ): Promise<Role[]> {
    const rolesOfIssuer = (
      await this.getBySubject({
        subject: issuer,
        filters: { isAccepted: true },
      })
    ).map(r => r.claimType);
    const roles = (await this.roleService.getAll()).filter(
      r =>
        r.definition.issuer.did?.includes(issuer) ||
        rolesOfIssuer.includes(r.definition.issuer.roleName),
    );
    return namespace
      ? roles.filter((r: Role) => r.namespace === namespace)
      : roles;
  }

  private async filterUserRelatedClaims(
    currentUser: string,
    qb: SelectQueryBuilder<RoleClaim>,
  ) {
    const ownedAssets = (await this.assetService.getByOwner(currentUser)).map(
      a => a.id,
    );
    const offeredAssets = (
      await this.assetService.getByOfferedTo(currentUser)
    ).map(a => a.id);

    const rolesByUser = (await this.rolesByIssuer(currentUser)).map(
      r => r.namespace,
    );

    qb.andWhere(
      new Brackets(query => {
        query
          .where('claim.subject = :currentUser', { currentUser })
          .orWhere('claim.requester = :currentUser', { currentUser });
        if (rolesByUser.length > 0) {
          query.orWhere('claim.claimType IN (:...rolesByUser)', {
            rolesByUser,
          });
        }
        if (ownedAssets.length > 0) {
          query.orWhere('claim.subject IN (:...ownedAssets)', { ownedAssets });
        }
        if (offeredAssets.length > 0) {
          query.orWhere('claim.subject IN (:...offeredAssets)', {
            offeredAssets,
          });
        }
      }),
    );
  }
}
