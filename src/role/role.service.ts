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

  public async create(
    name: string,
    definition: CreateRoleData,
    namespace: string,
    owner: string,
  ) {

    const roleDTO = new RoleDTO()
    roleDTO.name = name;
    roleDTO.owner = owner;
    roleDTO.namespace = namespace;

    const orgDefDTO = new RoleDefinitionDTO()
    orgDefDTO.metadata = RecordToKeyValue(definition.metadata);
    orgDefDTO.roleName = definition.roleName;
    orgDefDTO.fields = definition.fields;
    orgDefDTO.version = definition.version;
    orgDefDTO.issuer = definition.issuer;

    roleDTO.definition = orgDefDTO;

    const err = await validate(roleDTO);

    if(err.length > 0) {
      return;
    }

    const data = {
      uid: '_:new',
      type: 'role',
      ...roleDTO
    };

    const res = await this.dgraph.mutate(data);

    return res.getUidsMap().get('new');
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

    if(nsf[3] == 'roles' && nsf[4]) {
      fragments.roles = nsf[4]
      return fragments;
    }

    if(nsf[3] == 'apps' && nsf[4]) {
      fragments.apps = nsf[4]

      // 5 - .roles. *
      if(nsf[5] == 'roles' && nsf[6]) {
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
    if(fragment == 'role' && fragments.org && !fragments.apps) {
      return `${fragments.roles}.roles.${namespace}`
    }

    if (fragment == 'app' || fragment == 'role') {
      if (fragments.apps == null) {
        return null;
      }
      namespace = `${fragments.apps}.apps.${namespace}`;
    }

    if (fragment == 'role') {
      if (fragments.roles == null) {
        return null;
      }
      namespace = `${fragments.roles}.roles.${namespace}`;
    }

    return namespace;
  }
}
