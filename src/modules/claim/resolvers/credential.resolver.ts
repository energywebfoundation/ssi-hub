import {
  CredentialResolver,
  isEIP191Jwt,
  isVerifiableCredential,
  RoleEIP191JWT,
  transformClaim,
  VerifiableCredential,
} from '@energyweb/vc-verification';
import { RolePayload } from '@energyweb/vc-verification';
import { RoleCredentialSubject } from '@energyweb/credential-governance';
import * as jwt from 'jsonwebtoken';
import { DIDService } from '../../did/did.service';
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleCredentialResolver implements CredentialResolver {
  constructor(private readonly didService: DIDService) {}

  async getCredential(
    did: string,
    namespace: string
  ): Promise<
    VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT | null
  > {
    const resolvedEndpoints = await this.didService.resolveCredentials(did);
    return (
      this.serviceEndpointsToCredentials(resolvedEndpoints).find(
        (cred) => cred?.credentialSubject?.role?.namespace === namespace
      ) ||
      this.serviceEndpointsToEIP191(resolvedEndpoints).find(
        (token) => token.payload.claimData.claimType === namespace
      )
    );
  }

  async getVerifiableCredential(
    subject: string,
    namespace: string
  ): Promise<VerifiableCredential<RoleCredentialSubject> | null> {
    return (await this.credentialsOf(subject)).find(
      (credential) =>
        credential?.credentialSubject?.role?.namespace === namespace
    );
  }

  async getEIP191JWT(
    subject: string,
    claimType: string
  ): Promise<RoleEIP191JWT | null> {
    return (await this.eip191JwtsOf(subject)).find(
      (token) => token.payload.claimData.claimType === claimType
    );
  }

  async eip191JwtsOf(subject: string): Promise<RoleEIP191JWT[]> {
    return this.serviceEndpointsToEIP191(
      await this.didService.resolveCredentials(subject)
    );
  }

  async credentialsOf(
    subject: string
  ): Promise<VerifiableCredential<RoleCredentialSubject>[]> {
    return this.serviceEndpointsToCredentials(
      await this.didService.resolveCredentials(subject)
    );
  }

  /**
   * Finds EIP191 role tokens among service endpoints
   *
   * @param tokens resolved service endpoints of DID document services
   * @returns EIP191 role tokens
   */
  serviceEndpointsToEIP191(tokens: string[]): RoleEIP191JWT[] {
    return tokens
      .map((token) => {
        try {
          const decoded = jwt.decode(token) as RolePayload;
          return {
            eip191Jwt: token,
            payload: decoded,
          };
        } catch (_) {
          return {};
        }
      })
      .filter(isEIP191Jwt)
      .map((claim) => transformClaim(claim));
  }

  /**
   * Finds verifiable credentials among service endpoints
   *
   * @param tokens resolved service endpoints of DID document services
   * @returns verifiable credentials
   */
  serviceEndpointsToCredentials(
    tokens: string[]
  ): VerifiableCredential<RoleCredentialSubject>[] {
    return tokens
      ?.map((token) => {
        try {
          return JSON.parse(token);
        } catch (_) {
          return {};
        }
      })
      .filter(isVerifiableCredential);
  }

  getDIDDocument(did: string): Promise<IDIDDocument> {
    return this.didService.getById(did);
  }
}
