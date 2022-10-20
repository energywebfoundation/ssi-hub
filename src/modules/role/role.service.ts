import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { RoleDefinitionDTO, RoleDTO } from './role.dto';
import { DIDService } from '../did/did.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { In, Repository } from 'typeorm';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { Logger } from '../logger/logger.service';
import {
  IRoleDefinition,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
import { Application } from '../application/application.entity';
import { Organization } from '../organization/organization.entity';
import { RoleCredentialResolver } from '../claim/resolvers/credential.resolver';
import { CredentialResolver, RoleEIP191JWT } from '@energyweb/vc-verification';
import { ProofVerifier } from '@ew-did-registry/claims';
import { IssuerVerificationService } from './issuer-verification.service';

@Injectable()
export class RoleService {
  credentialResolver: CredentialResolver;
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly didService: DIDService,
    private readonly appService: ApplicationService,
    private readonly orgService: OrganizationService,
    private readonly issuerVerificationService: IssuerVerificationService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(RoleService.name);
    this.credentialResolver = new RoleCredentialResolver(didService);
  }

  /**
   * returns single Role with matching namespace
   * @param {String} namespace
   */
  public async getByNamespace(namespace: string) {
    return this.roleRepository.findOne({ where: { namespace } });
  }

  /**
   * returns multiple Role with matching namespaces
   * @param {String} namespace
   */
  public async getByNamespaces(namespaces: string[]) {
    return this.roleRepository.find({ where: { namespace: In(namespaces) } });
  }

  /**
   * returns single Role with matching namehash
   * @param {String} namehash
   */
  public async getByNamehash(namehash: string) {
    return this.roleRepository.findOne({ where: { namehash } });
  }

  /**
   * returns single Role with matching owner
   * @param {String} owner
   */
  public async getByOwner(owner: string) {
    return this.roleRepository.find({ where: { owner } });
  }

  public async getAll() {
    return this.roleRepository.find();
  }

  /**
   * return true if role with given namespace exists
   * @param namespace
   */
  public async exists(namespace: string): Promise<boolean> {
    return Boolean(await this.getByNamespace(namespace));
  }

  /**
   * Method for adding new Role to database
   * @param data object containing all needed role properties
   * @return id of newly added Role
   */
  public async create({ appNamespace, orgNamespace, ...data }: RoleDTO) {
    if (appNamespace && orgNamespace) {
      this.logger.debug(
        `Not able to create role: ${data.namespace}, namespace can only have one of parentApp and OrgApp`
      );
      return;
    }

    let parentApp: Application, parentOrg: Organization;

    if (appNamespace) {
      parentApp = await this.appService.getByNamespace(appNamespace);
      if (!parentApp) {
        this.logger.debug(
          `Not able to create role: ${data.namespace}, parent application ${appNamespace} does not exists`
        );
        return;
      }
    }
    if (orgNamespace) {
      parentOrg = await this.orgService.getByNamespace(orgNamespace);
      if (!parentOrg) {
        this.logger.debug(
          `Not able to create role: ${data.namespace}, parent organization ${orgNamespace} does not exists`
        );
        return;
      }
    }

    const isRoleExists = await this.exists(data.namespace);

    if (isRoleExists) {
      this.logger.debug(`Role namespace ${data.namespace} already exists`);

      return;
    }

    const role = Role.create({
      ...data,
      parentApp,
      parentOrg,
    });
    return this.roleRepository.save(role);
  }

  /**
   * Update existing role with given namespace
   * @param namespace target role's namespace
   * @param patch
   */
  public async update(data: RoleDTO) {
    const role = await this.roleRepository.findOne({
      where: {
        namespace: data.namespace,
      },
    });
    if (!role) return this.create(data);

    if (data.appNamespace) {
      const app = await this.appService.getByNamespace(data.appNamespace);
      if (!app) {
        return;
      }
      const updatedRole = Role.create({
        ...role,
        ...data,
        parentApp: app,
      });
      return this.roleRepository.save(updatedRole);
    }
    if (data.orgNamespace) {
      const org = await this.orgService.getByNamespace(data.orgNamespace);
      if (!org) {
        return;
      }
      const updatedRole = Role.create({
        ...role,
        ...data,
        parentOrg: org,
      });
      return this.roleRepository.save(updatedRole);
    }
  }

  /**
   * removes Role with matching namespace
   * @param namespace
   */
  public async remove(namespace: string) {
    const role = await this.getByNamespace(namespace);
    if (!role) {
      return;
    }

    return this.roleRepository.delete(role.id);
  }

  /**
   * removes Role with matching namehash
   * @param namehash
   */
  public async removeByNameHash(namehash: string) {
    return this.roleRepository.delete({ namehash });
  }

  public async verifyUserRoles(did: string) {
    const { service } = await this.didService.getById(did);
    const verifiedRoles = await Promise.all(
      (
        service as unknown as (IServiceEndpoint & {
          claimType?: string;
          claimTypeVersion?: number;
          iss: string;
        })[]
      ).map(({ iss, claimTypeVersion, claimType }) =>
        this.verifyRole({
          issuer: iss,
          namespace: claimType,
          version: claimTypeVersion,
        })
      )
    );
    return verifiedRoles.filter(Boolean);
  }

  public async verifyEnrolmentPrecondition({
    userDID,
    claimType,
  }: {
    userDID: string;
    claimType: string;
  }) {
    const [didDocument, role] = await Promise.all([
      this.didService.getById(userDID),
      this.getByNamespace(claimType),
    ]);

    if (!role) {
      throw new Error(`There is no created role for ${claimType} namespace`);
    }

    const {
      definition: { enrolmentPreconditions },
    } = role;

    if (!enrolmentPreconditions || enrolmentPreconditions.length < 1) return;
    for (const { type, conditions } of enrolmentPreconditions) {
      if (type === 'role' && conditions && conditions?.length > 0) {
        /*
          First, check if the enrolment pre-condition is present in the user's Did Document service array:
          If any pre-required roles are not present, throw and discontinue verification
        */
        const hasConditionAsClaim = didDocument.service.some(
          ({ claimType }) =>
            claimType && conditions.includes(claimType as string)
        );
        if (!hasConditionAsClaim) {
          throw new Error(
            `Role enrolment precondition not met for user: ${userDID} and role: ${claimType}. User does not have this claim.`
          );
        }
        /*
          Second, for each enrolment pre-condition (role), resolve and perform verification on the user's corresponding credential;
          If a credential is not verified, throw an error describing the verification failure
        */
        await Promise.all(
          conditions.map(async (condition) => {
            const { isVerified, errors } =
              await this.resolveCredentialAndVerify(userDID, condition);
            if (!isVerified) {
              throw new Error(
                `Role enrolment precondition not met for user: ${userDID} and role: ${condition}. Verification errors for enrolment preconditions: ${JSON.stringify(
                  errors
                )}`
              );
            }
          })
        );
      }
    }
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

  public async verifyEnrolmentIssuer({
    issuerDID,
    claimType,
  }: {
    issuerDID: string;
    claimType: string;
  }) {
    const [didDocument, role] = await Promise.all([
      this.didService.getById(issuerDID),
      this.getByNamespace(claimType),
    ]);

    if (!role) {
      throw new Error(`There is no created role for ${claimType} namespace`);
    }

    const {
      definition: { issuer },
    } = role;

    const forbiddenError = new ForbiddenException(
      `${issuerDID} is not allowed to issue ${claimType}`
    );
    switch (issuer.issuerType) {
      case 'DID': {
        if (
          !issuer.did
            .map((d) => d.toLowerCase())
            .includes(issuerDID.toLowerCase())
        )
          throw forbiddenError;
        break;
      }
      case 'ROLE': {
        if (
          !didDocument.service.some(
            ({ claimType }) => claimType === issuer.roleName
          )
        )
          throw forbiddenError;
        break;
      }
      default:
        throw new InternalServerErrorException('unknown issuer type');
    }
  }

  private async verifyRole({
    namespace,
    issuer,
    version,
  }: {
    namespace?: string;
    issuer: string;
    version?: number;
  }) {
    if (!namespace) return null;

    const { definition: role } = (await this.getByNamespace(namespace)) || {};
    if (!role) {
      return null;
    }

    if (version && role.version !== version) {
      return null;
    }

    if (role.issuer?.issuerType === 'DID') {
      if (
        Array.isArray(role.issuer?.did) &&
        role.issuer?.did.includes(issuer)
      ) {
        return {
          name: role.roleName,
          namespace,
        };
      }
      return null;
    }

    if (role.issuer?.issuerType === 'Role') {
      const { service: issuerClaims } = await this.didService.getById(issuer);
      const issuerRoles = issuerClaims.map((c) => c.claimType);
      if (issuerRoles.includes(role.issuer.roleName)) {
        return {
          name: role.roleName,
          namespace,
        };
      }
    }
    return null;
  }

  public async handleRoleSyncWithEns({
    owner,
    namespace,
    orgNamespace,
    appNamespace,
    metadata,
    name,
    namehash,
  }: {
    owner: string;
    namespace: string;
    orgNamespace?: string;
    appNamespace?: string;
    metadata: IRoleDefinitionV2 | IRoleDefinition;
    name: string;
    namehash: string;
  }) {
    let dto: RoleDTO;

    try {
      dto = await RoleDTO.create({
        definition: {
          ...(metadata as RoleDefinitionDTO),
        },
        orgNamespace,
        appNamespace,
        owner,
        name,
        namespace,
        namehash,
      });
    } catch (err) {
      this.logger.debug(
        `Validation failed for ${namespace} with errors: ${JSON.stringify(
          err,
          null,
          2
        )}`
      );
      return;
    }

    this.update(dto);
  }
}
