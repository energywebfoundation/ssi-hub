import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { RecordToKeyValue, roleDefinitionFullQuery } from '../Interfaces/Types';
import {
  ApplicationDefinitionDTO,
  ApplicationDTO,
  CreateApplicationData,
  CreateApplicationDefinition,
} from './ApplicationDTO';
import { validate } from 'class-validator';
import { Application } from './ApplicationTypes';

@Injectable()
export class ApplicationService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(type, "app")) {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
      }
    }`);
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
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    return res.getJson();
  }

  public async getByNamespace(name: string): Promise<Application> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
      }
    }`,
      { $i: name },
    );
    const json = res.getJson();
    return json?.Data?.[0];
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  public async create(data: CreateApplicationData) {
    const appDTO = new ApplicationDTO();
    appDTO.name = data.name;
    appDTO.owner = data.owner;
    appDTO.namespace = data.namespace;
    appDTO.roles = [];

    const orgDefDTO = new ApplicationDefinitionDTO();
    orgDefDTO.description = data.definition.description;
    orgDefDTO.logoUrl = data.definition.logoUrl;
    orgDefDTO.websiteUrl = data.definition.websiteUrl;
    orgDefDTO.others = RecordToKeyValue(data.definition.others);
    orgDefDTO.appName = data.definition.appName;

    appDTO.definition = orgDefDTO;

    const err = await validate(appDTO);

    if (err.length > 0) {
      return;
    }

    const queryData = {
      uid: '_:new',
      type: 'app',
      ...appDTO,
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  public async updateNamespace(
    namespace: string,
    patch: CreateApplicationData,
  ) {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }

    const appDTO = new ApplicationDTO();
    appDTO.name = patch.name;
    appDTO.owner = patch.owner;
    appDTO.namespace = patch.namespace;

    const definition = patch.definition;

    const orgDefDTO = new ApplicationDefinitionDTO();
    orgDefDTO.description = definition.description;
    orgDefDTO.logoUrl = definition.logoUrl;
    orgDefDTO.websiteUrl = definition.websiteUrl;
    orgDefDTO.others = RecordToKeyValue(definition.others);
    orgDefDTO.appName = definition.appName;

    appDTO.definition = orgDefDTO;

    const data = {
      uid: oldData.uid,
      ...appDTO,
    };

    await this.dgraph.mutate(data);

    return oldData.uid;
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
