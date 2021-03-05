import { Injectable } from '@nestjs/common';
import { DgraphService } from '../../dgraph/dgraph.service';
import { DIDDocumentDTO } from '../did.dto';
import { DID } from '../did.types';
import { DIDDocumentEntity, DID_DgraphType } from '../didDocument.entity';

@Injectable()
export class AssetRepository {
  constructor(private readonly dgraph: DgraphService) {}
  public async queryAssetByOwner(owner: string) {
    const query = `
    query all() {
      assets(func: type(${DID_DgraphType})) @filter(eq(owner, ${owner})) {
        id
          logs
          uid
          owner
          offeredTo
          claims {
            serviceEndpoint
            jwt
            uid
          }
      }
    }
    `;
    const response = await this.dgraph.query(query);
    const { assets } = response.getJson() as { assets: DIDDocumentDTO[] };
    return assets.map(asset => {
      const did = new DID(asset.id, {
        offeredTo: asset.offeredTo,
        owner: asset.owner,
      });
      return new DIDDocumentEntity(did, asset);
    });
  }

  public async queryAssetByOfferedTo(offeredTo: string) {
    const query = `
    query all() {
      assets(func: type(${DID_DgraphType})) @filter(eq(offeredTo, ${offeredTo})) {
        id
          logs
          uid
          owner
          offeredTo
          claims {
            serviceEndpoint
            jwt
            uid
          }
      }
    }
    `;
    const response = await this.dgraph.query(query);
    const { assets } = response.getJson() as { assets: DIDDocumentDTO[] };
    return assets.map(asset => {
      const did = new DID(asset.id, {
        offeredTo: asset.offeredTo,
        owner: asset.owner,
      });
      return new DIDDocumentEntity(did, asset);
    });
  }
}
