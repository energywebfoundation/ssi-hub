import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { NamespaceFragments, RoleDefinitionDTO, RoleDTO } from './RoleDTO';
import { RecordToKeyValue, RoleDefinition, roleDefinitionFullQuery } from '../Interfaces/Types';
import { CreateRoleData } from './RoleTypes';
import { ApplicationDefinitionDTO, ApplicationDTO } from './ApplicationDTO';
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

  public async getByNamespace(namespace: string) {
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
    return res.getJson();
  }

  public async exists(namespace: string) {
    return (await this.getByNamespace(namespace)).Data.length > 0;
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

    const nsf = namespace.split('.');

    for (let i = 0; i < nsf.length; i += 2) {
      fragments[nsf[i + 1]] = nsf[i];
    }

    return fragments;
  }

  public getNamespaceOf(
    fragment: 'org' | 'app' | 'role' = 'org',
    fragments: NamespaceFragments,
  ): string {
    let namespace = `${fragments.org}.org.${fragments.ewc}.ewc`;

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
