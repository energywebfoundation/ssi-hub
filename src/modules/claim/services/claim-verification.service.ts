import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger/logger.service';
import { IssuerVerificationService } from './issuer-verification.service';
import { DIDService } from '../../did/did.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { ProofVerifier } from '@ew-did-registry/claims';
import { RoleEIP191JWT, isEIP191Jwt } from '@energyweb/vc-verification';

@Injectable()
export class ClaimVerificationService {
  constructor(
    private readonly logger: Logger,
    private readonly didService: DIDService,
    private readonly issuerVerificationService: IssuerVerificationService,
    private readonly credentialResolver: RoleCredentialResolver
  ) {
    this.logger.setContext(ClaimVerificationService.name);
  }

  /**
   * Resolve a credential from storage and verify its proof/signature and its issuer's authority
   *
   * @param subjectDID The DID to try to resolve a credential for
   * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
   * @return void. Returns boolean indicating if credential is verified. Contains array of error messages if not verified.
   */
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
          `No credential found for role ${roleNamespace} for Did ${subjectDID}`,
        ],
      };
    }
    if (isEIP191Jwt(resolvedCredential)) {
      return this.verifyRoleEIP191JWT(
        resolvedCredential as RoleEIP191JWT,
        subjectDID,
        roleNamespace
      );
    }
  }

  /**
   * Verifies:
   * - That off-chain claim was issued by authorized issuer
   * - That claim is not expired
   * - That off-chain claim proof is valid
   *
   * @param roleEIP191JWT off chain claim to verify
   * @param subjectDID The credential subject
   * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
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
    const isExpired = payload?.exp && payload?.exp < Date.now();
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
        `Verification failed for ${roleNamespace} for ${subjectDID}: Issuer verification failed: ${error}`
      );
    }
    console.log(proofVerified, issuerVerified, isExpired, 'THE VALUES');
    return {
      errors: errors,
      isVerified: !!proofVerified && issuerVerified && !isExpired,
    };
  }

  /**
   * Verifies issued token of the public claim.
   *
   * @param {String} token JWT token of the public claim
   * @param {String} iss DID of the issuer
   * @return DID of the authenticated identity on successful verification or null otherwise
   */
  async verifyPublicClaim(token: string, did: string): Promise<string | null> {
    const didDoc = await this.didService.getById(did);
    const verifier = new ProofVerifier(didDoc);
    return verifier.verifyAssertionProof(token);
  }

  /**
   * Verifies that a user's Did Document contains all roles required for enrolment (enrolment preconditions)
   * @param claimType the role to verify enrollment preconditions for
   * @param userDID the Did of the user seeking to obtain the role. Must posses enrolment preconditions
   * @param conditions enrolment preconditions needed to obtain the role (claimType)
   */
  public async verifyClaimPresentInDidDocument({
    claimType,
    userDID,
    conditions,
  }: {
    claimType: string;
    userDID: string;
    conditions: string[];
  }) {
    const didDocument = await this.didService.getById(userDID);
    const hasConditionAsClaim = didDocument.service.some(
      ({ claimType }) => claimType && conditions.includes(claimType as string)
    );
    console.log(hasConditionAsClaim, 'HAS CONDITION AS CLAIM!!!!');
    if (!hasConditionAsClaim) {
      throw new Error(
        `Role enrolment precondition not met for user: ${userDID} and role: ${claimType}. User does not have this claim.`
      );
    }
  }
}
