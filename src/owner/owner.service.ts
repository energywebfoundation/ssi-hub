import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';

@Injectable()
export class OwnerService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getRolesByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'Role');
  }
  public async getAppsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'App');
  }
  public async getOrgsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'Org');
  }

  private async getTypeByOwner(owner: string, type: string) {
    const res = await this.dgraph.query(`
    {${type.toLocaleLowerCase()}s(func: eq(owner, "${owner}")) @filter(eq(dgraph.type, "${type}")) {
      uid
      name
      dgraph.type
      owner
      namespace
      definition ${roleDefinitionFullQuery}
    }}`);
    return res.getJson();
  }
}
