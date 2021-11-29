export const NATS_EXCHANGE_TOPIC = 'claim-exchange';

export enum ClaimRequestType {
  CLAIM_ISSUANCE = 'credential-issued',
  CLAIM_REJECTION = 'credential-rejected',
  CLAIM_ENROLMENT_REQUEST = 'request-credential',
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
  acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
  isRejected: boolean;
}

export type DecodedClaimToken = {
  claimData: { claimType: string; claimTypeVersion: string };
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
  token: string;
  subjectAgreement?: string;
  onChainProof?: string;
  issuedToken?: string;
  isAccepted: boolean;
  acceptedBy?: string;
  isRejected?: boolean;
  namespace: string;
}

export interface IClaim {
  issuedToken: string;
  subject: string;
  issuedAt: string;
}
