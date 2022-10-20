import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger/logger.service';
import { IssuerVerificationService } from './issuer-verification.service';
import { DIDService } from '../../did/did.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { ProofVerifier } from '@ew-did-registry/claims';
import { CredentialResolver, RoleEIP191JWT } from '@energyweb/vc-verification';

@Injectable()
export class ClaimVerificationService {
  credentialResolver: CredentialResolver;
  constructor(
    private readonly logger: Logger,
    private readonly didService: DIDService,
    private readonly issuerVerificationService: IssuerVerificationService
  ) {
    this.logger.setContext(ClaimVerificationService.name);
    this.credentialResolver = new RoleCredentialResolver(didService);
  }

  public async resolveCredentialAndVerify(
    subjectDID: string,
    roleNamespace: string
  ) {
    const resolvedCredential = await this.credentialResolver.getCredential(
      subjectDID,
      roleNamespace
    );
    if (!resolvedCredential) {
      return {
        isVerified: false,
        errors: [
          `No credential found for required enrolment pre-condition for ${subjectDID} and role: ${roleNamespace}`,
        ],
      };
    }
    return this.verifyRoleEIP191JWT(
      resolvedCredential as RoleEIP191JWT,
      subjectDID,
      roleNamespace
    );
  }

  /**
   * Verifies:
   * - That off-chain claim was issued by authorized issuer
   * - That claim is not expired
   * - That off-chain claim proof is valid
   *
   * @param {OffChainClaim} off chain claim to verify
   * @return Boolean indicating if verified and array of error messages
   */
  async verifyRoleEIP191JWT(
    roleEIP191JWT: RoleEIP191JWT,
    subjectDID: string,
    roleNamespace: string
  ): Promise<{ isVerified: boolean; errors: string[] }> {
    const { payload, eip191Jwt } = roleEIP191JWT;
    const errors: string[] = [];
    const issuerDID = roleEIP191JWT.payload?.iss;
    if (!issuerDID) {
      throw new Error('No issuer specified for credential');
    }
    const proofVerified = await this.verifyPublicClaim(
      eip191Jwt,
      payload?.iss as string
    );
    if (!proofVerified) {
      errors.push(
        `Verification failed for ${roleNamespace} for ${subjectDID}: Proof not verified for role`
      );
    }
    // Date.now() and JWT expiration time both identify the time elapsed since January 1, 1970 00:00:00 UTC
    const isExpired = payload?.exp && payload?.exp * 1000 < Date.now();
    if (isExpired) {
      errors.push(
        `Verification failed for ${roleNamespace} for ${subjectDID}: Credential for prerequisite role expired`
      );
    }
    const { verified: issuerVerified, error } =
      await this.issuerVerificationService.verifyIssuer(
        issuerDID,
        payload?.claimData?.claimType
      );
    if (!issuerVerified && error) {
      throw new Error(
        `Verification failed for ${roleNamespace} for ${subjectDID}: No Issuer Specified for ${roleNamespace} for ${subjectDID}`
      );
    }
    return {
      errors: errors,
      isVerified: !!proofVerified && issuerVerified && !isExpired,
    };
  }

  async verifyPublicClaim(token: string, did: string): Promise<string | null> {
    const didDoc = await this.didService.getById(did);
    const verifier = new ProofVerifier(didDoc);
    return verifier.verifyAssertionProof(token);
  }
}
