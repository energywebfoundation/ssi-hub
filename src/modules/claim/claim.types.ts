export const NATS_EXCHANGE_TOPIC = 'claim-exchange';

/**
 * Types inspired by Aries Issue-Credential protocol {@link https://github.com/hyperledger/aries-rfcs/blob/main/features/0453-issue-credential-v2/README.md}
 */

export enum ClaimEventType {
  ISSUE_CREDENTIAL = 'issue-credential',
  REJECT_CREDENTIAL = 'reject-credential',
  REQUEST_CREDENTIALS = 'request-credential',
}

export interface IMessage {
  id: string;
  requester: string;
  claimIssuer?: string[];
}

export interface IClaimRequest extends IMessage {
  token: string;
  claimType: string;
  claimTypeVersion: string;
}

export interface IClaimIssuance extends IMessage {
  issuedToken?: string;
  onChainProof?: string;
  claimType?: string;
  claimTypeVersion?: string;
  acceptedBy: string;
  vp?: string;
}

export interface IClaimRejection extends IMessage {
  isRejected: boolean;
  rejectionReason?: string;
}

export type DecodedClaimToken = {
  claimData: { claimType: string; claimTypeVersion: string };
  sub: string;
};

export enum RegistrationTypes {
  OffChain = 'RegistrationTypes::OffChain',
  OnChain = 'RegistrationTypes::OnChain',
}

export interface IRoleClaim {
  id: string;
  requester: string;
  claimType: string;
  claimTypeVersion: string;
  registrationTypes: RegistrationTypes[];
  token?: string;
  subjectAgreement?: string;
  onChainProof?: string;
  issuedToken?: string;
  isAccepted: boolean;
  acceptedBy?: string;
  isRejected?: boolean;
  rejectionReason?: string;
  namespace: string;
  redirectUri?: string;
}

export interface IClaim {
  issuedToken: string;
  subject: string;
  issuedAt: string;
}
