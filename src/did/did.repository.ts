import { Injectable, Logger } from '@nestjs/common';
import { DIDDocumentEntity, DID_DgraphType } from './DidDocumentEntity';
import { DID } from './DidTypes';
import { DIDDocumentDTO } from './DidDTOs';
import { DgraphService } from '../dgraph/dgraph.service';

@Injectable()
export class DIDDGraphRepository {
  private readonly logger: Logger;

  constructor(private readonly dgraph: DgraphService) {
    this.logger = new Logger('DidDgraphRepository');
  }

  public async saveDocument(documentDTO: DIDDocumentDTO): Promise<string> {
    this.logger.verbose(`saving document ${JSON.stringify(documentDTO)}`);
    const res = await this.dgraph.mutate(documentDTO);
    this.logger.debug(`document save response: ${res}`);
    return res.getUidsMap().get('new');
  }

  public async queryById(did: DID): Promise<DIDDocumentEntity> {
    const res = await this.dgraph.query(
      `
      query all($id: string) {
        did(func: eq(id, $id)) {
          id
          logs
          uid
          claims {
            serviceEndpoint
            jwt
            uid
          }
        }
      }`,
      { $id: did.id },
    );
    const json = res.getJson();
    const didDocument: DIDDocumentDTO = json.did[0];
    return didDocument ? new DIDDocumentEntity(did, didDocument) : null;
  }

  public async queryAllDIDs() {
    const res = await this.dgraph.query(
      `
      query all() {
        dids(func: eq(dgraph.type, ${DID_DgraphType})) {
          id
        }
      }`,
    );
    const json = res.getJson();
    return json.dids as Array<{ id: string }>;
  }
}
