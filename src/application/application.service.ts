import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { RecordToKeyValue, roleDefinitionFullQuery } from '../Interfaces/Types';
import { ApplicationDefinitionDTO, ApplicationDTO, CreateApplicationData } from './ApplicationDTO';
import { validate } from 'class-validator';

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
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    return res.getJson();
  }

  public async getByNamespace(name: string) {
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
      { $i: name },
    );
    const json = res.getJson();
    return json?.Data[0];
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== null;
  }

  public async create(
    name: string,
    definition: CreateApplicationData,
    namespace: string,
    owner: string,
  ) {

    const appDTO = new ApplicationDTO()
    appDTO.name = name;
    appDTO.owner = owner;
    appDTO.namespace = namespace;
    appDTO.roles = [];

    const orgDefDTO = new ApplicationDefinitionDTO()
    orgDefDTO.description = definition.description
    orgDefDTO.logoUrl = definition.logoUrl
    orgDefDTO.websiteUrl = definition.websiteUrl
    orgDefDTO.others = RecordToKeyValue(definition.others)
    orgDefDTO.appName = definition.appName

    appDTO.definition = orgDefDTO;

    const err = await validate(appDTO);

    if(err.length > 0) {
      return;
    }

    const data = {
      uid: '_:new',
      type: 'app',
      ...appDTO
    };

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
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
