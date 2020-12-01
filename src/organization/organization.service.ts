import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import {
  CreateOrganizationData,
  OrganizationDefinitionDTO,
  OrganizationDTO,
} from './OrganizationDTO';
import { validate } from 'class-validator';

@Injectable()
export class OrganizationService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    query all($i: string){
      Data(func: eq(dgraph.type, "Org")) {
        uid
        name
        namespace
        owner
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
        apps @filter(eq(dgraph.type, "App")) {
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    const org = res.getJson()?.Data[0];
    return org ? { Data: org.apps } : { Data: [] };
  }

  public async getRoles(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) {
        namespace
        roles  @filter(eq(dgraph.type, "Role")) {
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    const org = res.getJson()?.Data[0];
    return org ? { Data: org.roles } : { Data: [] };
  }

  public async getByNamespace(namespace: string): Promise<OrganizationDTO> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(dgraph.type, "Org")) {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
      }
    }`,
      { $i: namespace },
    );
    const json = res.getJson();
    return json?.Data?.[0];
  }

  public async exists(namespace: string): Promise<boolean> {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  public async create(data: CreateOrganizationData): Promise<string> {
    const orgDefDTO = new OrganizationDefinitionDTO(data.definition);
    const orgDTO = new OrganizationDTO(data, orgDefDTO);

    const err = await validate(orgDTO);

    if (err.length > 0) {
      console.log(err);
      return;
    }

    const queryData = {
      uid: '_:new',
      type: 'org',
      ...orgDTO,
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  public async updateNamespace(
    namespace: string,
    patch: CreateOrganizationData,
  ): Promise<string> {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }

    const orgDefDTO = new OrganizationDefinitionDTO(patch.definition);
    const orgDTO = new OrganizationDTO(patch, orgDefDTO);

    const err = await validate(orgDTO);

    if (err.length > 0) {
      console.log(err);
      return;
    }

    const data = {
      uid: oldData.uid,
      ...orgDTO,
    };

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

  public async remove(namespace: string) {
    const org = await this.getByNamespace(namespace);
    if (!org) {
      return;
    }

    await this.dgraph.delete(org.uid);
  }
}
