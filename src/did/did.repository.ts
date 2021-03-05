import { Injectable } from '@nestjs/common';
import { DIDDocumentEntity, DID_DgraphType } from './didDocument.entity';
import { DID } from './did.types';
import { DIDDocumentDTO } from './did.dto';
import { DgraphService } from '../dgraph/dgraph.service';
import { Logger } from '../logger/logger.service';

@Injectable()
export class DIDRepository {
  constructor(
    private readonly dgraph: DgraphService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DIDRepository.name);
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
