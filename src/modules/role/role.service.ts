import { Injectable } from '@nestjs/common';
import { IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { RoleDTO } from './role.dto';
import { DIDService } from '../did/did.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { ApplicationService } from '../application/application.service';
import { OrganizationService } from '../organization/organization.service';
import { Logger } from '../logger/logger.service';
import { IRoleDefinition } from '@energyweb/iam-contracts';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly didService: DIDService,
    private readonly appService: ApplicationService,
    private readonly orgService: OrganizationService,
    private readonly logger: Logger,
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
  public async exists(namespace: string) {
    return Boolean(await this.getByNamespace(namespace));
  }

  /**
   * Method for adding new Role to database
   * @param data object containing all needed role properties
   * @return id of newly added Role
   */
  public async create({ appNamespace, orgNamespace, ...data }: RoleDTO) {
    if (appNamespace) {
      const app = await this.appService.getByNamespace(appNamespace);
      if (!app) {
        this.logger.debug(
          `Not able to create role: ${data.namespace}, parent application ${appNamespace} does not exists`,
        );
        return;
      }
      const role = Role.create({ ...data, parentApp: app });
      return this.roleRepository.save(role);
    }
    if (orgNamespace) {
      const org = await this.orgService.getByNamespace(orgNamespace);
      if (!org) {
        this.logger.debug(
          `Not able to create application: ${data.namespace}, parent organization ${orgNamespace} does not exists`,
        );
        return;
      }
      const role = Role.create({ ...data, parentOrg: org });
      return this.roleRepository.save(role);
    }
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
      const updatedRole = Role.create({ ...role, ...data, parentApp: app });
      return this.roleRepository.save(updatedRole);
    }
    if (data.orgNamespace) {
      const org = await this.orgService.getByNamespace(data.orgNamespace);
      if (!org) {
        return;
      }
      const updatedRole = Role.create({ ...role, ...data, parentOrg: org });
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

  public async verifyUserRoles(did: string) {
    const { service } = await this.didService.getById(did);
    const verifiedRoles = await Promise.all(
      ((service as unknown) as (IServiceEndpoint & {
        claimType?: string;
        claimTypeVersion?: number;
        iss: string;
      })[]).map(({ iss, claimTypeVersion, claimType }) =>
        this.verifyRole({
          issuer: iss,
          namespace: claimType,
          version: claimTypeVersion,
        }),
      ),
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
        const conditionMet = didDocument.service.some(
          ({ claimType }) =>
            claimType && conditions.includes(claimType as string),
        );
        if (!conditionMet) {
          throw new Error(
            `Role enrolment precondition not met for user: ${userDID} and role: ${claimType}`,
          );
        }
      }
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
      const issuerRoles = issuerClaims.map(c => c.claimType);
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
  }: {
    owner: string;
    namespace: string;
    orgNamespace?: string;
    appNamespace?: string;
    metadata: IRoleDefinition;
    name: string;
  }) {
    let dto: RoleDTO;

    try {
      dto = await RoleDTO.create({
        definition: {
          ...(metadata as any),
        },
        orgNamespace,
        appNamespace,
        owner,
        name,
        namespace,
      });
    } catch (err) {
      this.logger.debug(
        `Validation failed for ${namespace} with errors: ${JSON.stringify(
          err,
          null,
          2,
        )}`,
      );
      return;
    }

    this.update(dto);
  }
}
