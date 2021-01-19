import { Injectable, OnModuleInit } from '@nestjs/common';
import { DgraphClient, DgraphClientStub, Mutation, Operation } from 'dgraph-js';
import { ConfigService } from '@nestjs/config';
import { Policy } from 'cockatiel';
import { promisify } from 'util';
import fs from 'fs';

@Injectable()
export class DgraphService implements OnModuleInit {
  /**
   * returns promise of active connection instance
   * @private
   */
  private async getInstance(): Promise<DgraphClient> {
    if (this._instance) {
      return this._instance;
    }
    return this.createInstance();
  }

  private _instance: DgraphClient;
  private _stub: DgraphClientStub;

  async onModuleInit() {
    await this.createInstance();
  }

  constructor(private configService: ConfigService) {}

  /**
   * Method for updating dgraph schemas, triggers every time after initial server startup
   */
  public async migrate() {
    const schema = `
      type Claim {
        id
        requester
        claimIssuer
        claimType
        token
        parentNamespace
        isAccepted
        createdAt
        isRejected
      }
      
      type RoleIssuer {
        roleName
        issuerType
        did
      }
      
      issuerType: string .
      did: [string] .
      
      type KeyValue {
        key
        value
      }
      
      key: string .
      value: string .
      
      type Field {
        fieldType
        label
        validation
      }
      
      fieldType: string .
      label: string .
      validation: string .
      
      type RoleDefinition {
        version
        roleType
        roleName
        fields
        metadata
        issuer
      }
      
      type AppDefinition {
        description
        logoUrl
        websiteUrl
        others
        appName
      }
      
      type OrgDefinition {
        description
        logoUrl
        websiteUrl
        others
        orgName
      }
      
      fields: [uid] .
      metadata: [uid] .
      issuer: uid .
      version: string .
      roleType: string .
      roleName: string .
      
      description: string @index(trigram) .
      logoUrl: string .
      websiteUrl: string @index(trigram) .
      others: [uid] .
      appName: string .
      orgName: string .
      
      type Role {
        name
        owner
        namespace
        definition
      } 
      
      type App {
        name
        owner
        namespace
        definition
        roles
      }
       
      type Org {
        name
        owner
        namespace
        definition
        apps
        roles
        parentOrg
      }
      
      name: string @index(exact) .
      owner: string @index(exact) .
      namespace: string @index(trigram, exact, term) .
      definition: uid @reverse .
      roles: [uid] .
      apps: [uid] .
      parentOrg: uid @reverse .
      
      token: string .
      isAccepted: bool .
      isRejected: bool .
      createdAt: string .
      token: string .
      issuedToken: string .
      parentNamespace: string .
      claimIssuer: [string] @index(exact) .
      requester: string @index(exact) .
      claimType: string @index(exact) .
      parentNamespace: string @index(exact) .
      type: string .
      id: string @index(exact) .

      type DIDDocument {
        id
        logs
        claims
      }

      logs: string .
      claims: [uid] .

      type IPFSClaim {
        serviceEndpoint
        jwt
      }

      serviceEndpoint: string .
      jwt: string .
    `;
    const op = new Operation();
    op.setSchema(schema);
    await this._instance.alter(op);
    console.log('Migration completed');
  }

  /**
   * performs update on dgraph database
   * @param data Mutation data
   */
  public async mutate(data: unknown) {
    const instance = await this.getInstance();
    const txn = instance.newTxn();
    const mu = new Mutation();
    mu.setSetJson(data);
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  /**
   * Removes nodes with matching ids from database
   * @param ids ID or array of IDs
   */
  public async delete(ids: string | string[]) {
    const instance = await this.getInstance();
    const txn = instance.newTxn();
    const mu = new Mutation();
    mu.setDeleteJson(
      Array.isArray(ids) ? ids.map(uid => ({ uid })) : [{ uid: ids }],
    );
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  /**
   * Query data
   * @param query Query string
   * @param params Params
   */
  public async query(query: string, params?: Record<string, any>) {
    const instance = await this.getInstance();
    if (params) {
      return instance.newTxn({ readOnly: true }).queryWithVars(query, params);
    }
    return instance.newTxn({ readOnly: true }).query(query);
  }

  /**
   * Initial Connection/Database setup method
   * @private
   */
  private async createInstance() {
    if (this._instance) {
      return this._instance;
    }

    let clientStub: DgraphClientStub;

    const DB_HOST = this.configService.get<string>('DGRAPH_GRPC_HOST');

    const policy = Policy.handleAll()
      .retry()
      .attempts(5)
      .delay(1000);
    return await policy.execute(async () => {
      clientStub = new DgraphClientStub(DB_HOST);
      console.log('connection successfuly');

      this._stub = clientStub;

      this._instance = new DgraphClient(clientStub);

      try {
        await this.migrate();
      } catch (err) {
        console.log(err);
      }

      return this._instance;
    });
  }

  private async dropDB() {
    const op = new Operation();
    op.setDropAll(true);
    await this._instance.alter(op);
  }

  async fixDgraph() {
    const claims = await this.query(`
    {
      claims(func: type(Claim)) {
        uid
        id
        requester
        claimIssuer
        claimType
        token
        issuedToken
        parentNamespace
        isAccepted
        createdAt
        acceptedBy
        dgraph.type
      }
    }
    `);
    const data = claims.getJson();
    const writeFileWithPromise = promisify(fs.writeFile);
    const readFileWithPromise = promisify(fs.readFile);

    await writeFileWithPromise('claims.json', JSON.stringify(data));
    console.log('saved claims');
    await this.dropDB();
    console.log('db dropped');
    await this.migrate();
    console.log('Migration after dump completed');
    const readData = await readFileWithPromise('claims.json');
    const { claims: save } = JSON.parse(readData.toString());
    await this.mutate(save);
    console.log('claims restored');
  }

  /**
   * Closes/Ends connection to Dgraph
   */
  public close() {
    // close existing connection;
    this._stub?.close();

    this._stub = null;
    this._instance = null;
  }
}
