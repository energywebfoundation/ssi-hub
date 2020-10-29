import { ClaimDataMessage } from './ClaimTypes';
import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimRequest implements ClaimDataMessage {
  constructor(data: ClaimDataMessage) {
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

export class ClaimIssue implements ClaimDataMessage {

  constructor(data: ClaimDataMessage) {
    this.id = data.id;
    this.acceptedBy = data.acceptedBy;
    this.claimIssuer = data.claimIssuer;
    this.issuedToken = data.issuedToken;
    this.requester = data.requester;
    this.token = data.token;
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

  @IsString()
  @ApiProperty()
  token: string;
}