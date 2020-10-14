import { DGraphObject, KeyValue } from '../Interfaces/Types';

export const NATS_EXCHANGE_TOPIC = "claim.exchange";

export interface ClaimData {
  id: string;
  token: string;
  issuedToken: string;
  requester: string;
  issuer: string;
}

export interface Claim extends DGraphObject {
  id: string,
  requester: string,
  issuer: string,
  claimType: string,
  token: string,
  issuedToken: string,
  isAccepted: boolean,
  createdAt: string;
}