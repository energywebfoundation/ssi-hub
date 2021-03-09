import { Injectable } from '@nestjs/common';
import { IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { DgraphService } from '../dgraph/dgraph.service';
import { RoleDefinitionDTO, RoleDTO } from './role.dto';
import { roleDefinitionFullQuery } from '../interfaces/Types';
import { CreateRoleData, Role } from './role.types';
import { validate } from 'class-validator';
import { DIDService } from '../did/did.service';
import { DID } from '../did/did.types';

@Injectable()
export class RoleService {
  constructor(
    private readonly dgraph: DgraphService,
    private didService: DIDService,
  ) {}

  private async verifyRole({
    namespace,
    issuer,
    version,
  }: {
    namespace?: string;
    issuer: string;
    version?: string;
  }) {
    if (!namespace) return null;

    const { definition: role } = (await this.getByNamespace(namespace)) || {};
    if (!role) {
      return null;
    }

    if (version && role.version !== version) {
      return null;
    }

    if (role.issuer?.issuerType === 'DID') {
      if (
        Array.isArray(role.issuer?.did) &&
        role.issuer?.did.includes(issuer)
      ) {
        return {
          name: role.roleName,
          namespace,
        };
      }
      return null;
    }

    if (role.issuer?.issuerType === 'Role') {
      const issuerDID = new DID(issuer);
      const { service: issuerClaims } = await this.didService.getById(
        issuerDID,
        true,
      );
      const issuerRoles = issuerClaims.map(c => c.claimType);
      if (issuerRoles.includes(role.issuer.roleName)) {
        return {
          name: role.roleName,
          namespace,
        };
      }
    }
    return null;
  }

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

    const newPreconditions =
      Array.isArray(patch.definition.enrolmentPreconditions) &&
      patch.definition.enrolmentPreconditions.map(condition => {
        const oldCondition =
          Array.isArray(oldData.definition.enrolmentPreconditions) &&
          oldData.definition.enrolmentPreconditions.find(
            ({ type }) => condition.type === type,
          );
        if (oldCondition) {
          return {
            uid: oldCondition.uid,
            ...condition,
          };
        }
        return condition;
      });

    const roleDefDTO = new RoleDefinitionDTO({
      ...patch.definition,
      uid: oldData.definition.uid,
      issuer: {
        uid: oldData.definition.issuer?.uid,
        ...patch.definition.issuer,
      },
      fields: newFields || undefined,
      enrolmentPreconditions: newPreconditions || undefined,
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

  public async verifyUserRoles(did: string) {
    const user = new DID(did);
    const { service } = await this.didService.getById(user, true);
    const verifiedRoles = await Promise.all(
      ((service as unknown) as (IServiceEndpoint & {
        claimType?: string;
        claimTypeVersion?: string;
        iss: string;
      })[]).map(({ iss, claimTypeVersion, claimType }) =>
        this.verifyRole({
          issuer: iss,
          namespace: claimType,
          version: claimTypeVersion,
        }),
      ),
    );
    return verifiedRoles.filter(Boolean);
  }

  public async verifyEnrolmentPrecondition({
    userDID,
    claimType,
  }: {
    userDID: string;
    claimType: string;
  }) {
    const [didDocument, role] = await Promise.all([
      this.didService.getById(new DID(userDID), true),
      this.getByNamespace(claimType),
    ]);

    if (!role) {
      throw new Error(`There is no created role for ${claimType} namespace`);
    }

    const {
      definition: { enrolmentPreconditions },
    } = role;

    if (!enrolmentPreconditions || enrolmentPreconditions.length < 1) return;
    for (const { type, conditions } of enrolmentPreconditions) {
      if (type === 'role') {
        const conditionMet = didDocument.service.some(
          ({ claimType }) =>
            claimType && conditions.includes(claimType as string),
        );
        if (!conditionMet) {
          throw new Error(
            `Role enrolment precondition not met for user: ${userDID} and role: ${claimType}`,
          );
        }
      }
    }
  }
}
