import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../application/application.entity';
import { Organization } from '../organization/organization.entity';
import { Role } from '../role/role.entity';
import { NamespaceEntities } from './search.types';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Application)
    private readonly appRepository: Repository<Application>,
  ) {}
  /**
   * returns App/Org/Role with namespace matching or similar to provided text
   * @param text fragment of namespace string
   * @return Array of Apps, Orgs and Roles
   */
  public async searchByText(text: string, types?: NamespaceEntities[]) {
    const textWithLike = `%${text.toLowerCase()}%`;
    if (!types || types.length < 1) {
      const namespaces = await Promise.all([
        this.orgRepository
          .createQueryBuilder()
          .where('LOWER(name) like :name', { name: textWithLike })
          .orWhere('LOWER(namespace) like :namespace', {
            namespace: textWithLike,
          })
          .orWhere(`LOWER(definition->>'websiteUrl') like :url`, {
            url: textWithLike,
          })
          .orWhere(`LOWER(definition->>'description') like :url`, {
            url: textWithLike,
          })
          .getMany(),
        this.appRepository
          .createQueryBuilder()
          .where('LOWER(name) like :name', { name: textWithLike })
          .orWhere('LOWER(namespace) like :namespace', {
            namespace: textWithLike,
          })
          .orWhere(`LOWER(definition->>'websiteUrl') like :url`, {
            url: textWithLike,
          })
          .orWhere(`LOWER(definition->>'description') like :description`, {
            description: textWithLike,
          })
          .getMany(),
        this.roleRepository
          .createQueryBuilder()
          .where('LOWER(name) like :name', { name: textWithLike })
          .orWhere('LOWER(namespace) like :namespace', {
            namespace: textWithLike,
          })
          .getMany(),
      ]);
      return namespaces.flat();
    }

    const namespaces = await Promise.all(
      types.flatMap(async type => {
        if (type === NamespaceEntities.Org) {
          return this.orgRepository
            .createQueryBuilder()
            .where('name like :name', { name: textWithLike })
            .orWhere('namespace like :namespace', { namespace: textWithLike })
            .orWhere(`definition->>'websiteUrl' like :url`, {
              url: textWithLike,
            })
            .orWhere(`definition->>'description' like :url`, {
              url: textWithLike,
            })
            .getMany();
        }
        if (type === NamespaceEntities.App) {
          return this.appRepository
            .createQueryBuilder()
            .where('name like :name', { name: textWithLike })
            .orWhere('namespace like :namespace', { namespace: textWithLike })
            .orWhere(`definition->>'websiteUrl' like :url`, {
              url: textWithLike,
            })
            .orWhere(`definition->>'description' like :description`, {
              description: textWithLike,
            })
            .getMany();
        }
        if (type === NamespaceEntities.Role) {
          return this.roleRepository
            .createQueryBuilder()
            .where('name like :name', { name: textWithLike })
            .orWhere('namespace like :namespace', { namespace: textWithLike })
            .getMany();
        }
      }),
    );
    return namespaces.flat();
  }
}
