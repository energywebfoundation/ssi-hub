import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub, Mutation, Operation } from 'dgraph-js';
import { ConfigService } from '@nestjs/config';
import { Policy } from 'cockatiel';

@Injectable()
export class DgraphService {
  private async getInstance(): Promise<DgraphClient> {
    if (this._instance) {
      return this._instance;
    }
    return this.createInstance();
  }

  private _instance: DgraphClient;
  private _stub: DgraphClientStub;

  constructor(private configService: ConfigService) {
    this.createInstance();
  }

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
      }
      
      type RoleIssuer {
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
      
      description: string .
      logoUrl: string .
      websiteUrl: string .
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
      }
      
      name: string @index(exact) .
      owner: string @index(exact) .
      namespace: string @index(exact) .
      definition: uid .
      roles: [uid] .
      apps: [uid] .
      
      token: string .
      isAccepted: bool .
      createdAt: string .
      token: string .
      issuedToken: string .
      parentNamespace: string .
      claimIssuer: [string] @index(exact) .
      requester: string @index(exact) .
      claimType: string @index(exact) .
      parentNamespace: string @index(exact) .
      type: string @index(exact) .
      id: string @index(exact) .
    `;
    const op = new Operation();
    op.setSchema(schema);
    await this._instance.alter(op);
    console.log('Migration completed');

  }

  public async mutate(data: unknown) {
    const instance = await this.getInstance();
    const txn = await instance.newTxn();
    const mu = new Mutation();
    mu.setSetJson(data);
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  public async delete(ids: string | string[]) {
    let json;
    if(Array.isArray(ids)) {
      json = ids.map(uid => ({uid}));
    } else {
      json = [{uid: ids}]
    }
    const instance = await this.getInstance();
    const txn = await instance.newTxn();
    const mu = new Mutation();
    mu.setDeleteJson(json)
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  public async query(query: string, params?: Record<string, any>) {
    const instance = await this.getInstance();
    if (params) {
      return instance.newTxn({ readOnly: true }).queryWithVars(query, params);
    }
    return instance.newTxn({ readOnly: true }).query(query);
  }

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

      await this.migrate();

      return this._instance;
    });
  }

  public close() {
    // close existing connection;
    this._stub?.close();

    this._stub = null;
    this._instance = null;
  }
}
