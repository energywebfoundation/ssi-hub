export const NATS_EXCHANGE_TOPIC = 'claim.exchange';

export interface IMessage {
  id: string;
  requester: string;
  claimIssuer: string[];
}

export interface IClaimRequest extends IMessage {
  token: string;
  claimType: string;
  claimTypeVersion: string;
}

export interface IClaimIssuance extends IMessage {
  issuedToken?: string;
  acceptedBy: string;
}

export interface IClaimRejection extends IMessage {
  isRejected: boolean;
}

export type DecodedClaimToken = {
  claimData: { claimType: string; claimTypeVersion: string };
};

export enum RegistrationTypes {
  OffChain = "RegistrationTypes::OffChain",
  OnChain = "RegistrationTypes::OnChain"
}

export interface IClaim {
  id: string;
  requester: string;
  claimIssuer: string[];
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
