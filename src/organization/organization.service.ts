import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { OrgDefinition, RecordToKeyValue, roleDefinitionFullQuery } from '../Interfaces/Types';
import { CreateOrganizationData, OrganizationDefinitionDTO, OrganizationDTO } from './OrganizationDTO';
import { validate } from 'class-validator';

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

  public async getByNamespace(namespace: string) {
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
    return json?.Data[0];
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== null;
  }

  public async create(
    name: string,
    definition: CreateOrganizationData,
    namespace: string,
    owner: string,
  ) {

    const orgDTO = new OrganizationDTO()
    orgDTO.name = name;
    orgDTO.owner = owner;
    orgDTO.namespace = namespace;
    orgDTO.apps = [];
    orgDTO.roles = [];

    const orgDefDTO = new OrganizationDefinitionDTO()
    orgDefDTO.description = definition.description
    orgDefDTO.logoUrl = definition.logoUrl
    orgDefDTO.websiteUrl = definition.websiteUrl
    orgDefDTO.others = RecordToKeyValue(definition.others)
    orgDefDTO.orgName = definition.orgName

    orgDTO.definition = orgDefDTO;

    const err = await validate(orgDTO);

    if(err.length > 0) {
      return;
    }

    const data = {
      uid: '_:new',
      type: 'org',
      ...orgDTO
    };

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
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
