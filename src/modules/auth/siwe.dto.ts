import { SiweMessage } from 'siwe';

export class SiweReqPayload {
  message: SiweMessage;

  signature: string;
}
