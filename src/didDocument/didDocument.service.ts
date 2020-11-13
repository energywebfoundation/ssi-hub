import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DgraphService } from 'src/dgraph/dgraph.service';
import { DidDocument, DidDocumentMessage } from './DidDocumentTypes';

const documentQuery = `
  uid
  id
`;

@Injectable()
export class DidDocumentService {
  constructor(private readonly dgraph: DgraphService){}

  public async saveOrUpdate(data: DidDocumentMessage): Promise<string> {
    const document: DidDocument = await this.getById(data.id);
    if (!document) {
      return await this.saveDocument(data);
    }

    const patch: DidDocument = {
      id: data.id
    };
    await this.dgraph.mutate(patch);
    return document.uid; //Why returning the DGraph uid here?
  }

  public async saveDocument({
    ...data
  }: DidDocumentMessage): Promise<string> {
    const didDocument: DidDocument = {
      ...data,
      id: data.id,
      uid: '_:new',
      'dgraph.type': 'Claim',
    };
    const res = await this.dgraph.mutate(didDocument);
    return res.getUidsMap().get('new');
  }

  public async getById(id: string): Promise<DidDocument> {
    const res = await this.dgraph.query(
      `
      query all($id: string) {
        claim(func: eq(id, $id)) {
          ${documentQuery}
        }
      }`,
      { $id: id },
    );

    const json = res.getJson();
    return json.claim[0];
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  private async syncDocuments() {

  }
}
