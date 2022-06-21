import {
  CredentialResolver,
  VerifiableCredential,
} from '@energyweb/vc-verification';
import { RoleCredentialSubject } from '@energyweb/credential-governance';
import { ClaimService } from '../services';

export class RoleCredentialResolver implements CredentialResolver {
  constructor(private readonly claimService: ClaimService) {}

  async getCredential(
    subject: string,
    claimType: string
  ): Promise<VerifiableCredential<RoleCredentialSubject>> {
    const claim = await this.claimService.getByClaimType({
      subject,
      claimType,
    });

    return claim?.vp
      ?.verifiableCredential?.[0] as VerifiableCredential<RoleCredentialSubject>;
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
