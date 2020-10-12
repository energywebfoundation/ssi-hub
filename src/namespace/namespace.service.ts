import { Injectable } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';

@Injectable()
export class NamespaceService {
  constructor(private readonly dgraph: DgraphService) {}

  public async namespaceExists(namespace: string): Promise<boolean> {
    const res = await this.dgraph.query(`
    {data(func: eq(namespace, "${namespace}")) {
      uid
    }}`);
    const json = res.getJson();
    return Boolean(json.data[0]?.uid);
  }
}
