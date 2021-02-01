import { DGraphObject } from '../Interfaces/DGraphObject';

export const NATS_EXCHANGE_TOPIC = 'claim.exchange';

export interface IMessage {
  id: string;
  requester: string;
  claimIssuer: string[];
}

export interface IClaimRequest extends IMessage {
  token: string;
}

export interface IClaimIssuance extends IMessage {
  issuedToken: string;
  acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
  isRejected: boolean;
}

export type DecodedClaimToken = { claimData: { claimType: string } };

export interface Claim extends DGraphObject {
  id: string;
  requester: string;
  claimIssuer: string[];
  claimType: string;
  token: string;
  issuedToken?: string;
  isAccepted: boolean;
  createdAt: string;
  acceptedBy?: string;
  isRejected?: boolean;
  parentNamespace: string;
}
