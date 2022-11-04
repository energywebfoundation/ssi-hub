import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger/logger.service';
import { IssuerVerificationService } from './issuer-verification.service';
import { DIDService } from '../../did/did.service';
import { RoleCredentialResolver } from '../resolvers/credential.resolver';
import { ProofVerifier } from '@ew-did-registry/claims';
import { RoleEIP191JWT, isEIP191Jwt } from '@energyweb/vc-verification';
import { PreconditionType } from '@energyweb/credential-governance';

@Injectable()
export class ClaimVerificationService {
  credentialResolver: RoleCredentialResolver;
  constructor(
    private readonly logger: Logger,
    private readonly didService: DIDService,
    private readonly issuerVerificationService: IssuerVerificationService
  ) {
    this.logger.setContext(ClaimVerificationService.name);
    this.credentialResolver = new RoleCredentialResolver(didService);
  }

  /**
   * Verifies that a user posesses the necessary roles for enrolment preconditions, and that each role credential is valid
   * @param enrolmentPreconditions the preconditions that must be met for enrolment to a role
   * @param requester the Did that is requesting enrolment
   * @param claimType the role that the user is requesting to enrol to
   */
  public async verifyEnrolmentPreconditions(
    enrolmentPreconditions: {
      type: PreconditionType;
      conditions: string[];
    }[],
    requester: string,
    claimType: string
  ) {
    if (
      enrolmentPreconditions.every(
        (cond) => cond.type === PreconditionType.Role
      )
    ) {
      for (const { conditions } of enrolmentPreconditions) {
        if (conditions?.length > 0) {
          const conditionsInDidDocument =
            await this.verifyClaimPresentInDidDocument({
              userDID: requester,
              conditions,
            });
          if (!conditionsInDidDocument) {
            throw new Error(
              `Role enrolment precondition not met for user: ${requester} and role: ${claimType}. User does not have the required enrolment preconditons.`
            );
          }
          await Promise.all(
            conditions.map(async (condition) => {
              const verificationResult = await this.resolveCredentialAndVerify(
                requester,
                condition
              );
              if (
                !verificationResult?.isVerified &&
                verificationResult?.errors.length > 0
              ) {
                throw new Error(
                  `Role enrolment precondition not met for user: ${requester} for role: ${condition}. Verification errors for enrolment preconditions: ${JSON.stringify(
                    verificationResult?.errors
                  )}`
                );
              }
            })
          );
        }
      }
    } else {
      throw new Error(
        'An enrolment precondition has an unsupported precondition type. Supported precondition types include: "Role"'
      );
    }
  }

  /**
   * Resolve a credential from storage and verify its proof/signature and its issuer's authority
   *
   * @param subjectDID The DID to try to resolve a credential for
   * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
   * @return Returns boolean indicating if credential is verified. Contains array of error messages if not verified.
   */
  public async resolveCredentialAndVerify(
    subjectDID: string,
    roleNamespace: string
  ): Promise<{ isVerified: boolean; errors: string[] }> {
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
      return this.verifyRoleEIP191JWT(resolvedCredential as RoleEIP191JWT);
    }

    return {
      isVerified: false,
      errors: [`Verification not supported for resolved credential type`],
    };
  }

  /**
   * Verifies:
   * - That off-chain claim was issued by authorized issuer
   * - That claim is not expired
   * - That off-chain claim proof is valid
   *
   * @param roleEIP191JWT off chain claim to verify
   * @param subjectDID The credential subject
   * @param roleNamespace The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
   * @return Boolean indicating if verified and array of error messages
   */
  private async verifyRoleEIP191JWT(
    roleEIP191JWT: RoleEIP191JWT
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
      errors.push(`Proof not verified for role`);
    }
    // Date.now() and JWT expiration time both identify the time elapsed since January 1, 1970 00:00:00 UTC
    const isExpired = payload?.exp && payload?.exp * 1000 < Date.now();
    if (isExpired) {
      errors.push(`Credential for prerequisite role expired`);
    }
    const { verified: issuerVerified, error } =
      await this.issuerVerificationService.verifyIssuer(
        issuerDID,
        payload?.claimData?.claimType
      );
    if (!issuerVerified && error) {
      throw new Error(`Issuer verification failed: ${error}`);
    }
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
  private async verifyPublicClaim(
    token: string,
    did: string
  ): Promise<string | null> {
    const didDoc = await this.didService.getById(did);
    const verifier = new ProofVerifier(didDoc);
    return verifier.verifyAssertionProof(token);
  }

  /**
   * Verifies that a user's Did Document contains all roles required for enrolment (enrolment preconditions)
   * @param userDID the Did of the user seeking to obtain the role. Must posses enrolment preconditions
   * @param conditions enrolment preconditions needed to obtain the role (claimType)
   */
  public async verifyClaimPresentInDidDocument({
    userDID,
    conditions,
  }: {
    userDID: string;
    conditions: string[];
  }) {
    const didDocument = await this.didService.getById(userDID);
    return didDocument.service.some(
      ({ claimType }) => claimType && conditions.includes(claimType as string)
    );
  }
}
