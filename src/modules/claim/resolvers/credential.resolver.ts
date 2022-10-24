import {
  CredentialResolver,
  IDIDDocumentCache,
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
    const resolvedEndpoints = await this.didService.resolveServiceEndpoints(
      did
    );
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
    console.log('in get eip!', subject, claimType);
    const theTokens = await this.eip191JwtsOf(subject);
    console.log(claimType, 'THE CLAIM TYPE WE NEED!!!!');
    console.log(theTokens, 'THE TOKENS!!!!');
    const theEips = theTokens.find((token) => {
      console.log(token, 'THE TOKEN!!!');
      return token.payload.claimData.claimType === claimType;
    });
    // const theEIPS =  (await this.eip191JwtsOf(subject)).find(
    //   (token) => token.payload.claimData.claimType === claimType
    // );
    console.log(theEips, 'THE EIPS');
    return theEips;
  }

  async eip191JwtsOf(subject: string): Promise<RoleEIP191JWT[]> {
    const resolvedServiceEndpoints =
      await this.didService.resolveServiceEndpoints(subject);
    console.log(
      resolvedServiceEndpoints,
      'THE RESOLVED SERVICE ENDPOINTS!!!!!!!!****'
    );
    const eipResult = this.serviceEndpointsToEIP191(resolvedServiceEndpoints);
    console.log(eipResult, 'THE EIPR RESULT!!!!!!****');
    return eipResult;
  }

  async credentialsOf(
    subject: string
  ): Promise<VerifiableCredential<RoleCredentialSubject>[]> {
    return this.serviceEndpointsToCredentials(
      await this.didService.resolveServiceEndpoints(subject)
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
        console.log(token, 'EACH TOKEN');
        try {
          const decoded = jwt.decode(token) as RolePayload;
          console.log(decoded, 'THE DECOKDED TOKEN');
          return {
            eip191Jwt: token,
            payload: decoded,
          };
        } catch (e) {
          console.log(e, 'IS THERE AN ERRORR?');
          return {};
        }
      })
      .filter((token) => {
        console.log(token, 'THE TOKEN BEING CHECKED!!!');
        console.log(isEIP191Jwt(token), 'IS EIP???');
        return isEIP191Jwt(token);
      })
      .map((claim) => transformClaim(claim as RoleEIP191JWT));
  }

  /**
   * Finds verifiable credentials among service ednpoints
   *
   * @param tokens resolved service endpoints of DID document services
   * @returns verifiable credentials
   */
  serviceEndpointsToCredentials(
    tokens: string[]
  ): VerifiableCredential<RoleCredentialSubject>[] {
    return tokens
      .map((token) => {
        try {
          return JSON.parse(token);
        } catch (_) {
          return {};
        }
      })
      .filter(isVerifiableCredential);
  }

  /**
   * Fetches DID Document for the given DID
   * @param did subject DID
   * @param didDocumentCache Cache to store DIDDocument. Cache is updated with Document retrieved for the DID
   * @returns
   */
  async getDIDDocument(
    did: string,
    didDocumentCache?: IDIDDocumentCache
  ): Promise<IDIDDocument> {
    const cachedDIDDocument = didDocumentCache?.getDIDDocument(did);
    if (cachedDIDDocument) {
      return cachedDIDDocument;
    }
    const resolvedDIDDocument =
      await this.didService.getDIDDocumentFromUniversalResolver(did);
    didDocumentCache?.setDIDDocument(did, resolvedDIDDocument);
    return resolvedDIDDocument;
  }
}
