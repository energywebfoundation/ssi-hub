import { IClaimIssuance, IClaimRejection, IClaimRequest } from './ClaimTypes';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimRequest implements IClaimRequest {
  constructor(data: IClaimRequest) {
    this.id = data.id;
    this.claimIssuer = data.claimIssuer;
    this.requester = data.requester;
    this.token = data.token;
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

  @IsString()
  @ApiProperty()
  token: string;
}

export class ClaimIssue implements IClaimIssuance {
  constructor(data: IClaimIssuance) {
    this.id = data.id;
    this.acceptedBy = data.acceptedBy;
    this.claimIssuer = data.claimIssuer;
    this.issuedToken = data.issuedToken;
    this.requester = data.requester;
  }

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  acceptedBy: string;

  @IsArray()
  @ApiProperty()
  claimIssuer: string[];

  @IsString()
  @ApiProperty()
  issuedToken: string;

  @IsString()
  @ApiProperty()
  requester: string;
}

export class ClaimRejection implements IClaimRejection {
  constructor(data: IClaimRejection) {
    this.id = data.id;
    this.claimIssuer = data.claimIssuer;
    this.requester = data.requester;
    this.isRejected = data.isRejected;
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
}
