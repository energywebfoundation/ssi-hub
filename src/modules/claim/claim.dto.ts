import {
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
  RegistrationTypes,
} from './claim.types';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsJWT,
  IsNumberString,
  IsOptional,
  IsString,
  validateOrReject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimRequestDTO implements IClaimRequest {
  static async create(data: Partial<ClaimRequestDTO>) {
    data.claimTypeVersion =
      data.claimTypeVersion?.toString().split('.')[0] ?? '1';
    const dto = new ClaimRequestDTO();
    Object.assign(dto, data);

    // iam-client-lib was passing in request with agreement, so rename to subjectAgreement
    // when https://github.com/energywebfoundation/iam-client-lib/pull/199 is merged, should remove
    dto['agreement'] &&
      delete Object.assign(dto, { ['subjectAgreement']: dto['agreement'] })[
        'agreement'
      ];

    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  requester: string;

  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  claimType: string;

  // Use number string validation because iam-client-lib is passing in number version
  // Is advantageous to have versions be numbers to enable comparisons
  @IsNumberString()
  @ApiProperty()
  claimTypeVersion: string;

  @IsEnum(RegistrationTypes, { each: true })
  // Optional so as to not break existing clients. Can be made mandatory in future.
  @IsOptional()
  @ApiProperty()
  registrationTypes: RegistrationTypes[];

  @IsString()
  // Is not provided if only an off-chain credential is requested
  @IsOptional()
  @ApiProperty()
  subjectAgreement: string;
}

export class ClaimIssueDTO implements IClaimIssuance {
  static async create(data: Partial<ClaimIssueDTO>) {
    const dto = new ClaimIssueDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  acceptedBy: string;

  @IsString()
  // Is not set in the event that only on-chain role is issued
  @IsOptional()
  @ApiProperty()
  issuedToken?: string;

  @IsString()
  @ApiProperty()
  requester: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  onChainProof?: string;
}

export class NewClaimIssueDTO extends ClaimIssueDTO {
  static async create(data: Partial<NewClaimIssueDTO>) {
    data.claimTypeVersion =
      data.claimTypeVersion?.toString().split('.')[0] ?? '1';
    data.registrationTypes = [RegistrationTypes.OffChain];
    const dto = new NewClaimIssueDTO();
    Object.assign(dto, data);

    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  @ApiProperty()
  claimType: string;

  // Use number string validation because iam-client-lib is passing in number version
  // Is advantageous to have versions be numbers to enable comparisons
  @IsNumberString()
  @ApiProperty()
  claimTypeVersion: string;

  @IsEnum(RegistrationTypes, { each: true })
  // Optional so as to not break existing clients. Can be made mandatory in future.
  @IsOptional()
  @ApiProperty()
  registrationTypes: [RegistrationTypes];

  @IsString({ each: true })
  @ApiProperty()
  claimIssuer?: string[];
}

export class ClaimRejectionDTO implements IClaimRejection {
  static async create(data: Partial<ClaimRejectionDTO>) {
    const dto = new ClaimRejectionDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  @ApiProperty()
  id: string;

  @IsArray()
  @ApiProperty()
  claimIssuer: string[];

  @IsString()
  @ApiProperty()
  requester: string;

  @IsBoolean()
  @ApiProperty()
  isRejected: boolean;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}

export class IssuedClaimDTO {
  static async create(data: IssuedClaimDTO) {
    const dto = new IssuedClaimDTO();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsJWT()
  @ApiProperty()
  issuedToken: string;
}
