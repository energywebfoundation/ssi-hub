import { Injectable, NotFoundException } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import {
  CreateOrganizationData,
  OrganizationDefinitionDTO,
  OrganizationDTO,
} from './OrganizationDTO';
import { validate } from 'class-validator';
import { RecordToKeyValue } from 'src/Interfaces/KeyValue';
import { Organization } from './OrganizationTypes';

@Injectable()
export class OrganizationService {
  constructor(private readonly dgraph: DgraphService) {}

  private async getOrgDefinitionByUid(uid: string) {
    const query = `
    {
      definitions(func: uid(${uid})) @filter(type(OrgDefinition))
      ${roleDefinitionFullQuery}
    }
    `;
    const res = await this.dgraph.query(query);
    const { definitions } = res.getJson() as {
      definitions: OrganizationDefinitionDTO[];
    };
    const definition = definitions[0];
    if (!definition) {
      return {
        uid,
      } as OrganizationDefinitionDTO;
    }
    return definition;
  }

  private getDefinitionForOrgs(orgs?: Organization[]) {
    return (
      orgs &&
      Promise.all(
        orgs.map(async org => ({
          ...org,
          definition: await this.getOrgDefinitionByUid(org.definition.uid),
          subOrgs: await this.getDefinitionForOrgs(org.subOrgs),
        })),
      )
    );
  }

  /**
   * retrieves all existing organizations
   */
  public async getAll(onlySubOrgs?: 'true' | 'false') {
    const query = `
    {
      Data(func: type(Org)) ${
        onlySubOrgs === 'true' ? '@filter(has(parentOrg))' : ''
      } {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
        parentOrg {
          uid
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
        subOrgs: ~parentOrg {
          uid
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`;
    const res = await this.dgraph.query(query);
    return res.getJson();
  }

  /**
   * Returns all Apps belonging to Organization with matching namespace
   * @param namespace
   */
  public async getApps(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(type(Org)) {
        namespace
        apps @filter(type(App)) {
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

  /**
   * Returns all Role belonging to Organization with matching namespace
   * @param namespace
   */
  public async getRoles(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(type(Org)) {
        namespace
        roles @filter(type(Role)) {
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

  /**
   * returns single Org with matching namespace
   * @param {String} namespace
   */
  public async getByNamespace(namespace: string): Promise<OrganizationDTO> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(type(Org)) {
        uid
        name
        namespace
        owner
        definition ${roleDefinitionFullQuery}
        parentOrg {
          uid
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
        subOrgs: ~parentOrg {
          uid
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    const json = res.getJson();
    return json?.Data?.[0];
  }

  /**
   * return true if Org with given namespace exists
   * @param namespace
   */
  public async exists(namespace: string): Promise<boolean> {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  /**
   * Method for adding new Org to database
   * @param data object containing all needed Org properties
   * @return id of newly added Org
   */
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
      ...orgDTO,
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  /**
   * Update existing Org with given namespace
   * @param namespace target Org's namespace
   * @param patch
   */
  public async updateNamespace(
    namespace: string,
    patch: CreateOrganizationData,
  ): Promise<string> {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }
    // Assuming that "others" data from Blockchain is an object and data from db is an array.
    // Therefore, we assume that data which is not in an Array is data from Blockchain.
    // This means that it needs to have its uid mapped so as to not duplicate records.
    const newOthers =
      patch.definition.others &&
      !Array.isArray(patch.definition.others) &&
      RecordToKeyValue(patch.definition.others).map(other => {
        const oldOther = oldData.definition.others?.find(
          ({ key }) => other.key === key,
        );
        if (oldOther) {
          return {
            uid: oldOther.uid,
            ...other,
          };
        }
        return other;
      });

    const orgDefDTO = new OrganizationDefinitionDTO({
      ...patch.definition,
      uid: oldData.definition.uid,
      others: newOthers,
    });

    const orgDTO = new OrganizationDTO(
      { parentOrg: oldData.parentOrg, ...patch },
      orgDefDTO,
    );

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

  /**
   * Creates connection between Organization and Application
   * @param id Id of target organization
   * @param appId App Id
   */
  public async addApp(id: string, appId: string) {
    const data = {
      uid: id,
      apps: [
        {
          uid: appId,
        },
      ],
    };

    await this.dgraph.mutate(data);

    return id;
  }

  /**
   * Creates connection between Organization and Role
   * @param id Id of target organization
   * @param roleId
   */
  public async addRole(id: string, roleId: string) {
    const data = {
      uid: id,
      roles: [
        {
          uid: roleId,
        },
      ],
    };

    await this.dgraph.mutate(data);

    return id;
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

    await this.dgraph.delete(org.uid);
  }

  public async getSubOrgByParentNamespace(namespace: string) {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(type(Org)) {
        subOrgs: ~parentOrg {
          uid
          name
          namespace
          owner
          definition ${roleDefinitionFullQuery}
        }
      }
    }`,
      { $i: namespace },
    );
    const json = res.getJson() as {
      Data: { subOrgs: OrganizationDTO[] }[];
    };
    return json?.Data?.[0]?.['subOrgs'] || [];
  }

  public async getOrganizationNestedSubOrgs(namespace: string) {
    const res = await this.dgraph.query(`
    {
      orgs(func: eq(namespace, "${namespace}")) @filter(type(Org)) @recurse(depth: 20, loop: true) {
        uid
        name
        owner
        namespace
        definition
        subOrgs: ~parentOrg
    }
  }`);
    const response = res.getJson() as { orgs: OrganizationDTO[] };
    const orgs = await this.getDefinitionForOrgs(response.orgs);
    const org = orgs[0];
    if (!org) {
      throw new NotFoundException();
    }
    return org;
  }
}
