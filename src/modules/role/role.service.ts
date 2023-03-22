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

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly didService: DIDService,
    private readonly appService: ApplicationService,
    private readonly orgService: OrganizationService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(RoleService.name);
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

  /**
   * Fetches enrolment preconditions for a given role (claim type)
   * @param claimType the role to fetch enrolment preconditions for
   * @return enrolment preconditions for a given role (claim type)
   */
  public async fetchEnrolmentPreconditions({
    claimType,
  }: {
    claimType: string;
  }) {
    const role = await this.getByNamespace(claimType);
    if (!role) {
      throw new Error(`There is no created role for ${claimType} namespace`);
    }

    const {
      definition: { enrolmentPreconditions },
    } = role;
    return enrolmentPreconditions;
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
    this.logger.debug(
      `Syncing role ${namespace} with credential data: ${JSON.stringify(
        metadata
      )}`
    );

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
    this.logger.debug(
      `### Updating DTO for namespace ${namespace}, DTO: ${JSON.stringify(dto)}`
    );
    this.update(dto);
  }
}
