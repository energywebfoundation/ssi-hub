import { ClaimDataMessage } from './ClaimTypes';
import { IsArray, IsString } from 'class-validator';

export class ClaimRequest implements ClaimDataMessage {
  constructor(data: ClaimDataMessage) {
    this.id = data.id;
    this.claimIssuer = data.claimIssuer;
    this.requester = data.requester;
    this.token = data.token;
  }

  @IsString()
  id: string;

  @IsArray()
  claimIssuer: string[];

  @IsString()
  requester: string;

  @IsString()
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
  id: string;

  @IsString()
  acceptedBy: string;

  @IsArray()
  claimIssuer: string[];

  @IsString()
  issuedToken: string;

  @IsString()
  requester: string;

  @IsString()
  token: string;
}