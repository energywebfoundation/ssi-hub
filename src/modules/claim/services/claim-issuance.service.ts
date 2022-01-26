import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { utils } from 'ethers';
import {
  erc712_type_hash,
  proof_type_hash,
  typedMsgPrefix,
  defaultClaimExpiry,
} from 'iam-client-lib';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { IClaimIssuance, DecodedClaimToken } from '../claim.types';
import { RoleService } from '../../role/role.service';
import { Logger } from '../../logger/logger.service';
import { ClaimIssueDTO, NewClaimIssueDTO } from '../claim.dto';
import { RoleClaim } from '../entities/roleClaim.entity';
import { ClaimService } from './claim.service';
import { ClaimHandleResult } from '../claim-handle-result.dto';

@Injectable()
export class ClaimIssuanceService {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
    @InjectRepository(RoleClaim)
    private readonly roleClaimRepository: Repository<RoleClaim>,
    private readonly configService: ConfigService
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
    }

    if (previouslyRequestedClaim && !previouslyRequestedClaim.isRejected) {
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

    if (
      rq.onChainProof &&
      !this.verifyOnChainProof(rq.onChainProof, {
        subject: rq.requester,
        roleType: claimType,
        roleVersion: claimTypeVersion,
        signer: rq.acceptedBy,
      })
    ) {
      return ClaimHandleResult.Failure('on-chain proof verification failed');
    }

    if (!claimType || !claimTypeVersion) {
      return ClaimHandleResult.Failure('claim type or version not provided');
    }

    await this.roleService.verifyEnrolmentIssuer({
      issuerDID: rq.acceptedBy,
      claimType,
    });

    const dto = await NewClaimIssueDTO.create({
      ...rq,
      claimType,
      claimTypeVersion,
    });

    await this.roleService.verifyEnrolmentPrecondition({
      claimType,
      userDID: dto.requester,
    });

    await this.createAndIssue(dto, rq.requester);

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

    if (
      rq.onChainProof &&
      !this.verifyOnChainProof(rq.onChainProof, {
        subject: rq.requester,
        roleType: previouslyRequestedClaim.claimType,
        roleVersion: previouslyRequestedClaim.claimTypeVersion,
        signer: rq.acceptedBy,
      })
    ) {
      return ClaimHandleResult.Failure('on-chain proof verification failed');
    }

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
      id: ClaimService.idOfClaim({ ...data, subject }),
      ...data,
      namespace: parent,
      isAccepted: true,
    });
    return this.roleClaimRepository.save(claim);
  }

  /**
   * Issue claim to database
   * @param data Raw claim data
   */
  private async issue(data: ClaimIssueDTO) {
    const claim = await this.roleClaimRepository.findOne(data.id);
    const updatedClaim = RoleClaim.create({
      ...claim,
      ...data,
      isAccepted: true,
    });
    return this.roleClaimRepository.save(updatedClaim);
  }

  private verifyOnChainProof(
    onChainProof: string,
    data: {
      subject: string;
      roleType: string;
      roleVersion: string;
      signer: string;
    }
  ) {
    const domainSeparator = utils.keccak256(
      utils.defaultAbiCoder.encode(
        ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
        [
          erc712_type_hash,
          utils.id('Claim Manager'),
          utils.id('1.0'),
          this.configService.get<number>('CHAIN_ID'),
          this.configService.get<string>('CLAIM_MANAGER_ADDRESS'),
        ]
      )
    );

    const proofHash = utils.solidityKeccak256(
      ['bytes', 'bytes32', 'bytes32'],
      [
        Buffer.from(typedMsgPrefix, 'hex'),
        domainSeparator,
        utils.keccak256(
          utils.defaultAbiCoder.encode(
            ['bytes32', 'address', 'bytes32', 'uint', 'uint', 'address'],
            [
              proof_type_hash,
              addressOf(data.subject),
              utils.namehash(data.roleType),
              data.roleVersion,
              defaultClaimExpiry,
              addressOf(data.signer),
            ]
          )
        ),
      ]
    );

    return (
      utils.verifyMessage(utils.arrayify(proofHash), onChainProof) ===
      addressOf(data.signer)
    );
  }
}
