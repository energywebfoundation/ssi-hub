import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { IClaimIssuance, DecodedClaimToken } from '../claim.types';
import { RoleService } from '../../role/role.service';
import { Logger } from '../../logger/logger.service';
import { ClaimIssueDTO, NewClaimIssueDTO } from '../claim.dto';
import { RoleClaim } from '../entities/roleClaim.entity';
import { ClaimHandleResult } from '../claim-handle-result.dto';

@Injectable()
export class ClaimIssuanceService {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
    @InjectRepository(RoleClaim)
    private readonly roleClaimRepository: Repository<RoleClaim>
  ) {
    this.logger.setContext(ClaimIssuanceService.name);
  }

  /**
   * Handles claim issuance request saving and updates.
   * Two scenarios are handled - issue requested claim and issue not-requested claim
   * @param rq IClaimIssuance request
   */
  public async handleClaimIssuanceRequest(
    rq: IClaimIssuance,
    previouslyRequestedClaim: RoleClaim | undefined
  ): Promise<ClaimHandleResult> {
    if (!rq.issuedToken && !rq.onChainProof) {
      throw new BadRequestException('issuedToken or onChainProof is required');
    }

    if (!previouslyRequestedClaim) {
      return this.handleClaimWithoutPreviousRequest(rq);
    } else if (
      previouslyRequestedClaim &&
      !previouslyRequestedClaim.isRejected
    ) {
      return this.handleClaimWithPreviousRequest(rq, previouslyRequestedClaim);
    }

    throw new BadRequestException('claim issuance criteria not met');
  }

  private async handleClaimWithoutPreviousRequest(
    rq: IClaimIssuance
  ): Promise<ClaimHandleResult> {
    let claimType: string;
    let claimTypeVersion: string;

    if (rq.issuedToken) {
      const { claimData } = jwt.decode(rq.issuedToken) as DecodedClaimToken;
      claimType = claimData.claimType;
      claimTypeVersion = claimData.claimTypeVersion;
    } else {
      claimType = rq.claimType;
      claimTypeVersion = rq.claimTypeVersion;
    }

    // TODO: add verification of on-chain proof
    // if (
    //   rq.onChainProof &&
    //   !this.verifyOnChainProof
    // ) {
    //   return ClaimHandleResult.Failure('on-chain proof verification failed');
    // }

    if (!claimType || !claimTypeVersion) {
      return ClaimHandleResult.Failure('claim type or version not provided');
    }

    const dto = await NewClaimIssueDTO.create({
      ...rq,
      claimType,
      claimTypeVersion,
    });

    const enrolmentPreconditions =
      await this.roleService.fetchEnrolmentPreconditions({
        claimType: dto.claimType,
      });
    await this.roleService.verifyEnrolmentPrecondition({
      claimType,
      userDID: dto.requester,
      enrolmentPreconditions,
    });

    await this.roleService.verifyEnrolmentIssuer({
      issuerDID: dto.acceptedBy,
      claimType: dto.claimType,
    });

    // await this.roleService.verifyEnrolmentPrecondition({
    //   claimType: dto.claimType,
    //   userDID: dto.requester,
    // });

    await this.createAndIssue(dto, dto.requester);

    return ClaimHandleResult.Success();
  }

  private async handleClaimWithPreviousRequest(
    rq: IClaimIssuance,
    previouslyRequestedClaim: RoleClaim
  ): Promise<ClaimHandleResult> {
    await this.roleService.verifyEnrolmentIssuer({
      issuerDID: rq.acceptedBy,
      claimType: previouslyRequestedClaim.claimType,
    });

    // TODO: add verification of on-chain proof
    // if (
    //   rq.onChainProof &&
    //   !this.verifyOnChainProof
    // ) {
    //   return ClaimHandleResult.Failure('on-chain proof verification failed');
    // }

    const dto = await ClaimIssueDTO.create(rq);
    await this.issue(dto);

    return ClaimHandleResult.Success();
  }

  /**
   * Saves and issue claim to database
   * @param data Raw claim data
   */
  private async createAndIssue(
    data: NewClaimIssueDTO,
    subject: string
  ): Promise<RoleClaim> {
    const parent = data.claimType.split('.').slice(2).join('.');

    const claim = RoleClaim.create({
      ...data,
      subject,
      namespace: parent,
      isAccepted: true,
      vp: data?.vp ? JSON.parse(data.vp) : undefined,
    });
    return this.roleClaimRepository.save(claim);
  }

  /**
   * Issue claim to database
   * @param data Raw claim data
   */
  private async issue(data: ClaimIssueDTO) {
    const claim = await this.roleClaimRepository.findOneBy({ id: data.id });
    const updatedClaim = RoleClaim.create({
      ...claim,
      ...data,
      isAccepted: true,
      vp: data?.vp ? JSON.parse(data.vp) : undefined,
    });
    return this.roleClaimRepository.save(updatedClaim);
  }
}
