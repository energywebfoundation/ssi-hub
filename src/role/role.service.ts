import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { NamespaceFragments, RoleDefinitionDTO, RoleDTO } from './RoleDTO';
import { roleDefinitionFullQuery } from '../Interfaces/Types';
import { CreateRoleData, Role } from './RoleTypes';
import { validate } from 'class-validator';

@Injectable()
export class RoleService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    {roles(func: eq(dgraph.type, "Role")) {
      uid
      name
      namespace
      owner
      definition ${roleDefinitionFullQuery}
    }}`);
    return res.getJson();
  }

  public async getByNamespace(namespace: string): Promise<Role> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(dgraph.type, "Role")) {
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

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)) !== undefined;
  }

  public async create(data: CreateRoleData) {
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

  public async deleteRole(namespace: string) {
    const role = await this.getByNamespace(namespace);

    if(!role) {
      return;
    }

    const uids: string[] = [
      role.uid,
      ...role.definition.fields.map(f => f.uid),
      ...role.definition.metadata.map(f => f.uid),
      role.definition.issuer.uid,
      role.definition.uid,
    ];

    await this.dgraph.delete(uids);
  }

  public async updateNamespace(namespace: string, patch: CreateRoleData) {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }

    const roleDefDTO = new RoleDefinitionDTO(patch.definition);
    const roleDTO = new RoleDTO(patch, roleDefDTO);

    roleDTO.definition = roleDefDTO;

    const data = {
      uid: oldData.uid,
      ...roleDTO,
    };

    await this.dgraph.mutate(data);

    return oldData.uid;
  }

  public splitNamespace(namespace: string): NamespaceFragments {
    const fragments: NamespaceFragments = {
      apps: null,
      roles: null,
      org: null,
      ewc: null,
    };

    const nsf = namespace.split('.').reverse();

    // 0 - ewc
    // 1 - .iam
    fragments.ewc = nsf[1];
    // 2 - ORGNAME
    fragments.org = nsf[2];
    // 3 - .apps. * or .roles.

    if (nsf[3] === 'roles' && nsf[4]) {
      fragments.roles = nsf[4];
      return fragments;
    }

    if (nsf[3] === 'apps' && nsf[4]) {
      fragments.apps = nsf[4];

      // 5 - .roles. *
      if (nsf[5] === 'roles' && nsf[6]) {
        fragments.roles = nsf[6];
      }
    }

    return fragments;
  }

  public getNamespaceOf(
    fragment: 'org' | 'app' | 'role' = 'org',
    fragments: NamespaceFragments,
  ): string {
    let namespace = `${fragments.org}.${fragments.ewc}.ewc`;

    //special case for role with organization
    if (fragment === 'role' && fragments.org && !fragments.apps) {
      return `${fragments.roles}.roles.${namespace}`;
    }

    if (fragment === 'app' || fragment === 'role') {
      if (fragments.apps === null) {
        return null;
      }
      namespace = `${fragments.apps}.apps.${namespace}`;
    }

    if (fragment === 'role') {
      if (fragments.roles === null) {
        return null;
      }
      namespace = `${fragments.roles}.roles.${namespace}`;
    }

    return namespace;
  }
}
