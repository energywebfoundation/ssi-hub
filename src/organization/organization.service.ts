import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { RecordToKeyValue, roleDefinitionFullQuery } from '../Interfaces/Types';
import {
  CreateOrganizationData,
  CreateOrganizationDefinition,
  OrganizationDefinitionDTO,
  OrganizationDTO,
} from './OrganizationDTO';
import { validate } from 'class-validator';
import { Organization } from './OrganizationTypes';
import { Application } from '../application/ApplicationTypes';
import { ApplicationDefinitionDTO, ApplicationDTO } from '../application/ApplicationDTO';

@Injectable()
export class OrganizationService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(type, "org")) {
        uid
        name
        namespace
        definition ${roleDefinitionFullQuery}
      }
    }`);
    return res.getJson();
  }

  public async getApps(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        namespace
        apps {
          name
          namespace
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    return res.getJson();
  }

  public async getRoles(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        namespace
        roles {
          name
          namespace
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    return res.getJson();
  }

  public async getByNamespace(namespace: string): Promise<Organization> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        uid
        name
        namespace
        definition ${roleDefinitionFullQuery}
      }
    }`,
      { $i: namespace },
    );
    const json = res.getJson();
    return json?.Data?.[0];
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  public async create(data: CreateOrganizationData) {

    const orgDTO = new OrganizationDTO()
    orgDTO.name = data.name;
    orgDTO.owner = data.owner;
    orgDTO.namespace = data.namespace;
    orgDTO.apps = [];
    orgDTO.roles = [];

    const orgDefDTO = new OrganizationDefinitionDTO()
    orgDefDTO.description = data.definition.description
    orgDefDTO.logoUrl = data.definition.logoUrl
    orgDefDTO.websiteUrl = data.definition.websiteUrl
    orgDefDTO.others = RecordToKeyValue(data.definition.others)
    orgDefDTO.orgName = data.definition.orgName

    orgDTO.definition = orgDefDTO;

    const err = await validate(orgDTO);

    if(err.length > 0) {
      return;
    }

    const queryData = {
      uid: '_:new',
      type: 'org',
      ...orgDTO
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  public async updateNamespace(namespace: string, patch: CreateOrganizationData) {
    const oldData = await this.getByNamespace(namespace);
    if(!oldData) {
      return
    }

    const appDTO = new OrganizationDTO()
    appDTO.name = patch.name;
    appDTO.owner = patch.owner;
    appDTO.namespace = patch.namespace;
    appDTO.roles = [];
    appDTO.apps = [];

    const definition = patch.definition

    const orgDefDTO = new OrganizationDefinitionDTO();
    orgDefDTO.description = definition.description;
    orgDefDTO.logoUrl = definition.logoUrl;
    orgDefDTO.websiteUrl = definition.websiteUrl;
    orgDefDTO.others = RecordToKeyValue(definition.others);
    orgDefDTO.orgName = definition.orgName;

    appDTO.definition = orgDefDTO;

    console.log(appDTO)

    const data = {
      uid: oldData.uid,
      ...appDTO,
    }

    await this.dgraph.mutate(data);

    return oldData.uid;
  }

  public async addApp(id: string, appDefinitionId: string) {
    const data = {
      uid: id,
      apps: [
        {
          uid: appDefinitionId,
        },
      ],
    };

    await this.dgraph.mutate(data);

    return id;
  }

  public async addRole(id: string, roleDefinitionId: string) {
    const data = {
      uid: id,
      roles: [
        {
          uid: roleDefinitionId,
        },
      ],
    };

    await this.dgraph.mutate(data);

    return id;
  }
}
