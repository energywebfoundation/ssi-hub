import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import {
  ApplicationDefinitionDTO,
  ApplicationDTO,
  CreateApplicationData,
} from './ApplicationDTO';
import { validate } from 'class-validator';
import { Application } from './ApplicationTypes';

const baseQueryFields = `
uid
name
namespace
owner
definition ${roleDefinitionFullQuery}
`;

@Injectable()
export class ApplicationService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(dgraph.type, "App")) {
        ${baseQueryFields}
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
        roles @filter(eq(dgraph.type, "Role")) {
          ${baseQueryFields}
        }
      }
    }`,
      { $i: namespace },
    );
    const app = res.getJson()?.Data[0];
    return app ? { Data: app.roles } : { Data: [] };
  }

  public async getByNamespace(name: string): Promise<Application> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(dgraph.type, "App")) {
        ${baseQueryFields}
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
    const appDefDTO = new ApplicationDefinitionDTO(data.definition);
    const appDTO = new ApplicationDTO(data, appDefDTO);

    const err = await validate(appDTO);

    if (err.length > 0) {
      console.log(err);
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

    const appDefDTO = new ApplicationDefinitionDTO(patch.definition);
    const appDTO = new ApplicationDTO(patch, appDefDTO);

    const err = await validate(appDTO);

    if (err.length > 0) {
      console.log(err);
      return;
    }

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
