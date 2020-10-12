import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { roleDefinitionFullQuery } from '../Interfaces/Types';

@Injectable()
export class OwnerService {
  constructor(private readonly dgraph: DgraphService) {}

  public async getRolesByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'role');
  }
  public async getAppsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'app');
  }
  public async getOrgsByOwner(owner: string) {
    return this.getTypeByOwner(owner, 'org');
  }

  private async getTypeByOwner(owner: string, type: string) {
    const res = await this.dgraph.query(`
    {${type}s(func: eq(owner, "${owner}")) @filter(eq(type, "${type}")) {
      uid
      name
      type
      owner
      namespace
      definition ${roleDefinitionFullQuery}
    }}`);
    return res.getJson();
  }
}
