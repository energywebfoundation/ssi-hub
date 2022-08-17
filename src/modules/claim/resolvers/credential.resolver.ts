import jsonwebtoken from 'jsonwebtoken';
import {
  CredentialResolver,
  RoleEIP191JWT,
  VerifiableCredential,
} from '@energyweb/vc-verification';
import { ClaimData } from '@energyweb/vc-verification/dist/src/models';
import { RoleCredentialSubject } from '@energyweb/credential-governance';
import { IPublicClaim } from '@ew-did-registry/claims';
import { ClaimService } from '../services';
import { RegistrationTypes } from '../claim.types';

export class RoleCredentialResolver implements CredentialResolver {
  constructor(private readonly claimService: ClaimService) {}
  async getCredential(
    did: string,
    namespace: string
  ): Promise<
    VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT | null
  > {
    return (
      (await this.getVerifiableCredential(did, namespace)) ||
      (await this.getEIP191JWT(did, namespace))
    );
  }

  async getVerifiableCredential(
    subject: string,
    claimType: string
  ): Promise<VerifiableCredential<RoleCredentialSubject> | null> {
    const claim = await this.claimService.getByClaimType({
      subject,
      claimType,
    });

    return claim?.vp
      ?.verifiableCredential?.[0] as VerifiableCredential<RoleCredentialSubject>;
  }

  async getEIP191JWT(
    subject: string,
    claimType: string
  ): Promise<RoleEIP191JWT | null> {
    const claim = await this.claimService.getByClaimType({
      subject,
      claimType,
    });
    if (
      !claim ||
      !claim.registrationTypes.includes(RegistrationTypes.OffChain)
    ) {
      return null;
    }

    const { issuedToken } = claim;
    const { claimData, signer, credentialStatus } = jsonwebtoken.decode(
      issuedToken
    ) as IPublicClaim & { claimData: ClaimData };

    return {
      payload: {
        credentialStatus,
        claimData,
        signer,
      },
      eip191Jwt: issuedToken,
    };
  }
}
