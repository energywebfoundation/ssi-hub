import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { NamespaceFragments, RoleDefinitionDTO, RoleDTO } from './RoleDTO';
import { RecordToKeyValue, roleDefinitionFullQuery } from '../Interfaces/Types';
import { CreateRoleData, Role } from './RoleTypes';
import { validate } from 'class-validator';

@Injectable()
export class RoleService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getAll() {
    const res = await this.dgraph.query(`
    {roles(func: eq(type, "role")) {
      uid
      name
      namespace
      definition ${roleDefinitionFullQuery}
    }}`);
    return res.getJson();
  }

  public async getByNamespace(namespace: string): Promise<Role> {
    const res = await this.dgraph.query(
      `
    query all($i: string){
      Data(func: eq(namespace, $i)) @filter(eq(type, "role")) {
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

  public async create(data: CreateRoleData) {
    const roleDTO = new RoleDTO();
    roleDTO.name = data.name;
    roleDTO.owner = data.owner;
    roleDTO.namespace = data.namespace;

    const orgDefDTO = new RoleDefinitionDTO();
    orgDefDTO.metadata = RecordToKeyValue(data.definition.metadata);
    orgDefDTO.roleName = data.definition.roleName;
    orgDefDTO.fields = data.definition.fields;
    orgDefDTO.version = data.definition.version;
    orgDefDTO.issuer = data.definition.issuer;

    roleDTO.definition = orgDefDTO;

    const err = await validate(roleDTO);

    if (err.length > 0) {
      return;
    }

    const queryData = {
      uid: '_:new',
      type: 'role',
      ...roleDTO,
    };

    const res = await this.dgraph.mutate(queryData);

    return res.getUidsMap().get('new');
  }

  public async updateNamespace(namespace: string, patch: CreateRoleData) {
    const oldData = await this.getByNamespace(namespace);
    if (!oldData) {
      return;
    }

    const roleDTO = new RoleDTO();
    roleDTO.name = patch.name;
    roleDTO.owner = patch.owner;
    roleDTO.namespace = patch.namespace;

    const roleDefDTO = new RoleDefinitionDTO();
    roleDefDTO.metadata = RecordToKeyValue(patch.definition.metadata);
    roleDefDTO.roleName = patch.definition.roleName;
    roleDefDTO.fields = patch.definition.fields;
    roleDefDTO.version = patch.definition.version;
    roleDefDTO.issuer = patch.definition.issuer;

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

    if (nsf[3]==='roles' && nsf[4]) {
      fragments.roles = nsf[4];
      return fragments;
    }

    if (nsf[3]==='apps' && nsf[4]) {
      fragments.apps = nsf[4];

      // 5 - .roles. *
      if (nsf[5]==='roles' && nsf[6]) {
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
    if (fragment==='role' && fragments.org && !fragments.apps) {
      return `${fragments.roles}.roles.${namespace}`;
    }

    if (fragment==='app' || fragment==='role') {
      if (fragments.apps===null) {
        return null;
      }
      namespace = `${fragments.apps}.apps.${namespace}`;
    }

    if (fragment==='role') {
      if (fragments.roles===null) {
        return null;
      }
      namespace = `${fragments.roles}.roles.${namespace}`;
    }

    return namespace;
  }
}
