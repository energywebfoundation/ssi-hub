import {
  CredentialResolver,
  IVerifiableCredential,
} from '@energyweb/vc-verification';
import { ClaimService } from '../services';

export class RoleCredentialResolver implements CredentialResolver {
  constructor(private readonly claimService: ClaimService) {}

  async getCredential(
    subject: string,
    claimType: string
  ): Promise<IVerifiableCredential> {
    const claim = await this.claimService.getByClaimType({
      subject,
      claimType,
    });

    // TODO: update when merged https://github.com/energywebfoundation/ew-credentials/pull/28
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return claim?.vp?.verifiableCredential?.[0];
  }

  async getClaimIssuedToken(
    subject: string,
    claimType: string
  ): Promise<string> {
    const claim = await this.claimService.getByClaimType({
      subject,
      claimType,
    });

    return claim?.issuedToken;
  }
}
