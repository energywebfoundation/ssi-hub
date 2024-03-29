import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationDefinitionDTO, ApplicationDTO } from './application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { Logger } from '../logger/logger.service';
import { OrganizationService } from '../organization/organization.service';
import { IAppDefinition } from '@energyweb/credential-governance';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly organizationService: OrganizationService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(ApplicationService.name);
  }

  /**
   * returns single App with matching namespace
   * @param {String} namespace
   */
  public async getByNamespace(namespace: string): Promise<Application> {
    return this.applicationRepository.findOne({
      where: { namespace },
    });
  }

  /**
   * returns single App with matching namehash
   * @param {String} namehash
   */
  public async getByNamehash(namehash: string): Promise<Application> {
    return this.applicationRepository.findOne({
      where: { namehash },
    });
  }

  /**
   * Returns applications owned by `owner`
   * @param {String} owner
   * @param {object} [object.withRelations] if true each application will include its roles
   */
  public async getByOwner(
    owner: string,
    { withRelations = true }: { withRelations?: boolean } = {}
  ) {
    const qb = this.applicationRepository.createQueryBuilder('application');
    qb.where('application.owner = :owner', { owner });
    if (withRelations) {
      qb.leftJoinAndSelect('application.roles', 'role');
    }
    return qb.getMany();
  }

  /**
   * Returns all Roles belonging to Application with matching namespace
   * @param namespace
   */
  public async getRoles(namespace: string) {
    const { roles, id } =
      (await this.applicationRepository.findOne({
        where: { namespace },
        relations: ['roles'],
      })) || {};
    if (!id) {
      throw new NotFoundException();
    }
    return roles || [];
  }

  /**
   * return true if App with given namespace exists
   * @param namespace
   */
  public async exists(namespace: string): Promise<boolean> {
    return Boolean(await this.getByNamespace(namespace));
  }

  /**
   * Method for adding new App to database
   * @param data object containing all needed App properties
   * @return id of newly added App
   */
  public async create({ parentOrg, ...data }: ApplicationDTO) {
    const org = await this.organizationService.getByNamespace(parentOrg);
    if (!org) {
      this.logger.debug(
        `Not able to create application: ${data.namespace}, parent organization ${parentOrg} does not exists`
      );
      return;
    }

    const isAppExists = await this.exists(data.namespace);

    if (isAppExists) {
      this.logger.debug(
        `Not able to create application: ${data.namespace} already exists`
      );
      return;
    }
    const app = Application.create({ ...data, parentOrg: org });
    return this.applicationRepository.save(app);
  }

  /**
   * Update existing App with given namespace
   * @param namespace target App's namespace
   * @param patch
   */
  public async update({ parentOrg, ...data }: ApplicationDTO) {
    const app = await this.applicationRepository.findOne({
      where: {
        namespace: data.namespace,
      },
    });
    if (!app) {
      return this.create({ ...data, parentOrg });
    }
    const org = await this.organizationService.getByNamespace(parentOrg);
    const updatedApp = Application.create({ ...app, ...data, parentOrg: org });
    return this.applicationRepository.save(updatedApp);
  }

  /**
   * removes App with matching namespace
   * @param namespace
   */
  public async remove(namespace: string) {
    const app = await this.getByNamespace(namespace);
    if (!app) return;
    return this.applicationRepository.delete(app.id);
  }

  /**
   * removes App with matching namehash
   * @param namehash
   */
  public async removeByNameHash(namehash: string) {
    return this.applicationRepository.delete({ namehash });
  }

  public async handleAppSyncWithEns({
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
    metadata: IAppDefinition;
    name: string;
    namehash: string;
  }) {
    let dto: ApplicationDTO;
    try {
      const definitionDTO = await ApplicationDefinitionDTO.create(metadata);

      dto = await ApplicationDTO.create({
        definition: definitionDTO,
        owner,
        name,
        namespace,
        parentOrg: parentOrgNamespace,
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

    await this.update(dto);
  }
}
