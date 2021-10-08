import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationDefinitionDTO, OrganizationDTO } from './organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { Logger } from '../logger/logger.service';
import { IOrganizationDefinition } from '@energyweb/iam-contracts';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(OrganizationService.name);
  }

  /**
   * Returns all Apps belonging to Organization with matching namespace
   * @param namespace
   */
  public async getApps(namespace: string) {
    const { apps, id } =
      (await this.orgRepository.findOne({
        where: { namespace },
        relations: ['apps'],
      })) || {};

    if (!id) {
      throw new NotFoundException();
    }

    return apps || [];
  }

  /**
   * Returns all Role belonging to Organization with matching namespace
   * @param namespace
   */
  public async getRoles(namespace: string) {
    const { roles, id } =
      (await this.orgRepository.findOne({
        where: { namespace },
        relations: ['roles'],
      })) || {};

    if (!id) {
      throw new NotFoundException();
    }

    return roles || [];
  }

  /**
   * Returns all SubOrgs belonging to Organization with matching namespace
   * @param namespace
   */
  public async getSubOrgs(namespace: string) {
    const { subOrgs, id } =
      (await this.orgRepository.findOne({
        where: {
          namespace,
        },
      })) || {};

    if (!id) {
      throw new NotFoundException();
    }

    return subOrgs || [];
  }

  /**
   * returns single Org with matching namespace
   * @param {String} namespace
   */
  public async getByNamespace(namespace: string) {
    return this.orgRepository.findOne({
      where: { namespace },
      relations: ['subOrgs', 'subOrgs.subOrgs'],
    });
  }

  /**
   * returns single Org with matching namehash
   * @param {String} namehash
   */
  public async getByNamehash(namehash: string) {
    return this.orgRepository.findOne({
      where: { namehash },
      relations: ['subOrgs', 'subOrgs.subOrgs'],
    });
  }

  /**
   * returns single Org with matching namespace
   * @param {String} owner
   */
  public async getByOwner(owner: string) {
    return this.orgRepository.find({
      where: { owner },
      relations: ['subOrgs'],
    });
  }

  /**
   * return true if Org with given namespace exists
   * @param namespace
   */
  public async exists(namespace: string): Promise<boolean> {
    return Boolean(await this.getByNamespace(namespace));
  }

  /**
   * Method for adding new Org to database
   * @param data object containing all needed Org properties
   * @return id of newly added Org
   */
  public async create({ parentOrg, ...data }: OrganizationDTO) {
    const parentOrganization = await this.getByNamespace(parentOrg);
    const orgExists = await this.exists(data.namespace);
    if (orgExists) {
      this.logger.debug(`namespace ${data.namespace} already exists`);
      return;
    }
    const org = Organization.create({ ...data, parentOrg: parentOrganization });
    return this.orgRepository.save(org);
  }

  /**
   * Update existing Org with given namespace
   * @param namespace target Org's namespace
   * @param patch
   */
  public async update({ parentOrg, ...data }: OrganizationDTO) {
    const org = await this.orgRepository.findOne({
      where: {
        namespace: data.namespace,
      },
    });

    if (!org) return this.create({ ...data, parentOrg });
    const parentOrganization = await this.getByNamespace(parentOrg);
    const updatedOrg = Organization.create({
      ...org,
      ...data,
      parentOrg: parentOrganization,
    });
    return this.orgRepository.save(updatedOrg);
  }

  /**
   * removes Organization with matching namespace
   * @param namespace
   */
  public async remove(namespace: string) {
    const org = await this.getByNamespace(namespace);
    if (!org) {
      return;
    }

    return this.orgRepository.delete(org.id);
  }

  /**
   * removes Organization with matching namehash
   * @param namehash
   */
  public async removeByNameHash(namehash: string) {
    return this.orgRepository.delete({ namehash });
  }

  public async handleOrgSyncWithEns({
    owner,
    namespace,
    parentOrgNamespace,
    metadata,
    name,
    namehash,
  }: {
    owner: string;
    namespace: string;
    parentOrgNamespace: string;
    metadata: IOrganizationDefinition;
    name: string;
    namehash: string;
  }) {
    let dto: OrganizationDTO;

    try {
      const definitionDTO = await OrganizationDefinitionDTO.create(metadata);

      dto = await OrganizationDTO.create({
        definition: definitionDTO,
        parentOrg: parentOrgNamespace,
        owner,
        namespace,
        name,
        namehash,
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
