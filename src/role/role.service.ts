import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { RoleDefinitionDTO, RoleDTO } from './RoleDTO';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import { CreateRoleData, Role } from './RoleTypes';
import { validate } from 'class-validator';

@Injectable()
export class RoleService {
  constructor(private readonly dgraph: DgraphService) {}

  /**
   * retrieves all existing roles
   */
  public async getAll(): Promise<{ roles: RoleDTO[] }> {
    const res = await this.dgraph.query(`
    {roles(func: type(Role)) {
      uid
      name
      namespace
      owner
      definition ${roleDefinitionFullQuery}
    }}`);
    return res.getJson();
  }

  /**
   * returns single Role with matching namespace
   * @param {String} namespace
   */
  public async getByNamespace(namespace: string): Promise<Role> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(type(Role)) {
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

  /**
   * return true if role with given namespace exists
   * @param namespace
   */
  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  /**
   * Method for adding new Role to database
   * @param data object containing all needed role properties
   * @return id of newly added Role
   */
  public async create(data: CreateRoleData): Promise<string> {
    const orgDefDTO = new RoleDefinitionDTO(data.definition);
    const roleDTO = new RoleDTO(data, orgDefDTO);

    const err = await validate(roleDTO);

    if (err.length > 0) {
      return;
    }

    const queryData = {
      uid: '_:new',
      ...roleDTO,
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  /**
   * Update existing role with given namespace
   * @param namespace target role's namespace
   * @param patch
   */
  public async updateNamespace(
    namespace: string,
    patch: CreateRoleData,
  ): Promise<string> {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }

    const newFields =
      Array.isArray(patch.definition.fields) &&
      patch.definition.fields.map(field => {
        const oldField =
          Array.isArray(oldData.definition.fields) &&
          oldData.definition.fields.find(({ label }) => label === field.label);
        if (oldField) {
          return {
            uid: oldField.uid,
            ...field,
          };
        }
        return field;
      });

    const roleDefDTO = new RoleDefinitionDTO({
      ...patch.definition,
      uid: oldData.definition.uid,
      issuer: {
        uid: oldData.definition.issuer?.uid,
        ...patch.definition.issuer,
      },
      fields: newFields || undefined,
    });

    const roleDTO = new RoleDTO(patch, roleDefDTO);

    roleDTO.definition = roleDefDTO;

    const data = {
      uid: oldData.uid,
      ...roleDTO,
    };

    await this.dgraph.mutate(data);

    return oldData.uid;
  }

  /**
   * removes Role with matching namespace
   * @param namespace
   */
  public async remove(namespace: string) {
    const role = await this.getByNamespace(namespace);
    if (!role) {
      return;
    }

    await this.dgraph.delete(role.uid);
  }
}
