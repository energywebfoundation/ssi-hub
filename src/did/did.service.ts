import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DgraphService } from 'src/dgraph/dgraph.service';
import { DIDAttributeChangedValue, IpfsClaim, DIDDocument } from './DidTypes';
import { EthereumDidRegistryFactory } from '../ethers/EthereumDidRegistryFactory';
import { EthereumDidRegistry } from '../ethers/EthereumDidRegistry';
import * as jwt_decode from 'jwt-decode';
import fetch from 'node-fetch';
import { providers, utils } from 'ethers';

const documentQuery = `
  expand(_all_)
`;

@Injectable()
export class DIDService {
  private readonly logger: Logger;
  private readonly provider: providers.JsonRpcProvider;
  private readonly didRegistry: EthereumDidRegistry;

  constructor(
    private readonly dgraph: DgraphService,
    private config: ConfigService
  ){
    this.logger = new Logger('DIDService');

    const PROVIDER_URL = this.config.get<string>('ENS_URL');
    this.provider = new providers.JsonRpcProvider(PROVIDER_URL);
    const DID_REGISTRY_ADDRESS = this.config.get<string>(
      'DID_REGISTRY_ADDRESS',
    );
    this.didRegistry = EthereumDidRegistryFactory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider,
    );
  }

  private async InitEventListeners(): Promise<void> {
    this.didRegistry.addListener('DIDAttributeChanged', async (owner,hash,value) => {
      const val: DIDAttributeChangedValue = JSON.parse(utils.toUtf8String(value));
      this.updateAttribute(owner, val);

      if(val.serviceEndpoint) {
        const res = await fetch(`https://ipfs.infura.io/ipfs/${val.serviceEndpoint}`);
        const jwt = await res.text();
        const data = jwt_decode(jwt) as IpfsClaim;

        console.log(data);

        // create or update claim

        // associate the claim witht the did document
        // should be associated by the claim subject being the did
      }
    })
  }

  public async updateAttribute(owner: string, data: DIDAttributeChangedValue): Promise<string> {
    const document: DIDDocument = await this.getById(owner);
    if (!document) {
      return;
    }
    // TODO: Persist attribute update
  }

  public async saveOrUpdateDocument(data: IDIDDocument): Promise<string> {
    const document: DIDDocument = await this.getById(data.id);
    if (!document) {
      return await this.saveDocument(data);
    }

    const patch: DIDDocument = Object.assign(document, data);
    await this.dgraph.mutate(patch);
    return document.uid;
  }

  public async saveDocument({
    ...data
  }: IDIDDocument): Promise<string> {
    const didDocument: DIDDocument = {
      ...data,
      uid: '_:new',
      'dgraph.type': 'DID',
    };
    this.logger.debug(`saving document: ${JSON.stringify(didDocument)}`);
    const res = await this.dgraph.mutate(didDocument);
    this.logger.verbose(`document save response: ${res}`);
    return res.getUidsMap().get('new');
  }

  public async getById(id: string): Promise<DIDDocument> {
    const res = await this.dgraph.query(
      `
      query all($id: string) {
        document(func: eq(id, $id)) {
          ${documentQuery}
        }
      }`,
      { $id: id },
    );

    const json = res.getJson();
    return json.document[0];
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  private async syncDocuments() {
      // Get Did Documents from database

      // Using ew-did-registry, get latest did documents & claims
      // Only want the events/changes since the last update (using the block hash)

      // save updated entities
  }
}
