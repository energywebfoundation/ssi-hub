import { DIDDocumentLite } from '@ew-did-registry/did-document';
import { IResolver } from "@ew-did-registry/did-resolver-interface";
import { IDIDDocument, IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store'
import { IDidStore } from '@ew-did-registry/did-store-interface'
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DgraphService } from 'src/dgraph/dgraph.service';
import { EthereumDidRegistryFactory } from '../ethers/EthereumDidRegistryFactory';
import { EthereumDidRegistry } from '../ethers/EthereumDidRegistry';
import * as jwt_decode from 'jwt-decode';
import { providers } from 'ethers';
import { DIDEntity, DID_DgraphType, IDIDEntity } from './DidEntity';
import { ResolverFactory } from './ResolverFactory';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class DIDService {
  private readonly logger: Logger;
  private readonly provider: providers.JsonRpcProvider;
  private readonly didRegistry: EthereumDidRegistry;
  private readonly resolver: IResolver
  private readonly ipfsStore: IDidStore

  constructor(
    private readonly dgraph: DgraphService,
    private config: ConfigService,
    private readonly resolverFactory: ResolverFactory,
    @InjectQueue('dids') private readonly didQueue: Queue<string>
  ) {
    this.logger = new Logger('DIDService');
    this.resolver = resolverFactory.create()

    const IPFS_URL = this.config.get<string>('IPFS_URL');
    this.ipfsStore = new DidStore(IPFS_URL);

    const PROVIDER_URL = this.config.get<string>('ENS_URL');
    this.provider = new providers.JsonRpcProvider(PROVIDER_URL);

    const DID_REGISTRY_ADDRESS = this.config.get<string>('DID_REGISTRY_ADDRESS');
    this.didRegistry = EthereumDidRegistryFactory.connect(
      DID_REGISTRY_ADDRESS,
      this.provider,
    );

    this.InitEventListeners();
  }

  private async InitEventListeners(): Promise<void> {
    const DIDAttributeChanged = 'DIDAttributeChanged'
    this.didRegistry.addListener(DIDAttributeChanged, async (owner, hash, value) => {
      this.logger.log(`${DIDAttributeChanged} event received for owner: ${owner}`)
      const did = 'did:ethr:' + owner;
      this.upsertCache(did);
    })
  }

  public async getById(id: string) {
    const res = await this.dgraph.query(
      `
      query all($id: string) {
        document(func: eq(id, $id)) {
          expand(_all_)
        }
      }`,
      { $id: id },
    );
    const json = res.getJson();
    return json.document[0] as IDIDEntity;
  }

  /**
   * Insert or update the DIDDocument cache for a given DID
   * @param did 
   */
  public async upsertCache(did: string) {
    const document = await this.resolveFromChain(did);
    this.enhanceWithClaims(document)
    await this.saveOrUpdateDocument(document);
  }

  private async resolveFromChain(did: string) {
    const document = new DIDDocumentLite(did, this.resolver)
    return await document.read();
  }

  /**
   * Enhances a DID Document with full claim data
   * @param document Document to enhance
   */
  private async enhanceWithClaims(document: IDIDDocument) {
    const claims = await this.downloadClaims({ services: document.service });
    document.service = claims;
  }

  /**
   * Downloads claims from IPFS
   * Remark: This method is copied from iam-client-lib. It should be moved onto ew-did-registry so that it can be shared
   * @param services Service endpoints from which claims can be downloaded
   */
  private async downloadClaims({ services }: { services: IServiceEndpoint[] }) {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
        const data = await this.ipfsStore.get(serviceEndpoint);
        const { claimData, ...claimRest } = jwt_decode(data) as {
          claimData: Record<string, string>;
        };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData,
          ...claimRest
        };
      })
    );
  }

  private async saveOrUpdateDocument(data: IDIDDocument): Promise<string> {
    try {
      this.logger.verbose(`saving or updating doc: ${data.id}`)
      const document: IDIDEntity = await this.getById(data.id);
      if (!document) {
        return await this.saveDocument(data);
      }

      //TODO: Fix updating - new nodes are continually being created
      const patch = new DIDEntity(data, document.uid);
      await this.dgraph.mutate(patch);
      return document.uid;
    }
    catch (err) {
      this.logger.error(err);
    }
  }

  private async saveDocument({
    ...data
  }: IDIDDocument): Promise<string> {
    const didDocument = new DIDEntity(data);
    const res = await this.dgraph.mutate(didDocument);
    this.logger.verbose(`document save response: ${res}`);
    return res.getUidsMap().get('new');
  }

  // TODO: Pull value from config
  @Cron(CronExpression.EVERY_10_MINUTES)
  private async syncDocuments() {
    const cachedDIDs = await this.queryAllDIDs();

    cachedDIDs.forEach(async (did) => {
      await this.didQueue.add('register', did.id)
    })
  }

  private async queryAllDIDs() {
    const res = await this.dgraph.query(
      `
      query all() {
        dids(func: eq(dgraph.type, ${DID_DgraphType})) {
          id
        }
      }`
    );
    const json = res.getJson();
    return json.dids as Array<{ id: string }>;
  }
}
